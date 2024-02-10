import { addProduct } from "./helpers/card-in-memory";
import { create } from "zustand";

import { ProductProps } from "@/utils/data/products";
import * as cardInMemory from "@/stores/helpers/card-in-memory";

export type ProductCard = {
  quantity: number;
} & ProductProps;

type UseCartStoreProps = {
  products: ProductCard[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: string) => void;
};

export const useCartStore = create<UseCartStoreProps>((set) => ({
  products: [],
  addProduct: (product: ProductProps) =>
    set((state) => ({
      products: cardInMemory.addProduct(state.products, product),
    })),
  removeProduct: (id: string) =>
    set((state) => ({
      products: cardInMemory.removeProduct(state.products, id),
    })),
}));
