"use client";

import { deleteInvoice } from "@/app/lib/actions";

export function DeleteButton({ id }: { id: string }) {
  return (
    <button
      className="py-1 px-2 ml-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full text-sm"
      onClick={() => {
        deleteInvoice(id);
      }}
    >
      delete
    </button>
  );
}
