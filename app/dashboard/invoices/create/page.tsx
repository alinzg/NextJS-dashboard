import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/invoices/form";
import React from "react";

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div className="flex justify-center items-center">
      <Form invoice={""} customers={customers} />
    </div>
  );
}
