import { Link } from 'react-router-dom';
import { IMG_URL, genresList } from '../../constant';
import Button from '../Button/Button';
import { BsPlayFill, BsInfo } from 'react-icons/bs';
import classes from './MovieCard.module.scss';

const MovieCard = ({ movie, className }) => {
  const genres = movie.genre_ids.slice(0, 3).map(id => {
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
        <img
          src={`${IMG_URL}original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
      <div className={classes['movie-card__info']}>
        <Link to={`movie/${movie.id}`}>{movie.title}</Link>
        <div className={classes['movie-card__btns']}>
          <Button className={classes.btn}>
            <BsPlayFill />
          </Button>
          <Button className={classes.btn}>
            <BsInfo />
          </Button>
        </div>
        <div className={classes['movie-card__genres']}>
          {genres.map(genre => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
