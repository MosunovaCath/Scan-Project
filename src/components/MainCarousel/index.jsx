import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperCore } from "swiper/react";
import styles from "./MainCarousel.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { carouselData } from "./carouselData";

export default function MainCarousel() {
  const swiperRef = useRef(null);

  return (
    <div className={styles["swiper-block"]}>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        loop={true}
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
        {carouselData.map((item, i) => (
          <SwiperSlide style={{ height: "155px" }} key={i}>
            <div className={styles["slide-row"]}>
              {" "}
              <img
                className={styles["slide-img"]}
                src={item.imgSrc}
                alt="time"
              />
              <p className={styles["slide-txt"]}>{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
