import { useGetBannerMovieQuery } from '../../services/tmdbApi';
import classes from './Banner.module.scss';
import { random } from '../../utilities/random';
import { IMG_URL } from '../../constant';
import Button from '../Button/Button';

const Banner = () => {
  const { data, isFetching } = useGetBannerMovieQuery();
  const movies = data?.results;

  if (isFetching) {
    return <p>hehe</p>;
  }
  const movie = random(movies);
  console.log(movie);

  return (
    <section
      className={classes.banner}
      style={{ backgroundImage: `url('${IMG_URL}${movie.backdrop_path}')` }}
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
            <span>Vote: {movie.vote_average}/10</span>
            <span>Date: {movie.release_date}</span>
          </div>
        </div>
        <div className={classes.banner__img}>
          <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
