import Link from "next/link";

export function CaseBreadcrumb({
  title,
}: {
  title: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted-foreground/50">/</li>
        <li>
          <Link href="/portfolio" className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Portfolio
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted-foreground/50">/</li>
        <li aria-current="page" className="min-w-0 truncate text-foreground">
          {title}
        </li>
      </ol>
    </nav>
  );
}