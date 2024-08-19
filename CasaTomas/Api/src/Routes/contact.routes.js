import {Router} from "express";

//contact routes

import { contactSchema } from "../schemas/contact.schema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { sendContactInfo } from "../Controllers/contact.cotroller.js";


const contactRouter = Router();


contactRouter.post("/sendContact", validateSchema(contactSchema),sendContactInfo);

export default contactRouter;