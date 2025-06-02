'use client';

import { Dialog } from '@headlessui/react';
import { Button } from "@heroui/button";
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50 sm:hidden">
            <div className="fixed inset-0 bg-black/40 transition-opacity" aria-hidden="true" />

            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out"
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
                <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={onClose} aria-label="Fechar menu">
                        <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>

                <nav className="flex flex-col gap-4 p-4">
                    <Link href="/products" onClick={onClose}>
                        <Button>
                            Products</Button>
                    </Link>
                    <Link href="/charts" onClick={onClose}>
                        <Button>
                            Charts
                        </Button></Link>
                </nav>
            </div>
        </Dialog>
    );
}
