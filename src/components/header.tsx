import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Menu, Store } from "lucide-react";
import Link from "next/link";
import { NavigationPanel, NavigationPanelMobile } from "./navigation-panel";
import { RightSideActions } from "./right-side-actions";
import { DarkModeToggle } from "./dark-mode-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-white/30 px-5 backdrop-blur-lg md:justify-around md:px-0">
      <Link href="/" className="flex items-center gap-3">
        <Store size={24} />
        <span className="hidden text-xl font-bold sm:block">E-Store</span>
      </Link>

      <div className="hidden gap-4 md:flex">
        <NavigationPanel />
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <RightSideActions />
        <DarkModeToggle />

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu size={18} />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <div>
              <NavigationPanelMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
