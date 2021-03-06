import { tmdbApi } from '../../api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { embedEpisode, embedMovie } from '../../api/embed';
import { API_KEY, IMG_URL } from '../../constant';
import Selection from '../../components/Selection/Selection';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
import Row from '../../components/Row/Row';
import noImg from '../../img/no-img.jpg';
import classes from './MoviePlay.module.scss';
import scrollToTop from '../../utilities/scrollToTop';
import Loader from '../../components/Loader/Loader';
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
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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
    let cancel = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const path = `/${type}/${id}`;
        const params = {
          api_key: API_KEY,
        };
        const data = await tmdbApi.getMovieOrTv(params, path);
        if (cancel) return;
        setDataPlay(data);
        if (type === 'tv') {
          setSeasonsData(data.seasons);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      cancel = true;
    };
  }, [id, type, history]);

  const onChangeEpisode = (episode, overview, title) => {
    setSrcTV(embedEpisode(id, seasonsIndex, episode));
    setEpisodeOverview(overview);
    setEpisodeTitle(title);
    scrollToTop();
  };

  return loading ? (
    <Loader />
  ) : (
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
