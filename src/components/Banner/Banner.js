import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { tmdbApi } from '../../api/tmdbApi';
import { random } from '../../utilities/random';
import { API_KEY, IMG_URL } from '../../constant';
import { BsInfo, BsInfoCircle, BsPlayFill } from 'react-icons/bs';
import Button from '../Button/Button';
import classes from './Banner.module.scss';

const params = {
  api_key: API_KEY,
  language: 'en-US',
};

const Banner = () => {
  const [movieBanner, setMovieBanner] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    let cancel = false;

    const fetchMovieBanner = async () => {
      try {
        setIsLoading(true);
        const data = await tmdbApi.getMovies(params);
        const movie = random(data.results);
        if (cancel) return;
        setMovieBanner(movie);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieBanner();

    return () => {
      cancel = true;
    };
  }, []);

  return isLoading ? (
    <p>loading...</p>
  ) : (
    <section
      className={classes.banner}
      style={{
        backgroundImage: `url('${IMG_URL}original${movieBanner.backdrop_path}')`,
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
          <h1 className={classes.banner__title}>{movieBanner.title}</h1>
          <p className={classes.banner__overview}>{movieBanner.overview}</p>
          <div className={classes.banner__detail}>
            <span>Rate: {movieBanner.vote_average}/10</span>
            <span>Date: {movieBanner.release_date}</span>
          </div>
          <div className={classes.banner__btns}>
            <Button
              className={classes.banner__btn}
              onClick={() => {
                history.push(`/movie/${movieBanner.id}/play`);
              }}
            >
              <BsPlayFill />
              <span>Play</span>
            </Button>
            <Button
              className={classes.banner__btn}
              onClick={() => {
                history.push(`/movie/${movieBanner.id}`);
              }}
            >
              <BsInfoCircle />
              <span>Info</span>
            </Button>
          </div>
        </div>
        <div className={classes.banner__img}>
          <img
            src={`${IMG_URL}original${movieBanner.poster_path}`}
            alt={movieBanner.title}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
