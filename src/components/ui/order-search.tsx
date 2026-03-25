"use client";

import { SearchIcon, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useRef, useState, useEffect } from "react";

const OrderSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const [inputValue, setInputValue] = useState(
    searchParams.get("q")?.toString() || "",
  );
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(searchParams.get("q")?.toString() || "");
  }, [searchParams]);

  const handleSearch = (term: string) => {
    setInputValue(term);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // 👇 A CORREÇÃO ESTÁ AQUI: Adicionamos o .toString()
      const params = new URLSearchParams(searchParams.toString());

      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, 400);
  };

  const handleClear = () => {
    setInputValue("");

    // 👇 A CORREÇÃO ESTÁ AQUI TAMBÉM: Adicionamos o .toString()
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <div className="relative flex w-full items-center">
        <SearchIcon className="absolute left-3 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Buscar por Nº do Pedido..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-zinc-950 py-2 pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#8162FF] focus:outline-none"
        />

        {isPending && (
          <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-[#8162FF]" />
        )}
      </div>

      {searchParams.get("q") && (
        <button
          onClick={handleClear}
          className="rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          Limpar
        </button>
      )}
    </div>
  );
};

export default OrderSearch;
