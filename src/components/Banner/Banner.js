import React from 'react';
import { useGetBannerMovieQuery } from '../../services/tmdbApi';
import classes from './Banner.module.scss';
import { random } from '../../utilities/random';
import { API_KEY, BASE_URL_TMDB, IMG_URL } from '../../constant';
import Button from '../Button/Button';
import { BsPlayFill } from 'react-icons/bs';

const Banner = () => {
  const { data, isFetching } = useGetBannerMovieQuery();
  const movies = data?.results;
  const movie = movies?.[0] ? random(movies) : movies?.[0];

  const fetchTrailerMovie = async () => {
    const response = await fetch(
      `${BASE_URL_TMDB}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const { results } = await response.json();

    console.log(results);
  };

  if (!data?.results || isFetching) {
    return (
      <p
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        Loading
      </p>
    );
  }

  return (
    <section
      className={classes.banner}
      style={{
        backgroundImage: `url('${IMG_URL}original${movie.backdrop_path}')`,
      }}
    >
      <div
        className={`${classes['banner__overlay']} ${classes['banner__overlay--bottom']}`}
      ></div>
      <div
        className={`${classes['banner__overlay']} ${classes['banner__overlay--left']}`}
      ></div>
      <div className={`${classes.banner__container} container`}>
        <div className={classes.banner__content}>
          <h1 className={classes.banner__title}>{movie.title}</h1>
          <p className={classes.banner__overview}>{movie.overview}</p>
          <div className={classes.banner__detail}>
            <span>Rate: {movie.vote_average}/10</span>
            <span>Date: {movie.release_date}</span>
          </div>
          <div className={classes.banner__btns}>
            <Button className={classes.banner__btn}>
              <BsPlayFill />
              <span>Play</span>
            </Button>
            <Button className={classes.banner__btn} onClick={fetchTrailerMovie}>
              <BsPlayFill />
              <span>Play Trailer</span>
            </Button>
          </div>
        </div>
        <div className={classes.banner__img}>
          <img
            src={`${IMG_URL}original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Banner);
