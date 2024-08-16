"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchHandler = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set("query", term) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form>
      <input
        type="text"
        placeholder="search for invoices"
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
        className="py-2 px-4 border rounded-md w-64"
      />
    </form>
  );
}
