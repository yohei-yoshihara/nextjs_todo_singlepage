"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

type Props = {
  totalPages: number;
};

function generatePageIndexes(totalPages: number) {
  const indexes: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    indexes.push(i + 1);
  }
  return indexes;
}

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const indexes = generatePageIndexes(totalPages);

  return (
    <ul className="flex flex-row items-center">
      {indexes.map((index) => {
        return (
          <li
            key={index}
            className={
              currentPage == index
                ? "text-blue-500 font-bold p-2"
                : "text-gray-500 p-2"
            }>
            <Link href={createPageURL(index)}>{index}</Link>
          </li>
        );
      })}
    </ul>
  );
}
