import { fetchFilteredInvoices } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "./buttons";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  return (
    <div>
      <div>
        {invoices?.map((invoice: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-5 py-2 hover:bg-gray-50 items-center content-end"
          >
            <div className="flex gap-2 items-center col-span-2 w-full">
              <Image alt="avatar" src={invoice.avatar} width={35} height={35} />
              <h2>
                {invoice.firstName} {invoice.lastName}
              </h2>
            </div>
            <h3>{invoice.amount}$</h3>
            {invoice.paid ? (
              <div className="flex gap-1 text-white bg-green-600 pl-2 pr-1.5 py-1 text-xs rounded-full ml-[-100px] place-self-center">
                <p>paid</p>
                <CheckIcon className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex gap-1 bg-gray-200 text-gray-500 pl-2 pr-1.5 py-1 text-xs rounded-full w-max ml-[-100px] place-self-center">
                <p>pending</p>
                <ClockIcon className="h-4 w-4" />
              </div>
            )}
            <div>
              <Link
                href={`invoices/${invoice.id}/edit`}
                className="py-1 px-2 bg-gray-300 rounded-full text-sm"
              >
                edit
              </Link>
              <DeleteButton id={invoice.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
