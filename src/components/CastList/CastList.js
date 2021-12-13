import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { IMG_URL } from '../../constant';
import noAvatar from '../../img/no-avatar.png';
import classes from './CastLlist.module.scss';

const CastList = ({ castList }) => {
  return (
    <div className={classes['casts']}>
      <div className={classes.casts__title}>Top Billed Cast</div>
      <Swiper
        spaceBetween={5}
        speed={800}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
          },

          768: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 5,
          },

          1024: {
            slidesPerView: 7,
            slidesPerGroup: 7,
            spaceBetween: 5,
          },

          1140: {
            slidesPerView: 8,
            slidesPerGroup: 8,
            spaceBetween: 5,
          },
        }}
      >
        {castList.map(item => {
          return (
            <SwiperSlide key={item.cast_id} style={{ height: 'unset' }}>
              <div className={classes['casts-card']}>
                <div className={classes['casts-card__img']}>
                  <img
                    src={
                      item.profile_path
                        ? `${IMG_URL}w500${item.profile_path}`
                        : noAvatar
                    }
                    alt={item.name}
                  />
                </div>
                <div className={classes['casts-card__info']}>
                  <h4>{item.name || item.original_name}</h4>
                  <span>{item.character}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CastList;
