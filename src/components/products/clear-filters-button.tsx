"use client";

import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";

type Props = {
  clearFilters: () => void;
};

export const ClearFiltersButton = ({ clearFilters }: Props) => {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2"
      onClick={clearFilters}
    >
      <X className="h-4 w-4" />
      Limpiar
    </Button>
  );
};
