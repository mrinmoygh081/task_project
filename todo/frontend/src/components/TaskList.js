import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskFrom from "./TaskFrom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    isCompleted: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/v1/tasks/`);
      setAllTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      return toast.error("Please enter a task");
    }
    try {
      await axios.post(`${URL}/api/v1/tasks/`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Task has been added successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/v1/tasks/${id}`, formData);
      getTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setIsEditing(true);
    setTaskId(task._id);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      return toast.error("Please enter a task");
    }
    try {
      await axios.put(`${URL}/api/v1/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      setIsEditing(false);
      setTaskId("");
      toast.success("Task has been updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const setToComplete = async (id) => {
    try {
      await axios.patch(`${URL}/api/v1/tasks/${id}`, { isCompleted: true });
      getTasks();
      toast.success("Task is completed.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later!");
    }
  };

  useEffect(() => {
    const cTasks = allTasks.filter((task) => task.isCompleted);
    setCompletedTasks(cTasks);
  }, [allTasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskFrom
        handleInputChange={handleInputChange}
        createTask={createTask}
        name={formData.name}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {allTasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {allTasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && allTasks.length === 0 ? (
        <p>No Task Found. please add a task.</p>
      ) : (
        allTasks.map((task, index) => {
          return (
            <Task
              data={task}
              index={index}
              key={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
