import express from "express"
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/auth.routes.js"
import itemsRoutes from "./Routes/items.routes.js"


const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api",router);
app.use("/api",itemsRoutes);


export default app;