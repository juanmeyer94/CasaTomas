import express from "express";
import {sendOrderConfirmation} from "../Utils/nodemailer/transporter.js"

const nodemailerRouter = express.Router()

nodemailerRouter.post("/ordenConfirmada", sendOrderConfirmation);

export default nodemailerRouter;