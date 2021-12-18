import React, { useEffect } from 'react';
import classes from './Loader.module.scss';
import { useHistory } from 'react-router-dom';
const Loader = ({ hi = false }) => {
  const history = useHistory();
  useEffect(() => {
    if (hi) {
      setTimeout(() => {
        history.push('/home');
      }, 2000);
    }
  }, [history, hi]);
  return (
    <div className={classes.loader}>
      <div className={classes['lds-ripple']}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
