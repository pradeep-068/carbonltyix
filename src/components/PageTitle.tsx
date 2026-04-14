interface PageTitleProps {
  first: string;
  highlight: string;
  subtitle?: string;
}

export default function PageTitle({ first, highlight, subtitle }: PageTitleProps) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-2xl font-bold tracking-wider">
        <span className="text-foreground">{first} </span>
        <span className="text-primary">{highlight}</span>
      </h1>
      {subtitle && (
        <p className="text-xs font-mono text-muted-foreground tracking-wider mt-1">{subtitle}</p>
      )}
    </div>
  );
}
