import express from "express";
import dotenv from "dotenv";
import db from "./DB/db";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//db conntection
db();

app.use(express.json());
app.use("/api",routes);
app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})
