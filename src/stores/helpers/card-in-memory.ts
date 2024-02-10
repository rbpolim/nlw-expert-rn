import { ProductProps } from "@/utils/data/products";
import { ProductCard } from "@/stores/cart-store";

export const addProduct = (
  products: ProductCard[],
  newProduct: ProductProps
) => {
  const productExists = products.find(
    (product) => product.id === newProduct.id
  );

  if (productExists) {
    return products.map((product) =>
      product.id === newProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [
    ...products,
    {
      ...newProduct,
      quantity: 1,
    },
  ];
};

export const removeProduct = (products: ProductCard[], id: string) => {
  const productExists = products.find((product) => product.id === id);

  if (productExists?.quantity === 1) {
    return products.filter((product) => product.id !== id);
  }

  return products.map((product) =>
    product.id === id ? { ...product, quantity: product.quantity - 1 } : product
  );
};
