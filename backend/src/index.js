import { app } from "./app.js";
import connectDB from "./db/index.db.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(` ⚙️  Server is running at port : ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("MONGO db connection failed !!!", err);
  }
};

startServer();
