const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const languages = require("./languages");
const faqAI = require("./faq_ai");

let users = fs.existsSync("users.json")
  ? JSON.parse(fs.readFileSync("users.json"))
  : {};

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
  console.log("📲 Escaneie o QR Code com o WhatsApp Business");
});

client.on("ready", () => {
  console.log("🤖 DELTA CANIS BOT ONLINE");
});

client.on("message", message => {
  const id = message.from;
  const text = message.body.trim().toLowerCase();

  // NOVO USUÁRIO
  if (!users[id]) {
    users[id] = { lang: null };
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    return message.reply(
`🌎 Elige tu idioma / Escolha o idioma:
1️⃣ Español
2️⃣ Português`
    );
  }

  // DEFINIÇÃO DE IDIOMA
  if (!users[id].lang) {
    users[id].lang = text === "1" ? "es" : "pt";
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    const L = languages[users[id].lang];
    return message.reply(`${L.welcome}\n${L.menu}`);
  }

  const L = languages[users[id].lang];

  // CHAMADAS BÁSICAS
  if (["oi", "hola", "menu"].includes(text)) {
    return message.reply(`${L.welcome}\n${L.menu}`);
  }

  // MENU
  if (text === "1") return message.reply(`${L.catalog}\n👉 https://deltacanis.myshopify.com`);
  if (text === "2") return message.reply(L.payment);
  if (text === "3") return message.reply(L.order);
  if (text === "4") return message.reply(L.human);
  if (text === "5") return message.reply(L.delivery);
  if (text === "6") return message.reply(L.returns);

  // IA FAQ
  const aiResponse = faqAI(text, users[id].lang);
  if (aiResponse) return message.reply(aiResponse);
});

client.initialize();
