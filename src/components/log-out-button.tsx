"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { logOutAction } from "../actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <Button
      size="sm"
      variant="outline"
      disabled={loading}
      onClick={handleLogOut}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};
