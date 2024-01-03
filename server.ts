import { app } from "./app";
import connectDB from "./utils/db";

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDB();
});
