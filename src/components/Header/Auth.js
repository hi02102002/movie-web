import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useAuth } from '../../context/authContext';
import avatar from '../../img/Netflix-avatar.png';
import classes from './Header.module.scss';
const Auth = () => {
  const { signOut } = useAuth();
  const signOutHandler = async () => {
    await signOut();
  };

  return (
    <div className={classes.auth}>
      <div className={classes.auth__toggle}>
        <div className={classes.auth__img}>
          <img src={avatar} alt="" />
        </div>
        <MdKeyboardArrowDown />
      </div>
      <div className={classes.auth__signout} onClick={signOutHandler}>
        Sign out
      </div>
    </div>
  );
};

export default Auth;
