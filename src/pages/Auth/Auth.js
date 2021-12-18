import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sign from '../../components/Sign/Sign';
import classes from './Auth.module.scss';
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className={classes.auth}>
      <Link to="/home" className={classes.auth__logo}>
        Hmovie
      </Link>
      <div className={classes.auth__container}>
        <div className={classes.auth__content}>
          <Sign isSignIn={isSignIn} />
          <div className={classes['auth__content--toggleView']}>
            <p>
              {isSignIn
                ? "Haven't you registered yet?"
                : 'Do you already have an account?'}
            </p>
            <span
              onClick={() => {
                setIsSignIn(!isSignIn);
              }}
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
