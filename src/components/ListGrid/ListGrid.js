import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import classes from './ListGrid.module.scss';
const ListGrid = ({ list, type }) => {
  return (
    <div className={classes.list}>
      {list.map(item => (
        <MovieCard
          key={`${item.id} ${Math.random()}`}
          movie={item}
          className={classes['list__item']}
          type={type}
        />
      ))}
    </div>
  );
};

export default ListGrid;
