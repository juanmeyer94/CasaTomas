import {Router} from "express";

//contact routes

import { contactSchema } from "../schemas/contact.schema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { sendContactInfo, getContactInfo } from "../Controllers/contact.cotroller.js";


const contactRouter = Router();


contactRouter.post("/sendContact", validateSchema(contactSchema),sendContactInfo);
contactRouter.get("/getContact", getContactInfo);


export default contactRouter;