import Order from "../Models/order.model.js";
import { sendOrderConfirmation } from "../Utils/nodemailer/transporter.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders)
    } catch (error) {
        console.error("Error al obtener las ordenes:", error);


    }
}

const getNextOrderNumber = async () => {
    try {
      const lastOrder = await Order.findOne().sort({ orderNumber: -1 }).exec();

      return lastOrder ? lastOrder.orderNumber + 1 : 1;
    } catch (error) {
      console.error("Error al obtener el próximo número de orden: ", error);
      throw new Error("Error interno del servidor");
    }
  };

  export const createOrder = async (req, res) => {
    try {
      // Generar el siguiente número de orden
      const orderNumber = await getNextOrderNumber();

      // Crear y guardar la nueva orden
      const newOrder = new Order({ ...req.body, orderNumber });
      const savedOrder = await newOrder.save();

      // Enviar correo solo si el email es válido
      const userEmail = savedOrder.userEmail;
      const isValidEmail = userEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userEmail);
      try {
        if (isValidEmail) {
          await sendOrderConfirmation(userEmail, savedOrder);
          console.log(`Correo de confirmación enviado a ${userEmail}`);
        } else {
          // Solo aviso a los dueños
          await sendOrderConfirmation("noresponder@gmail.com", savedOrder);
          console.log('Correo de aviso enviado solo a los dueños (sin email de usuario)');
        }
      } catch (emailError) {
        console.error('Error al enviar el correo de confirmación:', emailError);
      }
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error('Error al crear la orden:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

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
