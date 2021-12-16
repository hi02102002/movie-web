import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import classes from './Page404.module.scss';
const Page404 = () => {
  const history = useHistory();
  return (
    <div className={classes.page404}>
      <div className={classes.container}>
        <span className={classes['not-found']}>404</span>
        <span className={classes.text}>YOU'RE IN THE WRONG PLACE</span>
        <Button
          onClick={() => {
            history.push('/home');
          }}
        >
          Return to home
        </Button>
      </div>
    </div>
  );
};

export default Page404;
