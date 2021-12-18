import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/authContext';
import Button from '../Button/Button';
import classes from './Sign.module.scss';

const Sign = ({ isSignIn }) => {
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const passwordRef = useRef();
  const emailRef = useRef();
  const confirmPassWordRef = useRef();

  const submitHandler = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length === 0 || password.length === 0) {
      setErrorMsg('Khong duoc de trong!');
      return;
    }
    if (!isSignIn) {
      const confirmPassword = confirmPassWordRef.current.value;
      if (confirmPassword !== password) {
        setErrorMsg("Password don't match");
        return;
      }
      try {
        setErrorMsg('');
        setLoading(true);
        await signUp(email, password);
        setLoading(false);
      } catch (error) {
        setErrorMsg(error.message);
        console.dir(error);
        setLoading(false);
      }
    } else {
      try {
        setErrorMsg('');
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
      } catch (error) {
        setErrorMsg(error.message);
        setLoading(false);
        console.dir(error);
      }
    }
  };

  useEffect(() => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setErrorMsg('');
    if (!isSignIn) {
      confirmPassWordRef.current.value = '';
    }
  }, [isSignIn]);

  return (
    <div>
      <div className={classes.sign}>
        <h3 className={classes.sign__title}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h3>
        <div
          style={{
            textAlign: 'center',
            marginBottom: errorMsg.length > 0 ? '1rem' : null,
            color: 'red',
          }}
        >
          {errorMsg}
        </div>
        <form onSubmit={submitHandler} className={classes.sign__form}>
          <div className={classes.input__group}>
            <label>Email</label>
            <input ref={emailRef} type="email" placeholder="Email" />
          </div>
          <div className={classes.input__group}>
            <label>Password</label>
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          {!isSignIn ? (
            <div className={classes.input__group}>
              <label>Confirm Password</label>
              <input
                ref={confirmPassWordRef}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          ) : null}
          <Button
            type="submit"
            className={classes.sign__btn}
            disabled={loading}
          >
            {isSignIn ? (
              <span>{loading ? 'Loading...' : 'Sign In'}</span>
            ) : (
              <span>{loading ? 'Loading...' : 'Sign Up'}</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
