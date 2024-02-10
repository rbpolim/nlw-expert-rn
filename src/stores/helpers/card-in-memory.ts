import { ProductProps } from "@/utils/data/products";
import { ProductCard } from "../cart-store";

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
