import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react/swiper-react.js';
import { tmdbApi } from '../../api/tmdbApi';
import { API_KEY, IMG_URL } from '../../constant/index';
import noImg from '../../img/no-img.jpg';
import Swiper from '../Swiper/Swiper';

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
      setEpisodes([...data.episodes]);
    };
    fetchData();
  }, [numberSeason, id]);
  console.log(episodes);

  return (
    <Swiper>
      {episodes && episodes.length > 0
        ? episodes.map(episode => (
            <SwiperSlide key={episode.id}>
              <div
                onClick={() => {
                  onChangeEpisode(episode.episode_number);
                }}
              >
                <div>
                  <img
                    src={
                      episode.still_path
                        ? `${IMG_URL}w500${episode.still_path}`
                        : noImg
                    }
                    alt={episode.name}
                  />
                </div>
                <div className></div>
              </div>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default EpisodeList;
