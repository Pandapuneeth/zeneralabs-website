import { WORKS, type PortfolioWork } from "@/lib/works";
import { WorksCard } from "@/components/portfolio/works-card";

export function WorksGrid({
  works = WORKS,
  className,
}: {
  works?: PortfolioWork[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}>
      {works.map((work) => (
        <WorksCard key={work.slug} work={work} />
      ))}
    </div>
  );
}