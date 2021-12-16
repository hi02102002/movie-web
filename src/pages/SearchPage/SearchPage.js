import React from 'react';
import { tmdbApi } from '../../api/tmdbApi';
import useQuery from '../../hooks/useQuery';
import useFetchDataList from '../../hooks/useFetchDataList';
import ListGrid from '../../components/ListGrid/ListGrid';
import Pagination from '../../components/Pagination/Pagination';
const SearchPage = () => {
  let query = useQuery();
  const { dataList, setPage, totalPage } = useFetchDataList(
    tmdbApi.search,
    query
  );

  return (
    <div style={{ padding: '10rem 0 6rem 0' }}>
      <div className="container">
        {dataList ? (
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              marginBottom: '2rem',
            }}
          >
            Results of {query}:
          </div>
        ) : null}
        {dataList.results && dataList.results.length === 0 ? (
          <p>No result!!!</p>
        ) : null}
        <ListGrid list={dataList.results || []} />
        {dataList.results && dataList.results.length === 0 ? null : (
          <Pagination
            dataList={dataList}
            setPage={setPage}
            totalPage={totalPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
