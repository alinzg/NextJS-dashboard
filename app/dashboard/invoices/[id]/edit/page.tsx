import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Form from "@/app/ui/invoices/form";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const invoice = await fetchInvoiceById(id);
  const customers = await fetchCustomers();
  return (
    <div className="flex justify-center items-center">
      <Form invoice={invoice} customers={customers} />
    </div>
  );
}
