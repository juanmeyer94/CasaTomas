import contactModels from "../Models/contact.models.js";
import { sendContactNotification } from "../Utils/nodemailer/transporter.js";

export const sendContactInfo = async ( req, res) => {
    try {
        const newContactInfo = new contactModels(req.body);
        const savedContactInfo = await newContactInfo.save();
        res.status(201).json(savedContactInfo);
        const cleanEmail = req.body.userEmail.replace(/'/g, "").trim();
        sendContactNotification("Consulta enviada con éxito a Casa Tomas Rafaela", cleanEmail, savedContactInfo);        
        sendContactNotification("Recibiste una consulta www.casa-tomas.com","julietamtomas@gmail.com", savedContactInfo);

    } catch (error) {
        console.error("Error al enviar la orden:", error)
        res.status(500).json({ message: error.message });

        
    }
};

export const getContactInfo = async (req, res) => {
    try {
        const contactInfo = await contactModels.find();
        res.status(200).json(contactInfo);
    } catch (error) {
        console.error("Error al obtener la orden:", error)
        res.status(500).json({ message: error.message });
    }
}