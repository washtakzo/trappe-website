import React, { useRef, useState } from "react";
import styles from "./ProductCustomizer.module.css";
import { getRectanglePercentages } from "../../../utils/functions";

type Props = {
  trappe: Trappe;
  width: number;
  length: number;
  onChangeWidth: (width: number) => void;
  onChangeLength: (height: number) => void;
};

const ProductCustomizer = ({
  trappe,
  width,
  length,
  onChangeWidth,
  onChangeLength,
}: Props) => {
  const minWidth = trappe.min_width;
  const maxWidth = trappe.max_width;

  const minlength = trappe.min_length;
  const maxLength = trappe.max_length;

  const schemaMesures = getRectanglePercentages(length, width);

  const changeWidthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newWidth =
      value < minWidth ? minWidth : value > maxWidth ? maxWidth : value;

    onChangeWidth(newWidth);
  };

  const changeLengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minlength ? minlength : value > maxLength ? maxLength : value;

    onChangeLength(newHeight);
  };

  const validateHeightHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newHeight =
      value < minlength ? minlength : value > maxLength ? maxLength : value;

    onChangeLength(newHeight);
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
            <p>{length}</p>
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
              min={minlength}
              max={maxLength}
              value={length}
              onChange={changeLengthHandler}
              onInput={changeLengthHandler}
            />
            <input
              className={styles["picker-input"]}
              type="number"
              min={minlength}
              max={maxLength}
              value={length}
              onInput={changeLengthHandler}
              onBlur={validateHeightHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCustomizer;
