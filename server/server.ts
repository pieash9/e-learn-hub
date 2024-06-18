import { app } from "./app";
import connectDB from "./utils/db";

// create server
app.listen(process.env.PORT, () => {
  connectDB();
});
