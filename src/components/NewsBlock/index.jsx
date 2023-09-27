import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewsCol from "./NewsCol";
import { Grid } from "@mui/material";
import styles from "./NewsBlock.module.css";
const NewsBlock = (props) => {
  const news = useSelector((state) => state.searchNews.data);
  const token = useSelector((state) => state.auth.token);
  const [newsData, setNewsData] = useState([]);
  const [countOnPage, setCountOnPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
    const resData = {
      ids: [],
    };

    const startIndex = countOnPage - 10;
    const endIndex = startIndex + 10;

    if (startIndex >= news.length) {
      setIsLoading(false);
      return;
    }

    news
      .slice(startIndex, endIndex)
      .forEach((element) => resData.ids.push(element.encodedId));

    const requestData = {
      method: "POST",
      headers,
      body: JSON.stringify(resData),
    };

    fetch("https://gateway.scan-interfax.ru/api/v1/documents", requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setNewsData((prev) => [...prev, ...data]);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, [countOnPage, news]);

  if (news.length === 0)
    return <h1 className={styles["text-null"]}>Найдено 0 вариантов</h1>;

  return (
    <>
      <Grid container justifyContent={"space-evenly"}>
        {newsData.map((item, i) => (
          <NewsCol key={i} obj={item.ok} />
        ))}
      </Grid>

      {news.length > countOnPage && (
        <div className={styles["btn-row"]}>
          <button
            onClick={() => {
              setCountOnPage((prev) => prev + 10);
            }}
            className={styles["results-btn"]}
          >
            Показать больше
          </button>
        </div>
      )}
    </>
  );
};

export default NewsBlock;
