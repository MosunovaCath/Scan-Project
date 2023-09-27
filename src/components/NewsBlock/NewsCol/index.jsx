import { Grid } from "@mui/material";
import React from "react";
import styles from "./NewsCol.module.css";
import XMLViewer from "../../XMLViewer";

const NewsCol = ({ obj }) => {
  const {
    attributes,
    content,
    dedupClusterId,
    entities,
    id,
    issueDate,
    language,
    schemaVersion,
    source,
    title,
    url,
  } = obj;

  const formatDate = (newDate) => {
    const date = new Date(newDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}\t`;
  };

  return (
    <Grid className={styles["news-col"]} item md={9} lg={5}>
      <div>
        <span>{formatDate(issueDate)}</span>
        <span>{source.name}</span>
      </div>
      <h2>{title.text}</h2>
      <div>
        {attributes.isTechNews && (
          <span className={styles["news-text"]}>Технические новости</span>
        )}
        {attributes.isAnnouncement && (
          <span className={styles["news-text"]}>Анонсы</span>
        )}
        {attributes.isDigest && (
          <span className={styles["news-text"]}>Новости</span>
        )}
        {attributes.isSpeechRecognition && (
          <span className={styles["news-text"]}>Прямая речь</span>
        )}
      </div>

      <XMLViewer xmlString={content.markup} />
      <div className={styles["news-block"]}>
        <a className={styles["news-link"]} href={url} target="_blank">
          Читать в источнике
        </a>
        <span className={styles["news-words"]}>
          {" "}
          {attributes.wordCount} слова
        </span>
      </div>
      <p></p>
      <div>
        <span></span>
      </div>
    </Grid>
  );
};

export default NewsCol;
