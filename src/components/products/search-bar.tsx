"use client";

import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="relative flex-1">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        placeholder="Buscar productos..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
