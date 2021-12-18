import useFetchDataList from '../../hooks/useFetchDataList';
import { tmdbApi } from '../../api/tmdbApi';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
import classes from './Tvshow.module.scss';
import Loader from '../../components/Loader/Loader';

const Tvshow = () => {
  const { setPage, dataList, totalPage, loading } = useFetchDataList(
    tmdbApi.getTvs
  );

  return (
    <div className={classes['tvshow-page']}>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <ListGrid list={dataList.results || []} type="tv" isAdd={true} />
        )}
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
