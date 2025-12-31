module.exports = function faqAI(text, lang) {
  const t = text.toLowerCase();

  if (t.includes("entrega") || t.includes("envio") || t.includes("prazo")) {
    return lang === "es"
      ? "📦 El plazo de entrega es de 5 a 15 días hábiles, según el producto y su origen."
      : "📦 O prazo de entrega é de 5 a 15 dias úteis, conforme o produto e sua origem.";
  }

  if (t.includes("pago") || t.includes("pix") || t.includes("paypal") || t.includes("cartão")) {
    return lang === "es"
      ? "💳 Aceptamos tarjeta, transferencia, Pix (Brasil), PayPal y pagos en Guaraníes, Reales y Dólares."
      : "💳 Aceitamos cartão, transferência, Pix (Brasil), PayPal e pagamentos em Guarani, Real e Dólar.";
  }

  if (t.includes("horario") || t.includes("atendimento") || t.includes("atención")) {
    return lang === "es"
      ? "⏰ Atención: Lunes a Viernes de 08:00 a 18:00."
      : "⏰ Atendimento: Segunda a Sexta, das 08h às 18h.";
  }

  return null;
};
