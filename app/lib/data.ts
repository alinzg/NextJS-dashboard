import { PrismaClient } from "@prisma/client";
import { MONTHS } from "./constants";

const prisma = new PrismaClient();

export async function fetchRevenue() {
  const revenueData: Array<{ date: string; amount: number }> =
    await prisma.$queryRaw`SELECT date, amount FROM invoices`;
  let revenueRaw = [];
  for (let x of revenueData) {
    revenueRaw.push({
      month: x.date.toString().split(" ")[3] === "2023" ? x.date.toString().split(" ")[1] : null,
      amount: x.amount,
    });
  }
  let revenue = [];
  for (let m of MONTHS) {
    revenue.push({
      month: m,
      totalSale: revenueRaw
        .filter((o) => o.month === m)
        .map((o) => o.amount)
        .reduce((a, b) => a + b, 0),
    });
  }
  return revenue;
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const invoices = await prisma.$queryRaw`
    SELECT * FROM invoices WHERE
    invoices.firstName LIKE ${`%${query}%`} OR
    invoices.lastName LIKE ${`%${query}%`} OR
    invoices.amount LIKE ${query}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return invoices;
}

export async function fetchInvoicePages(query: string) {
  try {
    const count: any = await prisma.$queryRaw`
    SELECT COUNT(*) FROM invoices WHERE
    invoices.firstName LIKE ${`%${query}%`} OR
    invoices.lastName LIKE ${`%${query}%`} OR
    invoices.amount LIKE ${query}
  `;
    const totalPages = Math.ceil(Number(Object.values(count[0])[0]) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  const invoice: Array<object> = await prisma.$queryRaw`
    SELECT id, userId, amount, paid FROM invoices WHERE id = ${id}
  `;
  return invoice[0];
}

export async function fetchCustomerById(id: string | undefined) {
  const customer: { userId: string; firstName: string; lastName: string; avatar: string }[] =
    await prisma.$queryRaw`
    SELECT userId, firstName, lastName , avatar FROM invoices WHERE userId = ${id} LIMIT 1
  `;
  return customer[0];
}

export async function fetchCustomers() {
  const customers = await prisma.$queryRaw`
    SELECT userId, firstName, lastName FROM invoices  
  `;
  return customers;
}
