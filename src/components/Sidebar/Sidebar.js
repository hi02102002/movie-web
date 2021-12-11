import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVS } from '../../constant/index';
import Button from '../Button/Button';
import classesHeader from '../Header/Header.module.scss';
import classes from './Sidebar.module.scss';

const Sidebar = React.forwardRef(({ onClose }, ref) => {
  return (
    <aside className={classes.sidebar} ref={ref}>
      <ul>
        {NAVS.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={classesHeader.nav__link}
              activeClassName={classesHeader['nav__link--active']}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button className={classes.sidebar__btn} onClick={onClose}>
        Close
      </Button>
    </aside>
  );
});

export default Sidebar;
