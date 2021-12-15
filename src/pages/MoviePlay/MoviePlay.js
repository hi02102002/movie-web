import { tmdbApi } from '../../api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { embedEpisode, embedMovie } from '../../api/embed';
import { API_KEY, IMG_URL } from '../../constant';
import Selection from '../../components/Selection/Selection';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
import Row from '../../components/Row/Row';
import noImg from '../../img/no-img.jpg';
import classes from './MoviePlay.module.scss';
const MoviePlay = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [seasonsIndex, setSeasonsIndex] = useState(1);
  const [seasonsData, setSeasonsData] = useState([]);
  const [srcMovie, setSrcMovie] = useState('');
  const [srcTV, setSrcTV] = useState('');
  const [type, setType] = useState('');
  const [dataPlay, setDataPlay] = useState({});
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeOverview, setEpisodeOverview] = useState('');

  useEffect(() => {
    if (pathname.includes('movie')) {
      setType('movie');
      setSrcMovie(embedMovie(id));
    } else if (pathname.includes('tv')) {
      setType('tv');
      setSrcTV(embedEpisode(id, seasonsIndex, 1));
    }
  }, [id, pathname, seasonsIndex]);

  useEffect(() => {
    const fetchData = async () => {
      const path = `/${type}/${id}`;
      const params = {
        api_key: API_KEY,
      };
      const data = await tmdbApi.getMovieOrTv(params, path);
      setDataPlay(data);
      if (type === 'tv') {
        setSeasonsData(data.seasons);
      }
    };
    fetchData();
  }, [id, type]);

  const onChangeEpisode = (episode, overview, title) => {
    setSrcTV(embedEpisode(id, seasonsIndex, episode));
    setEpisodeOverview(overview);
    setEpisodeTitle(title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={classes['movie-detail']}
      style={{
        backgroundImage: dataPlay.backdrop_path
          ? `url('${IMG_URL}original${dataPlay.poster_path}')`
          : `url('${noImg}')`,
      }}
    >
      <div className="container">
        <div className={classes['movie-detail__container']}>
          <iframe
            width="100%"
            title="no"
            src={type === 'tv' ? srcTV : srcMovie}
            allowFullScreen
            className={classes['movie-detail__video']}
          ></iframe>
          <div>
            <h2 className={classes['movie-detail__title']}>
              {dataPlay.title || dataPlay.name}
            </h2>
            {type === 'tv' ? (
              <h3 className={classes['movie-detail__episode-title']}>
                Episode Name:{' '}
                {episodeTitle.length > 0 ? episodeTitle : dataPlay.name}
              </h3>
            ) : null}
            {type === 'tv' ? (
              <p className={classes['movie-detail__overview']}>
                {episodeOverview.length > 0
                  ? episodeOverview
                  : dataPlay.overview}
              </p>
            ) : (
              <p className={classes['movie-detail__overview']}>
                {dataPlay.overview}
              </p>
            )}
            <span className={classes['movie-detail__date']}>
              Date: {dataPlay.first_air_date || dataPlay.release_date}
            </span>
            <div className={classes['movie-detail__genres']}>
              {dataPlay.genres
                ? dataPlay.genres
                    .map(genre => {
                      return genre.name;
                    })
                    .join(', ')
                : null}
            </div>
          </div>
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
      <Row
        title="Similar"
        type={type}
        pathname={`/${type}/${id}`}
        fetchMovies={tmdbApi.getSimilar}
        className={classes.row__title}
      />
    </div>
  );
};

export default MoviePlay;
