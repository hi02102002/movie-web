import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react/swiper-react.js';
import { tmdbApi } from '../../api/tmdbApi';
import { API_KEY, IMG_URL } from '../../constant/index';
import noImg from '../../img/no-img.jpg';
import Swiper from '../Swiper/Swiper';
import classes from './EpisodeList.module.scss';

const EpisodeList = ({ numberSeason, onChangeEpisode }) => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const path = `/tv/${id}`;
      const params = {
        api_key: API_KEY,
        language: 'en-US',
      };
      const data = await tmdbApi.getTvSeasons(params, path, numberSeason);
      setEpisodes(data.episodes);
    };
    fetchData();
  }, [numberSeason, id]);

  return (
    <Swiper className={classes.episodes}>
      {episodes && episodes.length > 0
        ? episodes.map(episode => (
            <SwiperSlide key={episode.id} style={{ height: 'unset' }}>
              <div className={classes.episodes__card}>
                <div className={classes['episodes__card-img']}>
                  <img
                    src={
                      episode.still_path
                        ? `${IMG_URL}w500${episode.still_path}`
                        : noImg
                    }
                    alt={episode.name}
                  />
                </div>
                <div className={classes['episodes__card-info']}>
                  <h4
                    onClick={() => {
                      onChangeEpisode(
                        episode.episode_number,
                        episode.overview,
                        episode.name
                      );
                    }}
                  >
                    {episode.name}
                  </h4>
                  <div>{episode.air_date}</div>
                </div>
                <div className={classes['episodes__card-code']}>
                  S{episode.season_number}E{episode.episode_number}
                </div>
              </div>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default EpisodeList;
