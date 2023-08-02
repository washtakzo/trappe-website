import React, { useRef, useState } from "react";
import styles from "./ProductCustomizer.module.css";
import { getRectanglePercentages } from "../../../utils/functions/math";

type Props = {
  trappe: Trappe;
  width: number;
  height: number;
  onChangeWidth: (width: number) => void;
  onChangeHeight: (height: number) => void;
};

const ProductCustomizer = ({
  trappe,
  width,
  height,
  onChangeWidth,
  onChangeHeight,
}: Props) => {
  const minWidth = trappe.min_width;
  const maxWidth = trappe.max_width;

  const minHeight = trappe.min_height;
  const maxHeight = trappe.max_height;

  const schemaMesures = getRectanglePercentages(height, width);

  const changeWidthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < minWidth ? minWidth : value > maxWidth ? maxWidth : value;

    onChangeWidth(newWidth);
  };

  const changeHeightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minHeight ? minHeight : value > maxHeight ? maxHeight : value;

    onChangeHeight(newHeight);
  };

  const validateHeightHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minHeight ? minHeight : value > maxHeight ? maxHeight : value;

    onChangeHeight(newHeight);
  };

  const validateWidthHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < minWidth ? minWidth : value > maxWidth ? maxWidth : value;

    onChangeWidth(newWidth);
  };

  return (
    <section className={styles["product-customizer"]}>
      <h2 className={"section-title"}>Trappe sur mesure</h2>
      <div className={styles["customizer-container"]}>
        <div className={styles["blueprint"]}>
          <div className={styles["blueprint__schema-container"]}>
            <p>{width}</p>
            <div></div>
            <div className={styles["blueprint__schema-container__background"]}>
              <div
                className={styles["blueprint__schema"]}
                style={{
                  height: schemaMesures.heightPercentage + "%",
                  width: schemaMesures.widthPercentage + "%",
                }}
              />
            </div>
            <p>{height}</p>
          </div>
        </div>
        <div className={styles["pickers-container"]}>
          <div className={styles["picker-container"]}>
            <input
              className={styles["picker-slider"]}
              type="range"
              min={minWidth}
              max={maxWidth}
              value={width}
              onChange={changeWidthHandler}
              onInput={changeWidthHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={minWidth}
              max={maxWidth}
              value={width}
              onInput={changeWidthHandler}
              onBlur={validateWidthHandler}
            />
          </div>
          <div className={styles["picker-container"]}>
            <input
              className={styles["picker-slider"]}
              type="range"
              min={minHeight}
              max={maxHeight}
              value={height}
              onChange={changeHeightHandler}
              onInput={changeHeightHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={minHeight}
              max={maxHeight}
              value={height}
              onInput={changeHeightHandler}
              onBlur={validateHeightHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCustomizer;
