"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchCustomerById } from "./data";
import { z } from "zod";

const prisma = new PrismaClient();

const FormSchema = z.object({
  id: z.string(),
  userId: z.string({
    message: "Please select a customer.",
  }),
  firstName: z.string(),
  lastName: z.string(),
  amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0." }),
  paid: z.coerce.boolean(),
  avatar: z.string(),
});

const CreateSchema = FormSchema.omit({ id: true });
export async function createInvoice(prevState: object, formData: FormData) {
  const customer = await fetchCustomerById(formData.get("user")?.toString());

  const validatedFields = CreateSchema.safeParse({
    userId: customer?.userId,
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    amount: formData.get("amount"),
    paid: Number(formData.get("status")),
    avatar: customer?.avatar,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { userId, firstName, lastName, amount, paid, avatar } = validatedFields.data;

  try {
    await prisma.$queryRaw`INSERT INTO 'Invoices' (id, userId, firstName, lastName, amount, paid, avatar ) VALUES (${crypto.randomUUID()} ,${userId}, ${firstName},${lastName}, ${amount}, ${paid}, ${avatar})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create invoice.",
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, prevState: object, formData: FormData) {
  const customer = await fetchCustomerById(formData.get("user")?.toString());

  const validatedFields = CreateSchema.safeParse({
    userId: customer?.userId,
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    amount: formData.get("amount"),
    paid: Number(formData.get("status")),
    avatar: customer?.avatar,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { userId, firstName, lastName, amount, paid, avatar } = validatedFields.data;

  try {
    await prisma.$queryRaw`UPDATE Invoices SET userId = ${userId}, firstName = ${firstName}, lastName = ${lastName}, amount = ${amount}, paid = ${paid}, avatar= ${avatar} WHERE id = ${id}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create invoice.",
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await prisma.$queryRaw`DELETE FROM invoices WHERE id = ${`${id}`}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete User.",
    };
  }
  revalidatePath("/");
}
