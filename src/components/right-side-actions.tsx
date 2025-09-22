import Link from "next/link";
import { LogOutButton } from "./log-out-button";
import { Button } from "./ui/button";
import { getUser } from "../auth/server";
import { ShoppingCart } from "lucide-react";

export const RightSideActions = async () => {
  const user = await getUser();

  return (
    <div className="flex items-center gap-2">
      <Button variant="link" size="sm" className="cursor-pointer">
        <ShoppingCart />
      </Button>
      {user ? (
        <LogOutButton />
      ) : (
        <Button variant="default" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};
