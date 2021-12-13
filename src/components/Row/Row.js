import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { API_KEY } from '../../constant';
import MovieCard from '../MovieCard/MovieCard';
import 'swiper/swiper.scss';
import classes from './Row.module.scss';

const Row = ({ title, type, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          api_key: API_KEY,
          language: 'en-US',
        };
        const data = await fetchMovies(params);
        if (cancel) return;
        setMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [fetchMovies]);

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
                  <MovieCard movie={movie} type={type} />
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
