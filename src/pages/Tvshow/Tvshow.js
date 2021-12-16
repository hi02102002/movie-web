import { useEffect } from 'react';
import useFetchDataList from '../../hooks/useFetchDataList';
import { tmdbApi } from '../../api/tmdbApi';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
import classes from './Tvshow.module.scss';
import scrollToTop from '../../utilities/scrollToTop';

const Tvshow = () => {
  const { setPage, dataList, totalPage } = useFetchDataList(tmdbApi.getTvs);

  return (
    <div className={classes['tvshow-page']}>
      <div className="container">
        <ListGrid list={dataList.results || []} type="tv" />
        <Pagination
          dataList={dataList}
          setPage={setPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default Tvshow;
