import React from "react";
import styles from "./Section.module.css";

type Props = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  className?: string;
};

const Section = ({ children, title, subTitle, className }: Props) => {
  return (
    <section className={className}>
      <div className={styles.container}>
        <h2 className="section-title">{title}</h2>
        {subTitle && <p className="section-sub-title">{subTitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Section;
