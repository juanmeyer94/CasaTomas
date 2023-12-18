import express from "express"
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/auth.routes.js"
import itemsRoutes from "./Routes/items.routes.js"
import cloudinaryRoutes from "./Routes/cloudinary.routes.js";
import orderRouter from "./Routes/order.routes.js";
import dotenv from "dotenv"

dotenv.config();


const app = express();
app.use(cors({
    origin: "https://casa-tomas-frontend.vercel.app",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", cors(), (req, res) => {
    res.json("Hello");
});

app.use("/api",router);
app.use("/api",itemsRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", orderRouter)


export default app;
