import React, { useRef } from 'react';
import { Swiper } from 'swiper/react/swiper-react.js';
import { Navigation } from 'swiper';
import ButtonSwiper from '../ButtonSwiper/ButtonSwiper';

const SwiperNew = ({ breakpoints = undefined, ...props }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div>
      <Swiper
        spaceBetween={5}
        speed={800}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[Navigation]}
        breakpoints={
          breakpoints
            ? breakpoints
            : {
                320: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 5,
                },

                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 5,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                  slidesPerGroup: 4,
                },

                1140: {
                  slidesPerView: 5,
                  spaceBetween: 5,
                  slidesPerGroup: 5,
                },
              }
        }
        className={props.className || ''}
      >
        {props.children}
      </Swiper>
      <ButtonSwiper
        ref={{
          nextRef: nextRef,
          prevRef: prevRef,
        }}
      />
    </div>
  );
};

export default SwiperNew;
