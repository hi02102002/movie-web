import React, { useEffect } from 'react';
import { tmdbApi } from '../../api/tmdbApi';
import classes from './Movie.module.scss';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
import useFetchDataList from '../../hooks/useFetchDataList';

const Movies = () => {
  const { page, setPage, dataList } = useFetchDataList(tmdbApi.getMovies);

  return (
    <div className={classes['movies-page']}>
      <div className="container">
        <div className={classes['movies-page__container']}>
          <ListGrid list={dataList.results || []} type="movie" />
          <Pagination setPage={setPage} dataList={dataList} />
        </div>
      </div>
    </div>
  );
};

export default Movies;
