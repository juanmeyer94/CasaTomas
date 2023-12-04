import ItemData from "../models/items.model.js";


export const getItems = async (req, res) => {
    try {
        const items = await ItemData.find();
        res.json(items);
    } catch (error) {
        console.error("Error al obtener los items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const createItem = async (req, res) => {
    try {
        const newItemData = new ItemData(req.body);
        const savedItemData = await newItemData.save();
        res.status(201).json(savedItemData);
    } catch (error) {
        console.error("Error al crear el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getItem = async (req, res) => {
    try {
        const itemData = await ItemData.findById(req.params.id);
        if (!itemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(itemData);
    } catch (error) {
        console.error("Error al obtener el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateItem = async (req, res) => {
    try {
        const updatedItemData = await ItemData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(updatedItemData);
    } catch (error) {
        console.error("Error al actualizar el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteItem = async (req, res) => {
    try {
        const deletedItemData = await ItemData.findByIdAndDelete(req.params.id);
        if (!deletedItemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error al eliminar el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
