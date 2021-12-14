import React from 'react';
import { Swiper } from 'swiper/react/swiper-react.js';

const SwiperNew = ({ className, config, ...props }) => {
  return (
    <div>
      <Swiper
        spaceBetween={5}
        speed={800}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
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
        }}
        className={className}
      >
        {props.children}
      </Swiper>
    </div>
  );
};

export default SwiperNew;
