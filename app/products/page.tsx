"use client";

import ProductForm from "@/components/ProductsTable/productForm";
import ProductsTable from "@/components/ProductsTable/productsTable";
import { Button } from '@heroui/button';
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/navbar";

export default function Products() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!token && hydrated) {
      router.push('/');
    }
  }, [token, router, hydrated]);

  if (!hydrated) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-800 transition-colors duration-300">
        <motion.main
          className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center space-y-8 sm:py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Products
          </motion.h1>

          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button
              className="transition cursor-pointer duration-300 ease-in-out hover:opacity-90"
              onClick={() => setIsOpen(true)}
            >
              New Product
            </Button>
          </motion.div>


          {isOpen && (

            <ProductForm isOpen={isOpen} product={null} onClose={() => setIsOpen(false)} />

          )}

          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <ProductsTable />
          </motion.div>
        </motion.main>
      </div>
    </>
  );
}
