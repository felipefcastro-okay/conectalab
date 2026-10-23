import { type ComponentProps } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "light";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"a"> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-soft",
  secondary:
    "bg-white text-ink border border-line hover:border-ink/30",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  light: "bg-white text-ink hover:bg-paper",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return `inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]}`;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={`${buttonClasses(variant, size)} ${className}`} {...props}>
      {children}
    </a>
  );
}
