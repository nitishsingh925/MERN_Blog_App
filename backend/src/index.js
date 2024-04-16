import { app } from "./app.js";
import connectDB from "./db/index.db.js";
import { PORT } from "./utils/constants.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` ⚙️  Server is running at port : ${PORT}`);
    });
  } catch (err) {
    console.log("MONGO db connection failed !!!", err);
  }
};

startServer();
