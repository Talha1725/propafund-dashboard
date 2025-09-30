export default function DashboardHeadings({ title, className }: { title: string, className?: string }) {
  return (
    <h1 className={`text-white md:font-medium md:text-lg font-creato-display ${className}`}>
      {title}
    </h1>
  );
}
