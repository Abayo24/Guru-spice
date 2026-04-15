import { ChevronRight } from "lucide-react";
import type { PageKey } from "@/types";
import { cn } from "@/utils";

interface Crumb {
  label: string;
  page?: PageKey;
}

interface BreadcrumbProps {
  crumbs:   Crumb[];
  navigate: (page: PageKey) => void;
  className?: string;
}

export function Breadcrumb({ crumbs, navigate, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-2 text-[0.6875rem] tracking-[0.1em] uppercase text-paper/40 mb-5",
        className
      )}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.label} className="flex items-center gap-2">
            {!isLast && crumb.page ? (
              <>
                <button
                  onClick={() => { navigate(crumb.page!); window.scrollTo(0, 0); }}
                  className="text-turmeric/70 hover:text-turmeric transition-colors bg-transparent border-none font-sans"
                >
                  {crumb.label}
                </button>
                <ChevronRight size={12} className="text-paper/25" />
              </>
            ) : (
              <span className="text-paper/40">{crumb.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
