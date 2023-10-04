import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

import styles from "./CartModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { CardContext } from "../../../store/card-context";
import Image from "next/image";
import { getTrappePrice } from "../../../utils/functions";
import CartItem from "../CartItem/CartItem";

const CartModal = () => {
  const cardCtx = useContext(CardContext);
  const products = cardCtx.products;

  const router = useRouter();
  const goCheckout = () => {
    router.push("/checkout");
  };

  const clickBackdropHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLDialogElement).nodeName === "DIALOG") {
      cardCtx.closeCartDialog();
    }
  };

  return (
    <dialog
      className={styles.dialog}
      id="cart-dialog"
      onClick={clickBackdropHandler}
    >
      <div className={styles.cart}>
        <div className={styles["cart__header"]}>
          <h2>Panier</h2>
          <CustomButton
            className={styles["cart__header__close-button"]}
            onClick={cardCtx.closeCartDialog}
          >
            X
          </CustomButton>
        </div>
        <div className={styles["cart__products-container"]}>
          {products.map((product) => (
            <CartItem
              key={`${product.trappe.id} ${product.width}x${product.length}`}
              product={product}
            />
          ))}
        </div>
        <div className={styles["cart__footer"]}>
          <div className={styles["cart__footer__total-container"]}>
            <p>Total</p>
            <p>{cardCtx.totalAmount.toFixed(2)} €</p>
          </div>
          <CustomButton
            isBlack={true}
            className={styles["cart__footer__paiment-button"]}
            onClick={goCheckout}
          >
            Paiement
          </CustomButton>
        </div>
      </div>
    </dialog>
  );
};

export default CartModal;
