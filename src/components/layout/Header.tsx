"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import Button from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";

const navItems = [
  { key: "projects", hash: "projects" },
  { key: "process", hash: "process" },
  { key: "about", hash: "about" },
  { key: "contact", hash: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileOpen
          ? "bg-paper/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="CONECTA LAB">
            <Image
              src="/brand/conectalab-logo.svg"
              alt="CONECTA LAB"
              width={648}
              height={98}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={{ pathname: "/", hash: item.hash }}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <LocaleSwitcher />
            <Button
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              {t("cta")}
            </Button>
          </nav>

          <button
            className="lg:hidden p-2 text-ink cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={t("menu")}
            aria-expanded={isMobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden border-t border-line py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={{ pathname: "/", hash: item.hash }}
                className="block text-base text-ink py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-3">
              <LocaleSwitcher />
              <Button
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
