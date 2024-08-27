// utils/sendOrderConfirmation.js

import transporter from "./nodemailer.js";

const generateOrderSummary = (order) => {
  let summary = `<h2>Resumen de Pedido</h2>`;
  summary += `<p><strong>Nombre:</strong> ${order.userName} ${order.userLastName}</p>`;
  summary += `<p><strong>Email:</strong> ${order.userEmail}</p>`;
  summary += `<p><strong>Teléfono:</strong> ${order.cellphone}</p>`;
  summary += `<p><strong>Número de Orden:</strong> ${order.orderNumber}</p>`;
  summary += `<p><strong>Estado:</strong> ${order.status}</p>`;
  summary += `<h3>Detalles del Pedido:</h3>`;

  order.orderItems.forEach((itemType, index) => {
    itemType.items.forEach(item => {
      summary += `<div style="margin-bottom: 20px;">`;
      summary += `<p><strong>Marca:</strong> ${item.marca}</p>`;
      summary += `<p><strong>Resumen:</strong> ${item.summary}</p>`;
      summary += `<p><strong>Descripción:</strong> ${item.description}</p>`;
      summary += `<p><strong>Precio unitario:</strong> $${item.price}</p>`;
      if (item.photo.length > 0) {
        summary += `<p><strong>Imagen:</strong> 
        <br/>
        <img src="${item.photo[0]}" alt="${item.marca}" style="width: 100px; height: auto;" /></p>`;
      }
      summary += `<p><strong>Cantidades:</strong></p>`;
      
      // Corregir el formato de las cantidades
      if (itemType.quantity instanceof Map) {
        itemType.quantity.forEach((value, key) => {
          summary += `<p>${key}: ${value}</p>`;
        });
      } else {
        Object.keys(itemType.quantity).forEach(colorOrModel => {
          summary += `<p>${colorOrModel}: ${itemType.quantity[colorOrModel]}</p>`;
        });
      }

      summary += `</div>`;
    });

    // Agregar divisor si hay más de un item
    if (index < order.orderItems.length - 1) {
      summary += `<hr style="border-top: 1px solid #ccc; margin: 20px 0;" />`;
    }
  });

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
