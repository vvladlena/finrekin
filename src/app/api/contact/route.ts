import { NextResponse } from "next/server";

// Змінні середовища безпечно доступні лише на сервері
const BOT_TOKEN_RAW = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
// ✅ ВИПРАВЛЕННЯ: Видаляємо можливі пробіли з .env, щоб уникнути помилки 404
const BOT_TOKEN = BOT_TOKEN_RAW ? BOT_TOKEN_RAW.trim() : BOT_TOKEN_RAW;

/**
 * Отримує дані з форми (Ім'я, Телефон, Повідомлення) і надсилає їх у Telegram.
 * @returns NextResponse з результатом операції.
 */
export async function POST(request: Request) {
  // 1. Перевірка наявності конфігурації
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не налаштовані.");
    return NextResponse.json(
      {
        success: false,
        message: "Server configuration error: Telegram credentials missing.",
      },
      { status: 500 }
    );
  }

  // 2. Перевірка формату токена та діагностика
  if (
    BOT_TOKEN.length < 30 ||
    BOT_TOKEN.includes("<") ||
    BOT_TOKEN.includes(">")
  ) {
    console.error(
      "TELEGRAM_BOT_TOKEN виглядає некоректно. Перевірте файл .env.local."
    );
    return NextResponse.json(
      {
        success: false,
        message: "Invalid Telegram Token format. Check .env.local.",
      },
      { status: 500 }
    );
  }

  // 💡 НОВЕ ЛОГУВАННЯ ДЛЯ ДІАГНОСТИКИ BOT_TOKEN:
  // Цей лог допоможе вам побачити, чи правильно Next.js завантажив токен
  console.log(
    `[TELEGRAM DIAGNOSTIC] Token length (after trim): ${BOT_TOKEN.length}.`
  );

  try {
    const formData = await request.json();

    // Деструктуризація даних форми
    const { name, phone, message } = formData;

    // Формування повідомлення в Markdown/HTML
    const text = `
*🎉 Нова Заявка з Форми*
-------------------------------
*Ім'я:* ${name || "Не вказано"}
*Телефон:* \`${phone || "Не вказано"}\`
*Повідомлення:* ${message || "Не вказано"}
    `.trim();

    // ✅ ПЕРЕВІРКА URL: https://api.telegram.org/bot<TOKEN>/sendMessage
    const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    console.log(
      "Telegram API URL (excluding token):",
      `.../bot[TOKEN]/sendMessage`
    );
    console.log("Sending to Chat ID:", CHAT_ID);

    const telegramRes = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown", // Використовуємо Markdown для форматування
      }),
    });

    const telegramJson = await telegramRes.json();

    if (!telegramRes.ok || !telegramJson.ok) {
      // 3. ПОКРАЩЕНЕ ЛОГУВАННЯ ПОМИЛКИ TELEGRAM
      console.error(
        `Помилка від Telegram API (Status: ${telegramRes.status}, Code: ${telegramJson.error_code}):`,
        telegramJson.description
      );
      // Якщо помилка 404, логуємо, що це, швидше за все, неправильний BOT_TOKEN
      if (telegramRes.status === 404) {
        console.error(
          "404 Error suggests the BOT_TOKEN is likely incorrect or improperly formatted in .env.local."
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message to Telegram.",
          telegram_error: telegramJson.description,
        },
        { status: telegramRes.status >= 400 ? telegramRes.status : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Помилка обробки форми (fetch або JSON-парсинг):", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during form processing.",
      },
      { status: 500 }
    );
  }
}
