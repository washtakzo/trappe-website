import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import styles from "./CartModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { CardContext } from "../../../store/card-context";
import Image from "next/image";
import { getTrappePrice } from "../../../utils/functions/math";
import CartItem from "../CartItem/CartItem";

type PortalProps = {
  children: React.ReactNode;
  domElementId: string;
};

const Portal = ({ children, domElementId }: PortalProps) => {
  const [render, setRender] = React.useState<React.ReactPortal | null>(null);

  React.useEffect(() => {
    const domEl = document.getElementById(domElementId);

    if (!domEl) return;

    setRender(createPortal(children, domEl));
  }, []);

  return render;
};

const CartModal = React.forwardRef(function CardModal(
  _,
  dialogRef: React.ForwardedRef<HTMLDialogElement>
) {
  const cardCtx = useContext(CardContext);

  const itemCount = cardCtx.itemsCount;

  // const products = cardCtx.products;
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    setProducts(cardCtx.products);
  }, [cardCtx]);

  React.useEffect(() => {
    if (itemCount > 0) {
      dialogRef?.current?.showModal();
    }
  }, [itemCount, dialogRef]);

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.cart}>
        <div className={styles["cart__header"]}>
          <h2>Panier</h2>
          <CustomButton
            className={styles["cart__header__close-button"]}
            onClick={() => dialogRef?.current?.close()}
          >
            X
          </CustomButton>
        </div>
        <div className={styles["cart__products-container"]}>
          {products.map((product) => (
            <CartItem key={product.trappe.id} product={product} />
          ))}
        </div>
        <div className={styles["cart__footer"]}>
          <div className={styles["cart__footer__total-container"]}>
            <p>Total</p>
            <p>123 €</p>
          </div>
          <CustomButton className={styles["cart__footer__paiment-button"]}>
            Paiementss
          </CustomButton>
        </div>
      </div>
    </dialog>
  );
});

export default CartModal;
