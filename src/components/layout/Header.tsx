"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import Button from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-lg text-slate-900">
                CONECTA<span className="text-brand-600">LAB</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#solutions"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t("solutions")}
            </a>
            <a
              href="#contact"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t("contact")}
            </a>
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-3">
            <a
              href="#solutions"
              className="block text-sm text-slate-600 hover:text-slate-900 py-2"
              onClick={() => setIsMobileOpen(false)}
            >
              {t("solutions")}
            </a>
            <a
              href="#contact"
              className="block text-sm text-slate-600 hover:text-slate-900 py-2"
              onClick={() => setIsMobileOpen(false)}
            >
              {t("contact")}
            </a>
            <div className="flex items-center justify-between pt-2">
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
