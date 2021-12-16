import { useEffect, useState } from 'react';
import { API_KEY } from '../constant';
const useFetchDataList = (apiFn, query) => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
        query: query,
      };
      const data = await apiFn(params);
      setDataList(data);
      setTotalPage(data.total_pages);
      setLoading(false);
    };
    fetchData();
  }, [page, apiFn, query]);

  return { loading, setPage, dataList, totalPage };
};

export default useFetchDataList;
