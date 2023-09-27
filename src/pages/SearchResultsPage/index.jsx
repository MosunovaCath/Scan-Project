import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchCarousel from "../../components/SearchCarousel";
import NewsBlock from "../../components/NewsBlock";
import styles from "./SearchResultsPage.module.css";
import { useNavigate } from "react-router-dom";

const SearchResultsPage = (props) => {
  const news = useSelector((state) => state.searchNews);
  const navigate = useNavigate();

  useEffect(() => {
    if (news.isLoading === false && news.data.length === 0) {
      navigate("/");
    }
  }, [news.isLoading, news.data, navigate]);
  return (
    <>
      <div>
        <div className={styles["resultsPage"]}>
          <div className={styles["results-row"]}>
            <h1 className={styles["result-text"]}>
              Ищем. Скоро будут результаты
            </h1>
            <p className={styles["result-txt"]}>
              Поиск может занять некоторое время, просим сохранять терпение.
            </p>
          </div>
          <div className={styles["result-img"]}>
            <img src="./images/woman.svg" alt="woman" />
          </div>
        </div>
        <h2 className={styles["results-news"]}>Общая сводка</h2>
        <SearchCarousel />
        <h2 className={styles["results-col"]}>Список документов</h2>
        {news.isLoading ? <h1>Loading</h1> : <NewsBlock />}
      </div>
    </>
  );
};

export default SearchResultsPage;
