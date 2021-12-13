import { Link } from 'react-router-dom';
import { IMG_URL, genresList } from '../../constant';
import { BsPlayFill, BsPlus } from 'react-icons/bs';
import Button from '../Button/Button';
import classes from './MovieCard.module.scss';

const MovieCard = ({ movie, className, type }) => {
  const genres = movie.genre_ids.slice(0, 2).map(id => {
    for (const i of genresList) {
      if (i.id === id) {
        return i;
      }
    }
    return true;
  });

  return (
    <div className={`${classes['movie-card']} ${className ? className : ''}`}>
      <div className={classes['movie-card__img']}>
        <img src={`${IMG_URL}w500${movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className={classes['movie-card__info']}>
        <Link to={`${type}/${movie.id}`}>{movie.title || movie.name}</Link>
        <div className={classes['movie-card__btns']}>
          <Button className={classes.btn}>
            <BsPlayFill />
          </Button>
          <Button className={classes.btn}>
            <BsPlus />
          </Button>
        </div>
        <div className={classes['movie-card__genres']}>
          {genres.length > 0 ? (
            genres.map(genre => <span key={genre.id}>{genre.name}</span>)
          ) : (
            <span>Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
