import { tmdbApi } from '../../api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { embedEpisode, embedMovie } from '../../api/embed';
import { API_KEY } from '../../constant';
import Selection from '../../components/Selection/Selection';
import classes from './MoviePlay.module.scss';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
const MoviePlay = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [seasonsIndex, setSeasonsIndex] = useState(0);
  const [seasonsData, setSeasonsData] = useState([]);
  const [srcMovie, setSrcMovie] = useState('');
  const [srcTV, setSrcTV] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (pathname.includes('movie')) {
      setType('movie');
      setSrcMovie(embedMovie(id));
    } else if (pathname.includes('tv')) {
      setType('tv');
      setSrcTV(embedEpisode(id, 0, 1));
    }
  }, [id, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const path = `/${type}/${id}`;
      const params = {
        api_key: API_KEY,
      };
      const data = await tmdbApi.getMovieOrTv(params, path);
      if (type === 'tv') {
        setSeasonsData(data.seasons);
      }
    };
    fetchData();
  }, [id, type]);

  const onChangeEpisode = episode => {
    setSrcTV(embedEpisode(id, seasonsIndex, episode));
  };

  console.log(seasonsIndex);

  return (
    <div className={classes['movie-detail']}>
      <div className="container">
        <div className={classes['movie-detail__container']}>
          <iframe
            width="100%"
            title="no"
            src={type === 'tv' ? srcTV : srcMovie}
            allowFullScreen
            className={classes['movie-detail__video']}
          ></iframe>
          <div className={classes.seasons}>
            {type === 'tv' && seasonsData.length > 0 ? (
              <React.Fragment>
                <Selection
                  classNameContainer={classes.selection}
                  setValue={setSeasonsIndex}
                  data={seasonsData}
                />
                <EpisodeList
                  numberSeason={seasonsIndex}
                  onChangeEpisode={onChangeEpisode}
                />
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlay;
