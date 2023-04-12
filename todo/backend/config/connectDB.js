const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(port, () => {
//       console.log("Server running on port " + port);
//     });
//   } catch (error) {
//     console.log("error connecting to server: " + error);
//   }
// };
// startServer();
