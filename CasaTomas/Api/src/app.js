import express from "express"
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/auth.routes.js"
import itemsRoutes from "./Routes/items.routes.js"
import cloudinaryRoutes from "./Routes/cloudinary.routes.js";
import orderRouter from "./Routes/order.routes.js";
import contactRouter from "./Routes/contact.routes.js";
import dotenv from "dotenv"
import pricesRoutes from "./Routes/priceList.routes.js";


dotenv.config();


const app = express();
app.use(cors({
    origin: ["http://http://localhost:5173", "https://casa-tomas-front.vercel.app"],
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api",router);
app.use("/api",itemsRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", orderRouter)
app.use("/api", contactRouter)
app.use("/api", pricesRoutes)


// Endpoint de salud
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Server is running"
    });
});

export default app;
