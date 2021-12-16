import { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react/swiper-react.js';
import { API_KEY } from '../../constant';
import MovieCard from '../MovieCard/MovieCard';
import 'swiper/swiper.scss';
import classes from './Row.module.scss';
import Swiper from '../Swiper/Swiper';

const Row = ({ title, type, fetchMovies, pathname, className }) => {
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
        const data = await fetchMovies(params, pathname);
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
  }, [fetchMovies, pathname]);

  return movies && movies.length > 0 ? (
    <div className={classes.row}>
      <div className="container">
        <div className={classes.row__header}>
          <h3 className={`${classes.row__title} ${className}`}>{title}</h3>
        </div>
        <div className={classes.row__container}>
          <Swiper className={classes.swiper}>
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
  ) : null;
};

export default Row;
