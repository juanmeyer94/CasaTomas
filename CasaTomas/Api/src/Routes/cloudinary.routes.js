import { Router } from 'express';
import { uploadImageCloud, uploadMultipleImages } from '../Controllers/cloudinary.controllers.js';
import { uploadSingle, uploadMultiple } from '../Utils/multerConfig.js';

const cloudinaryRoutes = Router();

// Ruta para cargar una sola imagen
cloudinaryRoutes.post('/cloudinary', uploadSingle, uploadImageCloud);

// Ruta para cargar múltiples imágenes
cloudinaryRoutes.post('/multipleimages', uploadMultiple, uploadMultipleImages);

export default cloudinaryRoutes;
