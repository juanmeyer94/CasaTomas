import express from "express"
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/auth.routes.js"
import itemsRoutes from "./Routes/items.routes.js"
import cloudinaryRoutes from "./Routes/cloudinary.routes.js";


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api",router);
app.use("/api",itemsRoutes);
app.use("/api", cloudinaryRoutes);


export default app;