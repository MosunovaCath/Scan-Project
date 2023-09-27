import React, { useEffect, useState } from "react";
import styles from "./XMLViewer.module.css";

const XMLViewer = ({ xmlString }) => {
  const [textContent, setTextContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const sentences = xmlDoc.querySelectorAll("sentence");
    let text = "";
    sentences.forEach((sentence) => {
      text += sentence.textContent + "\n";
    });
    setTextContent(text.trim());
  }, [xmlString]);

  return (
    <div className="news-text">
      <div>
        <p
          className={styles["text"]}
          dangerouslySetInnerHTML={{ __html: textContent }}
        />
      </div>
    </div>
  );
};

export default XMLViewer;
