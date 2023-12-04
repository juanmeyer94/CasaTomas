import { uploadImageCloud, uploadMultipleImages } from "../Controllers/cloudinary.controllers.js";
import {Router} from "express";


const cloudinaryRoutes = Router();

cloudinaryRoutes.post("/cloudinary", uploadImageCloud);
cloudinaryRoutes.post("/multipleimages", uploadMultipleImages)


export default cloudinaryRoutes;