import {Router} from "express"
import { updatePricesController, getPricesController } from "../Controllers/priceList.controller.js"


const pricesRoutes = Router();

pricesRoutes.get('/get-prices', getPricesController);
pricesRoutes.post("/update-prices", updatePricesController);

export default pricesRoutes;