import React from "react";
import SearchForm from "../../components/SearchForm";
import styles from "./SearchPage.module.css";
import { Hidden } from "@mui/material";

const SearchPage = (props) => {
  return (
    <div className={styles["search-row"]}>
      <div className={styles["form-block"]}>
        <h1 className={styles["form-title"]}>
          Найдите необходимые <br /> данные в пару кликов.
        </h1>
        <p className={styles["form-subtitle"]}>
          Задайте параметры поиска.
          <br /> Чем больше заполните, тем точнее поиск
        </p>
        <Hidden mdUp>
          <img
            className={styles["doc-img"]}
            src="./images/Document.svg"
            alt="document"
          />
        </Hidden>
        <SearchForm />
      </div>
      <div className={styles["img-col"]}>
        <Hidden lgDown>
          <div className={styles["img-row"]}>
            <img src="./images/Document.svg" alt="document" />
            <img src="./images/Folders.svg" alt="folders" />
          </div>
        </Hidden>
        <img
          className={styles["rocket-img"]}
          src="./images/manRocket.svg"
          alt="rocket"
        />
      </div>
    </div>
  );
};

export default SearchPage;
