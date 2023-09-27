import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MainCarousel.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

export default function SearchCarousel() {
  const histograms = useSelector((state) => state.searchResults);

  const [totalDocuments, riskFactors] = useSelector(
    (state) => state.searchResults.data || []
  );
  function formatDateToDDMMYYYY(dateIncome) {
    const date = new Date(dateIncome);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const sliderLength =
    totalDocuments?.data >= 8 ? 8 : totalDocuments?.data.length;

  if (!sliderLength) return <h1>no data</h1>;
  return (
    <Grid container justifyContent={"center"}>
      <div className={styles["swiper-block"]}>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <Swiper
          slidesPerView={sliderLength}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: sliderLength,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className={styles["mySwiper"]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          {histograms.isLoading ? (
            <>
              <SwiperSlide className={styles["full-slide"]}>
                <div className={`${styles["full-started-slide"]}`}>
                  <p className={styles["news-row"]}>Период</p>
                  <p className={styles["news-row"]}>Всего</p>
                  <p className={styles["news-row"]}>Риски</p>
                </div>
                <div className={styles["started-spin"]}>
                  <CircularProgress />
                </div>
              </SwiperSlide>
            </>
          ) : (
            <>
              <SwiperSlide className={styles["started-slide"]}>
                <div className={styles["slide-newsrow"]}>
                  <p className={styles["news-row"]}>Период</p>
                  <p className={styles["news-row"]}>Всего</p>
                  <p className={styles["news-row"]}>Риски</p>
                </div>
              </SwiperSlide>
              {totalDocuments?.data.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className={styles["slide-row"]}>
                    <p className={styles["slide-txt"]}>
                      {formatDateToDDMMYYYY(item.date)}
                    </p>
                    <p className={styles["slide-txt"]}>{item.value}</p>
                    <p className={styles["slide-txt"]}>
                      {riskFactors?.data[i].value}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </Grid>
  );
}
