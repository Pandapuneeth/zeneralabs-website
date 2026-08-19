import { getRelatedWorks } from "@/lib/works";
import { WorksGrid } from "@/components/portfolio/works-grid";

export function RelatedWorks({ slug }: { slug: string }) {
  const related = getRelatedWorks(slug);

  return (
    <div>
      <WorksGrid works={related} />
    </div>
  );
}