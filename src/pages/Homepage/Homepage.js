import { tmdbApi } from '../../api/tmdbApi';
import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
import classes from './Homepage.module.scss';

const Homepage = () => {
  return (
    <div className={classes.homepage}>
      <Banner />
      <main>
        <Row
          title="Popular Movies"
          fetchMovies={tmdbApi.getPopularMovies}
          type="movie"
        />
        <Row
          title="Upcoming Movies"
          fetchMovies={tmdbApi.getUpComingMovies}
          type="movie"
        />
        <Row
          title="Top Rated Movies"
          fetchMovies={tmdbApi.getTopRateMovies}
          type="movie"
        />
      </main>
    </div>
  );
};

export default Homepage;
