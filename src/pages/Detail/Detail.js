import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { tmdbApi } from '../../api/tmdbApi';
import { API_KEY, IMG_URL } from '../../constant';
import convertTime from '../../utilities/convertTime';
import { BsPlus, BsPlayFill } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import CastList from '../../components/CastList/CastList';
import classes from './Detail.module.scss';

const Detail = () => {
  const { pathname } = useLocation();

  const [data, setData] = useState({
    item: {},
    video: [],
    cast: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          api_key: API_KEY,
        };
        const data = await Promise.all([
          tmdbApi.getMovieOrTv(params, pathname),
          tmdbApi.getCredit(params, pathname),
          tmdbApi.getVideo(params, pathname),
        ]);

        setData({
          item: data[0],
          cast: data[1].cast,
          video: data[2].results,
        });

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pathname]);

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.detail}>
      <div
        className={classes.detail__header}
        style={{
          backgroundImage: `url('${IMG_URL}original${data.item.backdrop_path}')`,
        }}
      >
        <div className="container">
          <div className={classes['detail__header-container']}>
            <div className={classes['detail__header-img']}>
              <img src={`${IMG_URL}original${data.item.poster_path}`} alt="" />
            </div>
            <div className={classes['detail__header-content']}>
              <h2 className={classes['detail__header-main-title']}>
                {data.item.name || data.item.title}
              </h2>
              <div className={classes['detail__header-facts']}>
                <span>{data.item.vote_average}/10</span>
                <span>
                  {data.item.genres
                    ? data.item.genres
                        .slice(0, 3)
                        .map(genre => genre.name)
                        .join(', ')
                    : null}
                </span>
                <span>
                  {convertTime(
                    data.item.runtime || data.item.episode_run_time?.[0]
                  )}
                </span>
              </div>
              <div className={classes['detail__header-btns']}>
                <Button className={classes['detail__header-btn']}>
                  <BsPlayFill />
                </Button>
                <Button className={classes['detail__header-btn']}>
                  <BsPlus />
                </Button>
              </div>
              <div>
                <h3 className={classes['detail__header-title']}>Overview</h3>
                <p className={classes['detail__header-overview']}>
                  {data.item.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={classes.detail__main}>
          <CastList castList={data.cast}></CastList>
        </div>
      </div>
    </div>
  );
};

export default Detail;
