import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAVS } from '../../constant';
import classes from './Header.module.scss';
import { BsList } from 'react-icons/bs';
import Sidebar from '../Sidebar/Sidebar';
import classesSidebar from '../Sidebar/Sidebar.module.scss';

const Header = () => {
  const sidebarRef = useRef();

  const clickCloseHandler = () => {
    sidebarRef.current.classList.remove(`${classesSidebar.active}`);
  };

  useEffect(() => {
    const clickOpenSidebarHandler = () => {
      sidebarRef.current.classList.add(`${classesSidebar.active}`);
    };
    const headerToggle = document.querySelector(`.${classes.header__toggle}`);
    headerToggle.addEventListener('click', clickOpenSidebarHandler);

    return () => {
      headerToggle.removeEventListener('click', clickOpenSidebarHandler);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(`.${classes.header}`);
    const changeBgColorHeader = () => {
      if (window.scrollY > 50) {
        header.style.backgroundColor = '#141414';
      } else {
        header.style.backgroundColor = 'unset';
      }
    };
    window.addEventListener('scroll', changeBgColorHeader);
    return () => {
      window.removeEventListener('scroll', changeBgColorHeader);
    };
  }, []);

  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.header__container}>
          <div className={classes.logo}>
            <Link className={classes.logo__large} to="/">
              Hmovie
            </Link>
            <Link className={classes.logo__small} to="/">
              H
            </Link>
          </div>
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
          <div className={classes.header__toggle}>
            <BsList />
          </div>
          <Sidebar ref={sidebarRef} onClose={clickCloseHandler} />
        </div>
      </div>
    </header>
  );
};

export default Header;
