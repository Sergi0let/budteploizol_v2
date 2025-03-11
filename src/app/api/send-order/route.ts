import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER!;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD!;

// Функція створення транспортера
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
};

// Функція для створення тексту листа для клієнта
const createClientEmailText = ({
  name,
  lastname,
  phone,
  mail,
  deliveryType,
  deliveryAddress,
  paymentType,
  comment,
}: {
  [key: string]: string;
}) => `
Привіт, ${name} ${lastname}!

Дякуємо за ваше замовлення. Ми отримали вашу заявку і скоро з вами зв'яжемося для підтвердження.

🛒 **Деталі замовлення:**
- 📞 Телефон: ${phone}
- ✉️ Email: ${mail}
- 🚚 Тип доставки: ${deliveryType}
- 📍 Адреса доставки: ${deliveryAddress}
- 💳 Спосіб оплати: ${paymentType}
${comment ? `- 📝 Коментар: ${comment}` : ""}

Якщо у вас є запитання, звертайтеся до нашої служби підтримки.

Дякуємо, що обрали нас! 😊
`;

// Функція для створення тексту листа для адміністратора
const createAdminEmailText = ({
  name,
  lastname,
  phone,
  mail,
  deliveryType,
  deliveryAddress,
  paymentType,
  comment,
}: {
  [key: string]: string;
}) => `
🔔 **Нове замовлення від ${name} ${lastname}!**

🛒 **Деталі замовлення:**
- 📞 Телефон: ${phone}
- ✉️ Email: ${mail}
- 🚚 Тип доставки: ${deliveryType}
- 📍 Адреса доставки: ${deliveryAddress}
- 💳 Спосіб оплати: ${paymentType}
${comment ? `- 📝 Коментар: ${comment}` : ""}

Перевірте інформацію та підтвердіть замовлення клієнту.
`;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Перевіряємо, чи всі необхідні поля заповнені
    const requiredFields = [
      "lastname",
      "name",
      "phone",
      "mail",
      "deliveryType",
      "deliveryAddress",
      "paymentType",
    ];
    if (requiredFields.some((field) => !data[field])) {
      return NextResponse.json(
        { message: "Please fill all required fields" },
        { status: 400 },
      );
    }

    const transporter = createTransporter();

    // Параметри листів
    const clientMailOptions = {
      from: GMAIL_USER,
      to: data.mail,
      subject: "Ваше замовлення",
      text: createClientEmailText(data),
    };

    const adminMailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: "Нове замовлення!",
      text: createAdminEmailText(data),
    };

    // Відправляємо обидва листи
    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json(
      { message: "Order sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "An error occurred while sending the order" },
      { status: 500 },
    );
  }
}
