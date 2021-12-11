import Banner from '../../components/Banner/Banner';
import classes from './Homepage.module.scss';
import {
  useGetPopularMoviesQuery,
  useGetTopRateMoviesQuery,
  useGetUpComingMoviesQuery,
} from '../../services/tmdbApi';
import Row from '../../components/Row/Row';
import Footer from '../../components/Footer/Footer';

const Homepage = () => {
  const { data: dataMoviesPopular, isLoadingPopular } =
    useGetPopularMoviesQuery();
  const { data: dataMoviesUpcoming, isLoadingUpcoming } =
    useGetUpComingMoviesQuery();
  const { data: dataMoviesTopRated, isLoadingTopRated } =
    useGetTopRateMoviesQuery();
  const moviesPopular = dataMoviesPopular?.results || [];
  const moviesUpcoming = dataMoviesUpcoming?.results || [];
  const moviesTopRated = dataMoviesTopRated?.results || [];

  return (
    <div className={classes.homepage}>
      <Banner />
      <main>
        <Row movies={moviesPopular} title="Popular Movies" />
        <Row movies={moviesUpcoming} title="Upcoming Movies" />
        <Row movies={moviesTopRated} title="Top Rated Movies" />
      </main>
    </div>
  );
};

export default Homepage;
