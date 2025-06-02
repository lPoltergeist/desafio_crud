import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="sm:hidden p-2 rounded-md focus:outline-none focus:ring"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <XMarkIcon />
            ) : (
              <Bars2Icon />
            )}
          </svg>
        </button>

        <div className={`flex flex-col sm:flex-row sm:gap-4 absolute sm:static top-full left-0 w-full sm:w-auto bg-white dark:bg-zinc-900 sm:bg-transparent sm:dark:bg-transparent shadow-md sm:shadow-none transition-transform duration-300 ease-in-out
          ${open ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'}`}>
          <Link href="/products">
            <Button variant="ghost" className="text-base cursor-pointer w-full sm:w-auto" onClick={() => setOpen(false)}>
              Products
            </Button>
          </Link>
          <Link href="/charts">
            <Button variant="ghost" className="text-base cursor-pointer w-full sm:w-auto" onClick={() => setOpen(false)}>
              Charts
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-sm"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>
    </nav>
  );
}
