'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { createProduct, updateProduct, updateThumbnail } from '@/data/api/HttpClient';
import { useAuthStore } from '@/store/authStore';
import ProductSchema from '@/schemas/productSchema';
import { useProductStore } from '@/store/ProductStore';
import { ProductDTO } from '@/data/dtos/products';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface ProductFormProps {
  product: ProductDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const token = useAuthStore((state) => state.token);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    setTitle(product?.title || '');
    setDescription(product?.description || '');
    setThumbnailURL(product?.thumbnail || '');
    setPreview(product?.thumbnail || '');
    setThumbnailFile(null);
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      setPreview(URL.createObjectURL(file));
      setThumbnailURL('');
    }
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailURL(e.target.value);
    setThumbnailFile(null);
    setPreview(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!token) return;

      const result = ProductSchema.safeParse({ title, description });
      if (!result.success) {
        alert(result.error.issues[0].message);
        return;
      }

      if (product?.id) {
        const response = await updateProduct(product.id, title, description);

        if (response.data.message) {
          toast.success(response.data.message);
        }

        const updatedProduct = {
          id: product.id,
          title,
          description,
          status: true,
        };
        useProductStore.getState().updateProduct(updatedProduct);

        if (thumbnailFile) {
          await updateThumbnail(product.id, thumbnailFile);
        }

      } else {
        const response = await createProduct(title, description, thumbnailURL || thumbnailFile || '');

        if (response.message) {
          toast.success(response.message);
        }
        
        const newProduct = {
          id: response.id,
          title,
          description,
          thumbnail: thumbnailURL || '',
          status: true,
        };
        useProductStore.getState().addProduct(newProduct);
      }

      onClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error('Failed to update: ' + e.message);
      } else {
        toast.error('Failed to update: Unknown error');
      }
    }
  };

  return (
    <Transition show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40 transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className=" bg-white dark:bg-zinc-900 rounded-xl shadow-2xl
                        w-full max-w-md p-6 space-y-4
                            transform transition-all scale-100
                                  sm:max-w-lg
                                d:max-w-xl">
            <Dialog.Title className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {product?.id ? 'Update Product' : 'New Product'}
            </Dialog.Title>

            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-gray-900"
              autoComplete="off"
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-gray-900"
              autoComplete="off"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="thumbnail-url">
                Image URL
              </label>
              <Input
                id="thumbnail-url"
                type="text"
                placeholder="https://..."
                value={thumbnailURL}
                onChange={handleURLChange}
                disabled={!!thumbnailFile}
                className="text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="thumbnail-file">
                Or select a file
              </label>
              <input
                id="thumbnail-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 dark:text-gray-300"
              />
            </div>

            {preview && (
              <Image
                src={preview}
                alt="Preview"
                className="mt-4 max-h-48 object-contain rounded"
                width={300}
                height={200}
                unoptimized
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-start pt-4">
              <Button className="w-full sm:w-[100px]" onClick={handleSubmit}>
                Save
              </Button>
              <Button className="w-full sm:w-[100px]" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>

          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductForm;
