import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-heading font-bold text-slate-200">404</p>
        <h1 className="mt-4 text-2xl font-heading font-semibold text-slate-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-slate-500">{t("description")}</p>
        <div className="mt-8">
          <Button href="/" size="md">
            {t("back")}
          </Button>
        </div>
      </div>
    </div>
  );
}
