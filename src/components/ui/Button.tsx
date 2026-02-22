import { type ComponentProps } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"a"> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-sm hover:shadow-md",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
