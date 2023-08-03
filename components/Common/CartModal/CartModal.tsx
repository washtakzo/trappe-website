import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import styles from "./CartModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { CardContext } from "../../../store/card-context";

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

  React.useEffect(() => {
    if (cardCtx.itemsCount > 0) {
      dialogRef?.current?.showModal();
    }
  }, [cardCtx.itemsCount]);

  return (
    <Portal domElementId="__next">
      <dialog className={styles.dialog} ref={dialogRef}>
        <div className={styles["cart__header"]}>
          <h2>Panier</h2>
          <CustomButton
            className={styles["cart__close-button"]}
            onClick={() => dialogRef?.current?.close()}
          >
            X
          </CustomButton>
        </div>
      </dialog>
    </Portal>
  );
});

export default CartModal;
