import { Link } from 'react-router-dom';
import { IMG_URL, genresList } from '../../constant';
import { BsPlayFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import noImg from '../../img/no-img.jpg';
import Button from '../Button/Button';
import classes from './MovieCard.module.scss';

const MovieCard = ({ movie, className, type }) => {
  const history = useHistory();

  const genres = movie.genre_ids
    ? movie.genre_ids.slice(0, 2).map(id => {
        for (const i of genresList) {
          if (i.id === id) {
            return i;
          }
        }
        return true;
      })
    : [];

  return (
    <div className={`${classes['movie-card']} ${className ? className : ''}`}>
      <div className={classes['movie-card__img']}>
        <img
          src={
            movie.backdrop_path ? `${IMG_URL}w500${movie.backdrop_path}` : noImg
          }
          alt={movie.title || movie.name}
        />
      </div>
      <div className={classes['movie-card__info']}>
        <Link to={`/${type}/${movie.id}`}>{movie.title || movie.name}</Link>
        <div className={classes['movie-card__btns']}>
          <Button
            className={classes.btn}
            onClick={() => {
              history.push(
                type === 'movie'
                  ? `/movie/${movie.id}/play`
                  : `/tv/${movie.id}/play`
              );
            }}
          >
            <BsPlayFill />
          </Button>
        </div>
        <div className={classes['movie-card__genres']}>
          {genres.length > 0 && genres ? (
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
