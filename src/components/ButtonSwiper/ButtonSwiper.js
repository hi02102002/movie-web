import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import classes from './ButtonSwiper.module.scss';
const ButtonSwiper = React.forwardRef(
  ({ classNameLeft, classNameRight }, ref) => {
    const { nextRef, prevRef } = ref;
    return (
      <div className={classes.btn__wrap}>
        <button
          ref={prevRef}
          className={`${classNameLeft} ${classes.btn} ${classes.btn__left}`}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          ref={nextRef}
          className={`${classNameRight}  ${classes.btn} ${classes.btn__right}`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    );
  }
);

export default ButtonSwiper;
