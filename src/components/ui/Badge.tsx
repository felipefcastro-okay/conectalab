interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-brand-50 text-brand-600 ${className}`}
    >
      {children}
    </span>
  );
}
