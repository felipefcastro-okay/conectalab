import { useTranslations } from "next-intl";

type Step = { title: string; body: string };

export default function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];
  const capabilities = t.raw("capabilities") as string[];

  return (
    <section id="process" className="scroll-mt-20 border-y border-line bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {t("overline")}
            </p>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-heading font-bold tracking-tight text-ink">
              {t("headline")}
            </h2>
          </div>
          <p className="max-w-md text-muted lg:justify-self-end">{t("subheadline")}</p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-6 lg:p-7">
              <span className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-lg font-heading font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
          <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted lg:pt-2">
            {t("capabilities_title")}
          </p>
          <ul className="flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
