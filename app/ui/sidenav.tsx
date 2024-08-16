"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between gap-1 p-1 h-full">
      <Link
        className={clsx("py-2 px-4 rounded", {
          "text-white bg-blue-600 cursor-default": pathname === "/dashboard",
          "text-gray-500 bg-gray-300 hover:bg-gray-400 hover:text-white": pathname !== "/dashboard",
        })}
        href={"/dashboard"}
      >
        chart
      </Link>
      <Link
        className={clsx("py-2 px-4 rounded", {
          "text-white bg-blue-600 cursor-default": pathname === "/dashboard/invoices",
          "text-gray-500 bg-gray-300 hover:bg-gray-400 hover:text-white":
            pathname !== "/dashboard/invoices",
        })}
        href={"/dashboard/invoices"}
      >
        invoices
      </Link>
      <Link
        className="flex justify-center items-center gap-1 py-2 px-4 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded mt-auto"
        href={"/"}
      >
        <p>back</p>
        <PowerIcon className="h-5 w-5 text-gray-500" />
      </Link>
    </div>
  );
}
