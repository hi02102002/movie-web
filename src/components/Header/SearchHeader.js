import React, { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
const SearchHeader = ({
  classNameWrap = '',
  classNameSearchField = '',
  classNameIcon = '',
  classActive = '',
}) => {
  const [clicked, setClicked] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef();
  const history = useHistory();

  const searchHandler = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const pressEnterHandler = e => {
    if (e.key === 'Enter') {
      setClicked(false);
      history.push({
        pathname: '/search',
        search: query,
      });
    } else {
      return;
    }
  };

  return (
    <div className={classNameWrap}>
      <input
        placeholder="Search movies,tvs..."
        className={
          clicked
            ? `${classNameSearchField} ${classActive}`
            : classNameSearchField
        }
        ref={inputRef}
        onBlur={e => {
          e.target.value = '';
          setClicked(false);
        }}
        onChange={searchHandler}
        onKeyPress={pressEnterHandler}
      />
      <div
        className={classNameIcon}
        onClick={() => {
          setClicked(!clicked);
          inputRef.current.focus();
        }}
      >
        <FiSearch />
      </div>
    </div>
  );
};

export default SearchHeader;
