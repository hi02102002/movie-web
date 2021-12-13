import { useEffect } from 'react';
import useFetchDataList from '../../hooks/useFetchDataList';
import { tmdbApi } from '../../api/tmdbApi';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
import classes from './Tvshow.module.scss';

const Tvshow = () => {
  const { page, setPage, dataList } = useFetchDataList(tmdbApi.getTvs);

  console.log(dataList);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  return (
    <div className={classes['tvshow-page']}>
      <div className="container">
        <ListGrid list={dataList.results || []} type="tv" />
        <Pagination dataList={dataList} setPage={setPage} />
      </div>
    </div>
  );
};

export default Tvshow;
