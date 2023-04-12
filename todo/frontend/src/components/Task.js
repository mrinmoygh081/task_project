import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ data, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <>
      <div className={data.isCompleted ? "task completed" : "task"}>
        <p>
          <b>{index + 1}.</b>{" "}
          <span className={data.isCompleted ? "line" : ""}> {data?.name}</span>
        </p>
        <div className="task-icons">
          <FaCheckDouble
            color="green"
            onClick={() => setToComplete(data._id)}
          />
          <FaEdit color="purple" onClick={() => getSingleTask(data)} />
          <FaRegTrashAlt color="red" onClick={() => deleteTask(data._id)} />
        </div>
      </div>
    </>
  );
};

export default Task;
