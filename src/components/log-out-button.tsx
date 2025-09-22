"use client";

import React, { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logOutAction } from "../actions/users";
import { toast } from "sonner";

export const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();
    if (!errorMessage) {
      toast.success("Sesión cerrada", {
        description: "Se ha cerrado la sesión correctamente",
      });
      router.push("/");
    } else {
      toast.error(errorMessage, {
        description: "Log Out",
      });
    }

    setLoading(false);
  };

  return (
    <DropdownMenuItem
      onClick={handleLogOut}
      className="text-destructive flex cursor-pointer items-center gap-2"
    >
      <LogOut className="text-primary h-4 w-4" />
      Sign Out
    </DropdownMenuItem>
  );
};
