type DashboardHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function DashboardHeader({
  eyebrow,
  title,
  description,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
        {eyebrow}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
