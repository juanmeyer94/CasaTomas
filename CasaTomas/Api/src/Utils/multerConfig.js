import multer, { memoryStorage } from 'multer';
import { extname } from 'path';

// Configuración de Multer
const storage = memoryStorage(); 
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Solo aceptar imágenes
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
});

export const uploadSingle = upload.single('image');

export const uploadMultiple = upload.array('images', 10);
