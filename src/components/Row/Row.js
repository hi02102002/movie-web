import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper.scss';
import MovieCard from '../MovieCard/MovieCard';
import classes from './Row.module.scss';

const Row = ({ movies, title }) => {
  return (
    <div className={classes.row}>
      <div className="container">
        <div className={classes.row__header}>
          <h3 className={classes.row__title}>{title}</h3>
        </div>
        <div className={classes.row__container}>
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
            className={classes.swiper}
          >
            {movies.map(movie => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Row;
