"use client";
import { createInvoice, updateInvoice } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";

export default function Form({ invoice, customers }: { invoice: any; customers: any }) {
  const initialState = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice?.id);
  const [state, dispatch] = useFormState(
    invoice ? updateInvoiceWithId : createInvoice,
    initialState
  );
  return (
    <form action={dispatch} className="p-4 mt-[-72px] border rounded-lg shadow flex flex-col gap-2">
      <div>
        <select
          name="user"
          id=""
          defaultValue={invoice ? invoice.userId : "default"}
          className="border rounded px-2 py-1.5 w-full"
        >
          <option value="default" disabled>
            Select customer
          </option>
          {customers?.map((customer: any, index: number) => (
            <option value={customer.userId} key={index}>
              {`${customer.firstName} ${customer.lastName}`}
            </option>
          ))}
        </select>
        {state.errors?.userId &&
          state.errors.userId.map((error, index) => (
            <div key={index}>
              <p className="mt-1 text-sm text-red-500" key={error}>
                {error}
              </p>
            </div>
          ))}
      </div>
      <div>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="">amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            name="amount"
            defaultValue={invoice?.amount}
            className="border rounded px-3 py-1"
          />
        </div>
        {state.errors?.amount &&
          state.errors.amount.map((error, index) => (
            <div key={index}>
              <p className="mt-1 text-sm text-red-500" key={error}>
                {error}
              </p>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <h3>status</h3>
        <fieldset className="flex gap-3">
          <div>
            <label
              htmlFor="paid"
              className="mr-0.5 text-green-900 bg-lime-500 px-2 py-1 text-sm rounded-full"
            >
              paid
            </label>
            <input
              id="paid"
              name="status"
              value={1}
              type="radio"
              defaultChecked={invoice.paid ? true : false}
            />
          </div>
          <div>
            <label htmlFor="pending" className="mr-0.5 bg-gray-300 px-2 py-1 text-sm rounded-full">
              pending
            </label>
            <input
              id="pending"
              name="status"
              value={0}
              type="radio"
              defaultChecked={invoice.paid ? false : true}
            />
          </div>
        </fieldset>
      </div>
      <div className="mt-2">
        <Link href={"/dashboard/invoices"} className="text-sm">
          Cancel
        </Link>
        <button type="submit" className="bg-blue-600 text-white px-2 py-1 ml-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
