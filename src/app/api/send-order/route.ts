/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import { formatPrice } from "@/lib/utils";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const BUDTPLOIZOL_USER = config.env.mail.user;
const BUDTPLOIZOL_PASSWORD = config.env.mail.appPassword;

// Функція створення транспортера
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "mail.adm.tools", // smtp - сервер
    port: 465, // порт 465 для SSL або 587 для TLS
    secure: true, // true для порту 465 (SSL)
    auth: {
      user: BUDTPLOIZOL_USER,
      pass: BUDTPLOIZOL_PASSWORD,
    },
    logger: true, // 👈 виведе всі логі SMTP
    debug: true, // 👈 теж корисне
  });
};

const createItemsTable = (
  items: { name: string; price: number; quantity: number }[],
) => {
  return `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; font-size: 14px; width: 100%;">
      <thead>
        <tr>
          <th align="left">Назва</th>
          <th align="center">Кількість</th>
          <th align="right">Ціна</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${item.name}</td>
                <td align="center">${item.quantity}</td>
                <td align="right">${formatPrice(item.price)}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};

const createClientEmailHtml = ({
  name,
  lastname,
  phone,
  mail,
  deliveryType,
  deliveryAddress,
  paymentType,
  comment,
  items,
  totalPrice,
}: any) => `
  <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
    <p>Привіт, <strong>${name} ${lastname}</strong>!</p>
    <p>Дякуємо за ваше замовлення. Ми отримали вашу заявку і зв’яжемося з вами найближчим часом.</p>
    <h3>Деталі замовлення:</h3>
    <ul>
      <li><strong>Телефон:</strong> ${phone}</li>
      <li><strong>Email:</strong> ${mail}</li>
      <li><strong>Тип доставки:</strong> ${deliveryType}</li>
      <li><strong>Адреса доставки:</strong> ${deliveryAddress}</li>
      <li><strong>Оплата:</strong> ${paymentType === "payNoCash" ? "Безготівкова" : paymentType}</li>
      ${comment ? `<li><strong>Коментар:</strong> ${comment}</li>` : ""}
    </ul>
    <h3>Замовлені товари:</h3>
    ${createItemsTable(items)}
    <p style="margin-top: 10px; font-size: 18px;"><strong>Загальна сума: ${formatPrice(totalPrice)}</strong></p>
    <hr />
    <p style="font-size: 14px;">Якщо у вас є питання — не соромтесь, відповідайте на цей лист або зателефонуйте нам.</p>
    <p style="color: gray; font-size: 13px;">БудьТеплоІзол — тепло не там, де гріє, а де не вивітрюється.</p>
  </div>
`;

const createAdminEmailHtml = ({
  name,
  lastname,
  phone,
  mail,
  deliveryType,
  deliveryAddress,
  paymentType,
  comment,
  items,
  totalPrice,
}: any) => `
  <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
    <h2>🔔 Нове замовлення!</h2>
    <p><strong>Клієнт:</strong> ${name} ${lastname}</p>
    <ul>
      <li><strong>Телефон:</strong> ${phone}</li>
      <li><strong>Email:</strong> ${mail}</li>
      <li><strong>Доставка:</strong> ${deliveryType}</li>
      <li><strong>Адреса:</strong> ${deliveryAddress}</li>
      <li><strong>Оплата:</strong> ${paymentType === "payNoCash" ? "Безготівкова" : paymentType}</li>
      ${comment ? `<li><strong>Коментар:</strong> ${comment}</li>` : ""}
    </ul>
    <h3>Список товарів:</h3>
    ${createItemsTable(items)}
    <p style="margin-top: 10px; font-size: 18px;"><strong>Загальна сума: ${formatPrice(totalPrice)}</strong></p>
    <hr />
    <p style="font-size: 13px; color: gray;">Розраховуйся, дзвони, відвантажуй.</p>
  </div>
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

    const clientMailOptions = {
      from: BUDTPLOIZOL_USER,
      to: data.mail,
      subject: "Ваше замовлення — БудТеплоІзол",
      html: createClientEmailHtml(data),
    };

    const adminMailOptions = {
      from: BUDTPLOIZOL_USER,
      to: BUDTPLOIZOL_USER,
      subject: `Нове замовлення від ${data.name} ${data.lastname}`,
      html: createAdminEmailHtml(data),
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
