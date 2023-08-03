import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import styles from "./CartModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import { CardContext } from "../../../store/card-context";
import Image from "next/image";
import { getTrappePrice } from "../../../utils/functions/math";

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

  const products = cardCtx.products;

  React.useEffect(() => {
    if (itemCount > 0) {
      dialogRef?.current?.showModal();
    }
  }, [itemCount, dialogRef]);

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
        <div>
          {products.map((product) => {
            const trappePrice = getTrappePrice(
              product.trappe,
              product.width,
              product.height
            );

            const method = product.info?.method;
            const address = product.info?.address;
            const city = product.info?.city;
            const postalCode = product.info?.postalCode;
            const feeText =
              method === "installation"
                ? "Frais d'installation : "
                : "Frais de livraison : ";
            const fee: number =
              method === "installation"
                ? product.trappe.setup_price
                : product.trappe.shipping_price;

            return (
              <div key={product.trappe.id} className={styles["cart__product"]}>
                <div className={styles["cart__product__image-container"]}>
                  <Image
                    alt={product.trappe.name}
                    src={product.trappe.images[0]}
                    fill
                    className={styles["cart__product__image"]}
                  />
                </div>
                <div>
                  <h3>{`${product.trappe.name} ${product.width}X${product.height}`}</h3>
                  <p>
                    {method === "shipping"
                      ? "Livraison"
                      : "Installation sur site"}
                  </p>
                  <p>Adresse : {address}</p>
                  <p>Ville : {city}</p>
                  <p>Code Postal : {postalCode}</p>
                  <p>Materiel : {trappePrice} €</p>
                  <p>{feeText + fee} €</p>
                  <p>Total : {+trappePrice + fee} €</p>
                </div>
              </div>
            );
          })}
        </div>
        <div>Footer</div>
      </dialog>
    </Portal>
  );
});

export default CartModal;
