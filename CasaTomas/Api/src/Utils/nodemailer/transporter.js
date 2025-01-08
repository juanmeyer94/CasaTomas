import transporter from "./nodemailer.js";

const formatArgentinePrice = (price) => {
  const roundedPrice = Math.round(price);

  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedPrice);
};

const formatDescription = (description) => {
  if (!description) return '';

  const formattedText = description
    .split('/*')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((line, index) => index === 0 ? line : `• ${line}`)
    .join('<br>');

  const sections = formattedText
    .split('//')
    .map(section => section.trim())
    .filter(section => section.length > 0)
    .join('<br><br>');

  return sections;
};

const generateOrderSummary = async (order) => {

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
  let totalSavings = 0;

  for (const itemType of order.orderItems) {
    for (const item of itemType.items) {

      let regularPrice = parseFloat(item.price);
      let discountedPrice = regularPrice;
      let discountMessage = '';

      let totalQuantity = 0;
      if (itemType.quantity instanceof Map) {
        for (const quantity of itemType.quantity.values()) {
          totalQuantity += quantity;
        }
      } else if (typeof itemType.quantity === 'object') {
        totalQuantity = Object.values(itemType.quantity).reduce((sum, qty) => sum + qty, 0);
      }

      if (item.wholesalePrice && item.wholesalePrice !== "0" && item.quantity) {
        const minQuantityForWholesale = parseInt(item.quantity.split(' ')[0]);
        const wholesalePrice = parseFloat(item.wholesalePrice);
        const wholesaleUnitPrice = wholesalePrice / minQuantityForWholesale;

        if (totalQuantity >= minQuantityForWholesale) {
          discountedPrice = wholesaleUnitPrice;
          const savings = (regularPrice - wholesaleUnitPrice) * totalQuantity;
          totalSavings += savings;

          discountMessage = `
            <div style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
              <p style="color: #666; text-decoration: line-through; margin: 0;">
                Precio regular: $${formatArgentinePrice(regularPrice)}
              </p>
              <p style="color: #2b8a3e; font-weight: bold; margin: 5px 0;">
                Precio mayorista: $${formatArgentinePrice(discountedPrice)}
              </p>
              <p style="color: #2b8a3e; font-size: 0.9em; margin: 0;">
                ¡Ahorrás $${formatArgentinePrice(savings)} en este producto!
              </p>
            </div>
          `;
        }
      }

      const formattedDescription = formatDescription(item.description);

      summary += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px 0; border-bottom: 1px solid #eee;">
          <div style="flex: 1; margin-right: 20px;">
            <img src="${item.photo[0]}" alt="${item.marca}" style="width: 100px; height: auto; border-radius: 8px;" />
          </div>
          <div style="flex: 3;">
            <h3 style="margin: 0; color: #333;">${item.summary}</h3>
            <p style="margin: 5px 0; color: #777; line-height: 1.5;">${formattedDescription}</p>
            ${discountMessage}
          </div>
        </div>
      `;

      summary += `<div><strong>Cantidades:</strong>`;

      if (itemType.quantity instanceof Map) {
        for (const [colorOrModel, quantity] of itemType.quantity.entries()) {
          const itemTotalPrice = quantity * discountedPrice;
          totalOrderPrice += itemTotalPrice;
          summary += `<p>${colorOrModel}: ${quantity} x $${formatArgentinePrice(discountedPrice)} = $${formatArgentinePrice(itemTotalPrice)}</p>`;
        }
      } else if (typeof itemType.quantity === 'object') {
        Object.entries(itemType.quantity).forEach(([colorOrModel, quantity]) => {
          const itemTotalPrice = quantity * discountedPrice;
          totalOrderPrice += itemTotalPrice;
          summary += `<p>${colorOrModel}: ${quantity} x $${formatArgentinePrice(discountedPrice)} = $${formatArgentinePrice(itemTotalPrice)}</p>`;
        });
      }

      summary += `</div>`;
    }
  }

  summary += `
      </div>
      <div style="text-align: right; margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
        ${totalSavings > 0 ? `
          <p style="color: #2b8a3e; margin: 0 0 10px 0;">
            ¡Ahorro total en tu compra: $${formatArgentinePrice(totalSavings)}!
          </p>
        ` : ''}
        <h2 style="color: #333; margin: 0;">TOTAL: $${formatArgentinePrice(totalOrderPrice)}</h2>
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

export const sendAllNotifications = async (userEmail, order) => {
  const mailOptions = {
    from: 'casatomas.rafaela@yahoo.com.ar',
    to: userEmail,
    subject: `Confirmación de Pedido #${order.orderNumber}`,
    html: await generateOrderSummary(order),
  };

  return transporter.sendMail(mailOptions);
};

export const sendNewOrderNotification = async (order) => {
  const mailOptions = {
    from: 'casatomas.rafaela@yahoo.com.ar',
    to: 'julietamtomas@gmail.com',
    subject: `Nuevo Pedido Recibido #${order.orderNumber}`,
    html: await generateOrderSummary(order),
  };

  return transporter.sendMail(mailOptions);
};

export const sendOrderConfirmation = async (userEmail, order) => {
  try {
    await sendAllNotifications(userEmail, order);
    await sendNewOrderNotification(order);
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

