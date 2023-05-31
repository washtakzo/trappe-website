import React from "react";
import styles from "./Section.module.css";

type Props = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const Section = ({
  children,
  title,
  subTitle,
  className,
  contentClassName,
}: Props) => {
  return (
    <section className={className}>
      <div className={styles.container}>
        <h2 className="section-title">{title}</h2>
        {subTitle && <p className="section-sub-title">{subTitle}</p>}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
