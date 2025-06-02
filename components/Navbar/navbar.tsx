"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import MobileSidebar from "../Sidebar/mobileSidebar";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("auth-storage");
    setToken("");
    router.push("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-md p-4 flex items-center justify-between">
  
      <button
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Bars2Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>

      <MobileSidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex items-center gap-2">
        <Button
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-sm"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
        <Button className="ml-2" onPress={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
