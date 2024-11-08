import ItemData from "../Models/items.model.js";
import excelPriceList from "../Models/excelPriceList.model.js";


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
        const newItemData = req.body;
        const priceList = await excelPriceList.find().lean();
        const priceMap = new Map(priceList.map(price => [price.id, price]));

        if (newItemData.data && newItemData.data.items) {
            newItemData.data.items = newItemData.data.items.map(product => {
                if (product.code) {
                    const matchingPrice = priceMap.get(product.code);
                    if (matchingPrice) {
                        product.price = matchingPrice.price;
                        product.wholesalePrice = matchingPrice.wholesalePrice;
                        product.quantity = matchingPrice.quantity;
                    } else {
                        console.log(`No se encontró precio para el producto ${product.code}`);
                    }
                } else {
                    console.log("Producto sin código:", JSON.stringify(product));
                }
                return product;
            });
        }

        const savedItemData = await ItemData.create(newItemData);
        res.status(201).json(savedItemData);
    } catch (error) {
        console.error("Error al crear el item:", error);
        res.status(500).json({ error: "Error Interno del Servidor", detalles: error.message });
    }
};

export const updateFilterStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { filter } = req.body;

        const updatedItem = await ItemData.findByIdAndUpdate(
            id,
            { filter: filter },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating filter status:", error);
        res.status(500).json({ message: "Server error" });
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
        res.status(200).json(updatedItemData);
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