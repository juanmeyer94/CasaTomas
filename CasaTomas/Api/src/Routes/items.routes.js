import express from "express";
import { authRequired } from "../middleware/validateToken.js";
import { getItems, getItem, createItem, updateItem, deleteItem, updateFilterStatus, getFilteredItems, generateSitemap } from "../Controllers/items.controllers.js";

import { validateSchema } from "../middleware/validateSchema.js";
import { itemDataSchema } from "../schemas/items.schema.js";

const router = express.Router();


router.get("/items", getItems);

router.get("/productos/:section?/:subsection?/:type?/:marca?", getFilteredItems);

router.post("/items", validateSchema(itemDataSchema),createItem);

router.put("/showhideitem/:id", updateFilterStatus);

router.get("/items/:id", getItem);

router.put("/items/:id", updateItem);


router.delete("/items/:id", deleteItem);

router.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap(req)
      res.header("Content-Type", "application/xml")
      res.send(sitemap)
    } catch (error) {
      console.error("Error serving sitemap:", error)
      res.status(500).send("Error generating sitemap")
    }
  })
export default router;

