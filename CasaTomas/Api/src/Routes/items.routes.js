import express from "express";
import { authRequired } from "../middleware/validateToken.js";
import { getItems, getItem, createItem, updateItem, deleteItem, updateFilterStatus } from "../Controllers/items.controllers.js";

import { validateSchema } from "../middleware/validateSchema.js";
import { itemDataSchema } from "../schemas/items.schema.js";

const router = express.Router();


router.get("/items", getItems);


router.post("/items", validateSchema(itemDataSchema),createItem);

router.put("/showhideitem/:id", updateFilterStatus);

router.get("/items/:id", getItem);


router.put("/items/:id", updateItem);


router.delete("/items/:id", deleteItem);

export default router;

