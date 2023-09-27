import React from "react";
import { tariffData } from "./data";
import TariffCol from "../TariffCol";
import { Grid } from "@mui/material";
import styles from "./TariffRow.module.css";

const TariffRow = (props) => {
  return (
    <div>
      <h1 className={styles["tariff-text"]}>наши тарифы</h1>
      <div className={styles["tariff-row"]}>
        {tariffData.map((tariff, i) => (
          <TariffCol key={i} tariff={tariff} />
        ))}
      </div>
    </div>
  );
};

export default TariffRow;
