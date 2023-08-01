import React, { createContext, useState } from "react";

type CardValues = {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
};

type Product = {
  trappe: Trappe;
  width: number;
  height: number;
  quantity: number;
};

const initialValues: CardValues = {
  products: [],
  addProduct: (product: Product) => {},
  deleteProduct: (product: Product) => {},
};

export const CardContext = createContext(initialValues);

type Props = {
  children: React.ReactNode;
};

export const CardContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
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
    addProduct,
    deleteProduct,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
