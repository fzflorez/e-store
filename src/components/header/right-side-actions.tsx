import Link from "next/link";
import { Button } from "../ui/button";
import { getUser } from "../../auth/server";
import { ShoppingCart } from "lucide-react";
import { UserMenu } from "./user-menu";

export const RightSideActions = async () => {
  const user = await getUser();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button variant="link" size="sm" className="cursor-pointer">
        <ShoppingCart />
      </Button>
      {user ? (
        <UserMenu />
      ) : (
        <Button variant="default" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};
