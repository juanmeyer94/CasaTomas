import multer, { memoryStorage } from 'multer';
import { extname } from 'path';

// Configuración de Multer
const storage = memoryStorage(); 
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Extensiones permitidas
    const ext = extname(file.originalname).toLowerCase();
    const allowedImageExtensions = ['.png', '.jpg', '.jpeg'];
    const allowedVideoExtensions = ['.mp4', '.mov'];
    
    if (allowedImageExtensions.includes(ext) || allowedVideoExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'), false);
    }
  }
});

export const uploadSingle = upload.single('image'); 


export const uploadMultiple = upload.array('images', 10);
