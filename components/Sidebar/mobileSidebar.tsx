'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Button } from "@heroui/button";
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 sm:hidden" onClose={onClose}>
        {/* Overlay com fade */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Sidebar com slide lateral */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-transform duration-300 ease-out"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-200 ease-in"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-64 bg-white dark:bg-zinc-900 p-4 shadow-xl h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link href="/products" onClick={onClose}><Button>Products</Button></Link>
                  <Link href="/charts" onClick={onClose}><Button>Charts</Button></Link>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
