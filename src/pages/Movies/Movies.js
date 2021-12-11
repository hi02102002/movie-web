import React, { useState, useEffect } from 'react';
import { useGetMoviesQuery } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import classes from './Movie.module.scss';
import Button from '../../components/Button/Button';
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetMoviesQuery(page);

  useEffect(() => {
    setMovies(data?.results || []);
  }, [data]);

  const loadMoreHandler = () => {
    setMovies([...movies, ...data.results]);
    setPage(page + 1);
  };

  console.log(movies);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes['movies-page']}>
      <div className="container">
        <div className={classes['movies-page__container']}>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              className={classes['movies-page__card']}
            />
          ))}
        </div>
      </div>
      <Button className={classes['movies-page__btn']} onClick={loadMoreHandler}>
        <span>Load more</span>
      </Button>
    </div>
  );
};

export default Movies;
