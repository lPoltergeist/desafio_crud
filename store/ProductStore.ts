import { create } from 'zustand'
import { ProductDTO } from '@/data/dtos/products'

interface ProductState {
    updateProduct(updatedProduct: { id: string; title: string; description: string; status: boolean }): unknown
    products: ProductDTO[]
    total: number
    setProducts: (products: ProductDTO[], total: number) => void
    removeProduct: (id: number | string) => void  
    addProduct: (product: ProductDTO) => void 
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,
  setProducts: (products, total) => set(() => ({ products, total })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      total: state.total - 1,
    })),
  addProduct: (product: ProductDTO) =>
    set((state) => ({
      products: [product, ...state.products],
      total: state.total + 1,
    })),
  updateProduct: (product: ProductDTO) => 
  set((state) => ({
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    total: state.total, 
  })),

}));

