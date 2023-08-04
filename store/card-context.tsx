import React, { createContext, useState } from "react";
import { productsAreEqual } from "../utils/functions/math";

type CardValues = {
  products: Product[];
  itemsCount: number;
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
};

const initialValues: CardValues = {
  products: [],
  itemsCount: 0,
  addProduct: (product: Product) => {},
  deleteProduct: (product: Product) => {},
};

export const CardContext = createContext(initialValues);

type Props = {
  children: React.ReactNode;
};

export const CardContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const itemsCount = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const addProduct = (product: Product) => {
    const productsCopy = [...products];

    const productIsAlreadyInCard =
      productsCopy.findIndex((p) => productsAreEqual(p, product)) >= 0;

    if (productIsAlreadyInCard) {
      const updatedProducts = productsCopy.map((p) => {
        if (productsAreEqual(p, product)) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });

      setProducts(updatedProducts);
    } else {
      setProducts((state) => [...state, product]);
    }
  };

  const deleteProduct = (product: Product) => {
    const productsCopy = [...products];

    const productIsAlreadyInCard =
      productsCopy.findIndex(
        (p) =>
          p.trappe.id === product.trappe.id &&
          p.width === product.width &&
          p.height === product.height
      ) >= 0;

    if (productIsAlreadyInCard) {
      const updatedProducts = productsCopy.map((p) => {
        if (p.trappe.id === product.trappe.id) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });

      const filteredProducts = updatedProducts.filter((p) => p.quantity > 0);

      setProducts(filteredProducts);
    }
  };

  const value = {
    products,
    itemsCount,
    addProduct,
    deleteProduct,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
