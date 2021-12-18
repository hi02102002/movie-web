import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { tmdbApi } from '../../api/tmdbApi';
import { API_KEY, IMG_URL } from '../../constant';
import convertTime from '../../utilities/convertTime';
import { BsPlayFill } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import CastList from '../../components/CastList/CastList';
import Row from '../../components/Row/Row';
import classes from './Detail.module.scss';
import noImg from '../../img/no-img.jpg';
import Loader from '../../components/Loader/Loader';

const Detail = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  let type = '';
  if (pathname.includes('movie')) {
    type = 'movie';
  } else if (pathname.includes('tv')) {
    type = 'tv';
  }
  const [data, setData] = useState({
    item: {},
    videos: [],
    cast: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
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

        if (cancel) {
          return;
        }

        setData({
          item: data[0],
          cast: data[1].cast,
          videos: data[2].results,
        });

        setIsLoading(false);
      } catch (err) {}
    };
    fetchData();

    return () => {
      cancel = true;
    };
  }, [pathname, history]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.detail}>
      <div
        className={classes.detail__header}
        style={{
          backgroundImage: data.item.backdrop_path
            ? `url('${IMG_URL}w500${data.item.backdrop_path}')`
            : `url('${noImg}')`,
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
              {type === 'tv' && data.item.seasons ? (
                <div className={classes['detail__header-seasons']}>
                  {data.item.seasons.length} Seasons
                </div>
              ) : null}
              <div className={classes['detail__header-btns']}>
                <Button
                  className={classes['detail__header-btn']}
                  onClick={() => {
                    history.push(`${pathname}/play`);
                  }}
                >
                  <BsPlayFill />
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
      {data.cast.length > 0 ? <CastList castList={data.cast}></CastList> : null}
      <div className="container">
        <div className={classes.detail__main}>
          {data.videos.length > 0 ? (
            <div className={classes.detail__videos}>
              <ul className={classes['detail__videos-list']}>
                {data.videos.slice(0, 5).map(video => (
                  <li key={video.id}>
                    <div>{video.type}</div>
                    <iframe
                      width="100%"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ overflowX: 'hidden' }}>
        <Row
          fetchMovies={tmdbApi.getSimilar}
          title="Similar"
          type="movie"
          pathname={pathname}
          className={classes['detail__header-title']}
        />
      </div>
    </div>
  );
};

export default Detail;
