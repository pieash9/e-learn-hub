import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(
        `Database connected. Host : ${data.connection.host}, PORT : ${process.env.PORT}`
      );
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
