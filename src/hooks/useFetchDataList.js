import { useEffect, useState } from 'react';
import { API_KEY } from '../constant';
const useFetchDataList = apiFn => {
  const [dataList, setDataList] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
      };
      const data = await apiFn(params);
      setDataList(data);
    };
    fetchData();
  }, [page, apiFn]);

  return { page, setPage, dataList };
};

export default useFetchDataList;
