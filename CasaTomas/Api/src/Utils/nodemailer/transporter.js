// utils/sendOrderConfirmation.js

import transporter from "./nodemailer.js";

const generateOrderSummary = (order) => {
  console.log("enviando nodemailer")
  let summary = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
      <!-- Encabezado con imagen -->
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/ddwq6af6j/image/upload/f_auto,q_auto/dodqzwqrtkxyhqunhuwt" alt="Casa Tomas" style="max-width: 100%; height: auto;" />
      </div>

      <!-- Saludo personalizado -->
      <h1 style="text-align: center; color: #333;">Hola, ${order.userName}!</h1>
      <p style="text-align: center; color: #777;">Este es tu pedido:</p>

      <!-- Detalles del pedido -->
      <div style="margin: 20px 0;">
  `;

  let totalOrderPrice = 0; 


  order.orderItems.forEach((itemType, index) => {
    itemType.items.forEach(item => {
      summary += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px 0; border-bottom: 1px solid #eee;">
          <div style="flex: 1; margin-right: 20px;">
            <img src="${item.photo[0]}" alt="${item.marca}" style="width: 100px; height: auto; border-radius: 8px;" />
          </div>
          <div style="flex: 3;">
            <h3 style="margin: 0; color: #333;">${item.summary}</h3>
            <p style="margin: 5px 0; color: #777;">${item.description}</p>
            <p style="font-weight: bold; color: #333;">$${item.price}</p>
          </div>
        </div>
      `;

      if (itemType.quantity) {
        summary += `<div><strong>Cantidades:</strong>`;
        
        if (itemType.quantity instanceof Map) {
          itemType.quantity.forEach((value, key) => {
            const itemTotalPrice = value * item.price;
            totalOrderPrice += itemTotalPrice; 
            summary += `<p>${key}: ${value} x $${item.price} = $${itemTotalPrice.toFixed(2)}</p>`;
          });
        } else {
          Object.keys(itemType.quantity).forEach(colorOrModel => {
            const itemTotalPrice = itemType.quantity[colorOrModel] * item.price;
            totalOrderPrice += itemTotalPrice;
            summary += `<p>${colorOrModel}: ${itemType.quantity[colorOrModel]} x $${item.price} = $${itemTotalPrice.toFixed(2)}</p>`;
          });
        }
        
        summary += `</div>`;
      }
    });
    if (index < order.orderItems.length - 1) {
      summary += `<hr style="border-top: 1px solid #ccc; margin: 20px 0;" />`;
    }
  });

  summary += `
      </div>
      <div style="text-align: right; margin-top: 20px;">
        <h2 style="color: #333;">TOTAL: $${totalOrderPrice.toFixed(2)}</h2>
      </div>

      <!-- Mensaje de cierre -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
        <h3 style="color: #333;">¡PRONTO NOS COMUNICAREMOS!</h3>
        <p style="color: #777;">Muchas gracias por contar con nosotros.</p>
        <p style="color: #777;">San Martin 556<br>3492-279892<br>Casa Tomas - Rafaela</p>
      </div>
    </div>
  `;

  return summary;
};




export const sendOrderConfirmation = (userEmail, order) => {
  const mailOptions = {
    from: 'casatomas.rafaela@yahoo.com.ar',
    to: userEmail,
    subject: `Confirmación de Pedido #${order.orderNumber}`,
    html: generateOrderSummary(order),
  };

  return transporter.sendMail(mailOptions);
};

