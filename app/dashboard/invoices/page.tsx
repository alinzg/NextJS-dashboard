import { fetchInvoicePages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import Link from "next/link";
import React from "react";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicePages(query);
  return (
    <div className="flex flex-col items-center justify-center mt-[-72px]">
      <div className="p-6 pb-4 my-2 border rounded-md shadow h-min">
        <div className="flex justify-between items-center pb-2">
          <Search />
          <Link
            href={"invoices/create"}
            className="py-2 px-4 bg-blue-600 text-sm rounded text-white"
          >
            create new invoice
          </Link>
        </div>
        <Table query={query} currentPage={currentPage} />
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default Page;
