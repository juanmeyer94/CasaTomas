import uploadImage from "cloudinary"
import uploader from "cloudinary"


export const uploadImageCloud = async (req, res) => {
    try {
        const imageUrl = await uploadImage(req.body.image);
        res.send(imageUrl);
    } catch (err) {
        res.status(500).send(err.message || "Error interno del servidor");
    }
};



export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.body.images || !Array.isArray(req.body.images)) {
            return res.status(400).send("La propiedad 'images' debe ser un array en la solicitud.");
        }

        const uploadPromises = req.body.images.map((image) => {
            return uploader.upload(image);  
        });

        const uploadedResults = await Promise.all(uploadPromises);
        const urls = uploadedResults.map((result) => result.url);

        res.send(urls);
    } catch (err) {
        res.status(500).send(err.message || "Error interno del servidor");
    }
};