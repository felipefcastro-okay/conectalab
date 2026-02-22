import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt-BR";

  return {
    title: isPt
      ? "CONECTA LAB | Tecnologia que resolve problemas reais"
      : "CONECTA LAB | Technology that solves real problems",
    description: isPt
      ? "Desenvolvemos sistemas, SaaS e aplicativos sob medida para empresas que querem crescer com tecnologia."
      : "We build systems, SaaS, and apps tailored for businesses that want to grow with technology.",
    openGraph: {
      title: "CONECTA LAB",
      description: isPt
        ? "Tecnologia que resolve problemas reais"
        : "Technology that solves real problems",
      type: "website",
    },
    alternates: {
      canonical: "/",
      languages: { "pt-BR": "/", en: "/en" },
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
      {children}
    </NextIntlClientProvider>
  );
}
