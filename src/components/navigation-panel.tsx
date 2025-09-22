"use client";

import { Home, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Productos", href: "/products", icon: Package },
];

export const NavigationPanel = () => {
  return (
    <>
      {navigationItems.map((item) => (
        <Link key={item.name} href={item.href} className="hover:underline">
          {item.name}
        </Link>
      ))}
    </>
  );
};

export const NavigationPanelMobile = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === pathname;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`mx-4 flex items-center gap-2 rounded-md p-2 hover:underline ${isActive ? "bg-primary-foreground" : "hover:primary-foreground"}`}
          >
            <Icon size={18} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
