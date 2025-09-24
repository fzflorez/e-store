"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox"; // ✅ para tipar correctamente

// 🔒 Tipado fuerte para los filtros
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "name" | "price" | "rating";
  sortOrder?: "asc" | "desc";
  inStock?: boolean;
}

interface Props {
  categories: string[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

export function ProductFiltersComponent({
  categories,
  filters,
  onFiltersChange,
  onClearFilters,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);

  // 🔒 Genérico para tipar correctamente el valor según la clave
  const handleFilterChange = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== "all",
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Buscar productos..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                Activo
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtrar Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Categoría */}
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select
                  value={filters.category || "all"}
                  onValueChange={(value: string) =>
                    handleFilterChange(
                      "category",
                      value === "all" ? undefined : value,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Precio mínimo */}
              <div className="space-y-2">
                <Label>Precio Mínimo</Label>
                <Input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </div>

              {/* Precio máximo */}
              <div className="space-y-2">
                <Label>Precio Máximo</Label>
                <Input
                  type="number"
                  placeholder="$1.000.000"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </div>

              {/* Ordenar por */}
              <div className="space-y-2">
                <Label>Ordenar por</Label>
                <Select
                  value={filters.sortBy || "newest"}
                  onValueChange={(value: string) =>
                    handleFilterChange(
                      "sortBy",
                      value as ProductFilters["sortBy"], // ✅ casteo seguro
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Novedades</SelectItem>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="price">Precio</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock || false}
                onCheckedChange={(checked: CheckedState) =>
                  handleFilterChange(
                    "inStock",
                    checked === true ? true : undefined, // ✅ solo true o undefined
                  )
                }
              />
              <Label htmlFor="inStock">Solo disponibles</Label>
            </div>

            {/* Orden asc/desc */}
            <div className="flex items-center gap-4">
              <Label>Orden:</Label>
              <div className="flex gap-2">
                <Button
                  variant={filters.sortOrder === "asc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("sortOrder", "asc")}
                >
                  Ascendente
                </Button>
                <Button
                  variant={filters.sortOrder === "desc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("sortOrder", "desc")}
                >
                  Descendente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
