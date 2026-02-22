"use client";

import { useTranslations, useLocale } from "next-intl";
import SolutionCard from "./SolutionCard";
import Button from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

const products = [
  {
    key: "npslab" as const,
    icon: "📊",
    iconBg: "bg-amber-50",
  },
  {
    key: "smartmenu" as const,
    icon: "🍽️",
    iconBg: "bg-emerald-50",
  },
  {
    key: "digitocrm" as const,
    icon: "🤖",
    iconBg: "bg-violet-50",
  },
];

export default function Solutions() {
  const t = useTranslations("Solutions");
  const p = useTranslations("Products");
  const locale = useLocale();
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="solutions" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t("overline")}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold tracking-tight text-slate-900">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            {t("subheadline")}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <SolutionCard
              key={product.key}
              icon={product.icon}
              iconBg={product.iconBg}
              name={p(`${product.key}.name`)}
              tagline={p(`${product.key}.tagline`)}
              description={p(`${product.key}.description`)}
            />
          ))}
        </div>

        {/* Custom Solutions Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-xl">
                ⚡
              </div>
              <h3 className="text-lg font-heading font-semibold text-slate-900">
                {t("custom_title")}
              </h3>
            </div>
            <p className="mt-2 text-slate-500 max-w-lg">
              {t("custom_description")}
            </p>
          </div>
          <Button
            href={getWhatsAppUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            className="shrink-0"
          >
            {t("custom_cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
