import { Link, NavLink } from 'react-router-dom';
import { NAVS } from '../../constant';
import classes from './Header.module.scss';
const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.header__container}>
          <Link className={classes.logo} to="/">
            Hmovie
          </Link>
          <nav className={classes.nav}>
            <ul>
              {NAVS.map(item => (
                <li key={item.name} className={classes.nav__item}>
                  <NavLink
                    className={classes.nav__link}
                    activeClassName={classes['nav__link--active']}
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
