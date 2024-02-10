import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductProps } from "@/utils/data/products";
import * as cardInMemory from "@/stores/helpers/card-in-memory";

export type ProductCard = {
  quantity: number;
} & ProductProps;

type UseCartStoreProps = {
  products: ProductCard[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<UseCartStoreProps>(
    (set) => ({
      products: [],
      addProduct: (product: ProductProps) =>
        set((state) => ({
          products: cardInMemory.addProduct(state.products, product),
        })),
      removeProduct: (id: string) =>
        set((state) => ({
          products: cardInMemory.removeProduct(state.products, id),
        })),
      clearCart: () => set({ products: [] }),
    }),
    {
      name: "nlw-expert:cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
