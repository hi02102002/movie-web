import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';
const Pagination = ({ dataList, setPage }) => {
  const pageChangeHandler = dataPagination => {
    console.log(dataPagination);
    setPage(dataPagination.selected + 1);
  };

  return (
    <div className={classes.pagination}>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        pageCount={100}
        onPageChange={pageChangeHandler}
        containerClassName={classes.pagination__container}
        pageLinkClassName={classes.pagination__link}
        previousClassName={classes.pagination__prev}
        nextClassName={classes.pagination__next}
        activeClassName={classes.pagination__active}
      ></ReactPaginate>
    </div>
  );
};

export default Pagination;
