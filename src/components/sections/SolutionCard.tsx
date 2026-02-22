interface SolutionCardProps {
  icon: React.ReactNode;
  iconBg: string;
  name: string;
  tagline: string;
  description: string;
}

export default function SolutionCard({
  icon,
  iconBg,
  name,
  tagline,
  description,
}: SolutionCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconBg}`}
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-heading font-semibold text-slate-900">
        {name}
      </h3>

      <p className="mt-1 text-sm font-medium text-brand-600">{tagline}</p>

      <p className="mt-3 text-slate-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
