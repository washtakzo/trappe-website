import React from "react";
import styles from "./SectionMainProducts.module.css";

import ProductOverview from "../ProductOverview/ProductOverview";
import Section from "../../UI/Section/Section";
import { useRouter } from "next/router";

import { DUMMY_DATA } from "../../../utils/data";

const SectionMainProducts = () => {
  const router = useRouter();

  const clickHandler = (id:string) => {
    router.push({pathname:"conception",query:{id}});
  };

  return (
    <Section
      title="What is included in Coworking Z"
      contentClassName={styles.content}
    >
      {DUMMY_DATA.map((trappe) => (
        <ProductOverview
          key={trappe.id}
          onClick={clickHandler.bind(this, trappe.id)}
          trappe={trappe}
        />
      ))}
    </Section>
  );
};

export default SectionMainProducts;
