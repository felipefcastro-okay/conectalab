export const WHATSAPP_NUMBER = "5555991563083";
export const WHATSAPP_MESSAGE_PT =
  "Olá! Vim pelo site da CONECTA LAB e gostaria de saber mais sobre os serviços.";
export const WHATSAPP_MESSAGE_EN =
  "Hi! I came from the CONECTA LAB website and would like to know more about your services.";
export const EMAIL = "contato@conectalab.cc";

export function getWhatsAppUrl(locale: string) {
  const message =
    locale === "pt-BR" ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
