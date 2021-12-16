import React from 'react';
import ReactPaginate from 'react-paginate';
import scrollToTop from '../../utilities/scrollToTop';
import classes from './Pagination.module.scss';
const Pagination = ({ dataList, setPage, totalPage }) => {
  const pageChangeHandler = dataPagination => {
    setPage(dataPagination.selected + 1);
    scrollToTop();
  };

  return (
    <div className={classes.pagination}>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        pageCount={totalPage > 500 ? 500 : totalPage}
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
