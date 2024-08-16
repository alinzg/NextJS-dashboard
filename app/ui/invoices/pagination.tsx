"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { generatePagination } from "@/app/lib/utils";
import { pages } from "next/dist/build/templates/app-page";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const allPages = generatePagination(currentPage, totalPages);
  return (
    <div className="flex gap-1 justify-center">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {generatePagination(currentPage, totalPages).map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              page={page}
              href={createPageURL(page)}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx("flex h-10 w-10 items-center justify-center text-sm border", {
    "rounded-l-md": position === "first" || position === "single",
    "rounded-r-md": position === "last" || position === "single",
    "z-10 bg-blue-600 border-blue-600 text-white": isActive,
    "hover:bg-gray-100": !isActive && position !== "middle",
    "text-gray-300": position === "middle",
  });

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx("flex h-10 w-10 items-center justify-center rounded-md border", {
    "pointer-events-none text-gray-300": isDisabled,
    "hover:bg-blue-700 bg-blue-600 text-white": !isDisabled,
    "mr-2 md:mr-3": direction === "left",
    "ml-2 md:ml-3": direction === "right",
  });
  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="h-4 w-4" />
    ) : (
      <ArrowRightIcon className="h-4 w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  );
}
