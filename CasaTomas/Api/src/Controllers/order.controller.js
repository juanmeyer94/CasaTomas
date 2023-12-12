import Order from "../Models/order.model.js";


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders)
    } catch (error) {
        console.error("Error al obtener las ordenes:", error);


    }
}

export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: "Validation Error", details: error.errors });
          } else {
            res.status(500).json({ error: "Internal Server Error", message: error.message });
          }
          
        console.error("Error al crear la orden: ", error);

    }
}
export const getOrder = async (req, res) => {
    try {
        const orderData = await Order.findById(req.params.id);
        if (!orderData) {
            return res.status(404).json({ message: "Order not found" })
        }
        res.json(orderData);
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" })
        }
        
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { deleted: true },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
