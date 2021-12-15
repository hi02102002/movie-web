import React, { useEffect, useState } from 'react';
import classes from './Selection.module.scss';
import { RiArrowDownSLine } from 'react-icons/ri';
const Selection = ({
  classNameContainer,
  classNameValue,
  classNameDefaultValue,
  classNameValueWrap,
  setValue,
  data,
}) => {
  const [clickOpen, setClickOpen] = useState(false);
  const clickOpenHandler = () => {
    setClickOpen(!clickOpen);
  };

  useEffect(() => {
    const valueDefaultClick = document.querySelector(
      `.${classes['selection__default-value']} span`
    );
    const values = document.querySelectorAll(`.${classes.selection__value}`);
    valueDefaultClick.textContent = values[0].textContent;

    values.forEach(value => {
      if (value.textContent === valueDefaultClick.textContent) {
        value.classList.add(`${classes['active-value']}`);
      }
      value.addEventListener('click', () => {
        values.forEach(item => {
          item.classList.remove(`${classes['active-value']}`);
        });
        value.classList.add(`${classes['active-value']}`);
        valueDefaultClick.textContent = value.textContent;
        const dataValue = value.getAttribute('data-value');
        setValue(dataValue);
        setClickOpen(false);
      });
    });
  }, [setValue]);

  return (
    <div
      className={`${classes.selection} ${classNameContainer || ''} ${
        clickOpen ? classes.active : ''
      }`}
    >
      <div
        onClick={clickOpenHandler}
        className={`${classes['selection__default-value']} ${
          classNameDefaultValue || ''
        }`}
      >
        <span> Season 1</span>
        <RiArrowDownSLine className={classes.icon} />
      </div>
      <ul
        className={`${classes['selection__value-wrap']} ${
          classNameValueWrap || ''
        }`}
      >
        {data.map(item => {
          if (item.season_number === 0) return true;

          return (
            <li
              className={`${classes.selection__value} ${classNameValue || ''}`}
              key={item.name}
              data-value={item.season_number}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Selection;
