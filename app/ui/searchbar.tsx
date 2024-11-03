"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  function handleSearch() {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function handleClear() {
    setTerm("");
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [term, setTerm] = useState<string>("");

  return (
    <div className="flex flex-row items-center">
      <input
        className="w-64 px-2 py-1 mr-4 rounded-md appearance-none border-2 border-gray-400 bg-gray-500 focus:outline-none focus:border-2 focus:bg-gray-200 focus:border-blue-400 text-gray-700"
        onChange={(e) => setTerm(e.currentTarget.value)}
        value={term}
        defaultValue={searchParams.get("query")?.toString()}></input>
      <button
        className="py-1 px-2 bg-blue-500 text-white rounded-md mr-2"
        onClick={handleSearch}>
        Search
      </button>
      <button
        className="py-1 px-2 bg-blue-400 text-white rounded-md mr-2"
        onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}
