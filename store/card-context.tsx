import React, { createContext, useState } from "react";
import { productsAreEqual } from "../utils/functions/math";

type CardValues = {
  products: Product[];
  itemsCount: number;
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  openCartDialog: () => void;
  closeCartDialog: () => void;
};

const initialValues: CardValues = {
  products: [],
  itemsCount: 0,
  addProduct: (product: Product) => {},
  deleteProduct: (product: Product) => {},
  openCartDialog: () => {},
  closeCartDialog: () => {},
};

export const CardContext = createContext(initialValues);

type Props = {
  children: React.ReactNode;
};

//FIXME:
//Pour forcer le useEffect servant a définir dialogCartEl
//Ceci car a chaque changement de page CardContextProvider est
//réévalué mais le useEffect ne se relance pas
//Et donc au changement de page je n'ai plus accès a ma dialog
let contextRenderCount = 0;

export const CardContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  console.log("redering context...");
  contextRenderCount++;

  //useRef n'est pas ré évalué à chaque render
  const dialogCartEl = React.useRef<HTMLDialogElement | null>(null);
  React.useEffect(() => {
    console.log("context use effect ...");
    //document est inacessible en dehors de useEffect
    //Ceci car NextJs s'execute côté serveur
    dialogCartEl.current = document.getElementById(
      "cart-dialog"
    ) as HTMLDialogElement;
  }, [contextRenderCount]);

  const openCartDialog = () => {
    console.log("openCartDialog");
    console.log(dialogCartEl);
    dialogCartEl?.current?.showModal();
  };

  const closeCartDialog = () => {
    console.log("closeCartDialog");
    dialogCartEl?.current?.close();
  };

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
    openCartDialog,
    closeCartDialog,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
