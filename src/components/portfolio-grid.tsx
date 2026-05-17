"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export type ProjectCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  slug?: string;
  category?: string;
};

type PortfolioGridProps = {
  projects: ProjectCard[];
  itemsPerPage?: number;
};

export default function PortfolioGrid({
  projects,
  itemsPerPage = 12,
}: PortfolioGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  return (
    <div className={`w-full ${nunitoSans.className}`}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProjects.map((project) => (
          <article
            key={project.id}
            className="group relative overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-500 hover:scale-105"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
              <Image
                src={project.image}
                alt={project.title || "Project"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="relative p-4">
              <h3 className="mb-1 text-lg font-bold leading-snug text-white">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-sm text-white/70">{project.subtitle}</p>
              )}

              {project.slug && (
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="absolute inset-0"
                  aria-label={`View ${project.title}`}
                >
                  <span className="sr-only">View project</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {currentProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-white/60">No projects found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border-2 border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-amber-500 disabled:opacity-30"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[40px] rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  currentPage === page
                    ? "bg-amber-500 text-black"
                    : "border-2 border-white/20 text-white hover:border-amber-500"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border-2 border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-amber-500 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
