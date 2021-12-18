import React from 'react';
import { tmdbApi } from '../../api/tmdbApi';
import classes from './Movie.module.scss';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
import useFetchDataList from '../../hooks/useFetchDataList';
import Loader from '../../components/Loader/Loader';

const Movies = () => {
  const { setPage, dataList, totalPage, loading } = useFetchDataList(
    tmdbApi.getMovies
  );

  return (
    <div className={classes['movies-page']}>
      <div className="container">
        <div className={classes['movies-page__container']}>
          {loading ? (
            <Loader />
          ) : (
            <ListGrid list={dataList.results || []} type="movie" isAdd={true} />
          )}
          <Pagination
            setPage={setPage}
            dataList={dataList}
            totalPage={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
