import Link from "next/link";

export default function Home() {
  return (
    <main className="grow flex justify-center items-center gap-2 min-h-dvh bg-white">
      <div>you can mange your customers invoices using this dashboard</div>
      <Link
        href={"/dashboard"}
        prefetch={false}
        className="py-1 px-2 bg-blue-600 text-white rounded"
      >
        start
      </Link>
    </main>
  );
}
