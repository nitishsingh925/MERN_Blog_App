import { app } from "./app.js";

const startServer = async () => {
  try {
    app.listen(process.env.PORT || 5000, () => {
      console.log(` ⚙️  Server is running at port : ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Server connection failed !!! ", err);
  }
};

startServer();
