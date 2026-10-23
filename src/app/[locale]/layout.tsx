import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: "CONECTA LAB",
      description: t("description"),
      type: "website",
    },
    alternates: {
      canonical: "/",
      languages: { "pt-BR": "/", en: "/en" },
    },
    icons: {
      icon: [
        {
          url: "/brand/conectalab-logo-square.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      apple: [
        {
          url: "/brand/conectalab-logo-square.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={mono.variable}>{children}</div>
    </NextIntlClientProvider>
  );
}
