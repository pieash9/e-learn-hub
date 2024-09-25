import { v2 as cloudniary } from "cloudinary";
import { app } from "./app";
import connectDB from "./utils/db";
import "dotenv/config";

// cloudinary config
cloudniary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// create server
app.listen(process.env.PORT, () => {
  connectDB();
});
