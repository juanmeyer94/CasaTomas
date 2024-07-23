import express from "express"
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/auth.routes.js"
import itemsRoutes from "./Routes/items.routes.js"
import cloudinaryRoutes from "./Routes/cloudinary.routes.js";
import orderRouter from "./Routes/order.routes.js";
import dotenv from "dotenv"
import https from "https"

dotenv.config();


const app = express();
// app.use(cors({
//     origin: ["https://casatomas.onrender.com"],
//     credentials: true
// }));
app.use(cors({
    origin: `*`,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/test-api", (req, res) => {
    const url = "https://rickandmortyapi.com/api/character/164";

    https.get(url, (response) => {
        let data = '';

       
        response.on('data', (chunk) => {
            data += chunk;
        });

 
        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                console.log("Response from Rick and Morty API:", jsonData);
                res.json({ success: true, message: "Check the console for API response." });
            } catch (error) {
                console.error("Error parsing JSON:", error.message);
                res.status(500).json({ success: false, message: "Error parsing JSON from Rick and Morty API." });
            }
        });
    }).on('error', (error) => {
        console.error("Error fetching data from Rick and Morty API:", error.message);
        res.status(500).json({ success: false, message: "Error fetching data from Rick and Morty API." });
    });
});

app.use("/api",router);
app.use("/api",itemsRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", orderRouter)


export default app;
