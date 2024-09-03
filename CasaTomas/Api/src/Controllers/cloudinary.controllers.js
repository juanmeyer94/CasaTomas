import { cloudinary } from '../Cloudinary/Cloudinary.js';

export const uploadImageCloud = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No se proporcionó ninguna imagen.");
        }

        const uploadOptions = {
            resource_type: 'auto', 
            transformation: [
                {
                    width: 750,
                    height: 750,
                    crop: 'limit', 
                    quality: 'auto:best', 
                    fetch_format: 'auto'
                }
            ]
        };

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }).end(req.file.buffer);
        });

        res.status(200).json({ url: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Error interno del servidor");
    }
};


// Función para subir múltiples imágenes
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded');
        }

        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                ).end(file.buffer); 
            });
        });

        const results = await Promise.all(uploadPromises);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
