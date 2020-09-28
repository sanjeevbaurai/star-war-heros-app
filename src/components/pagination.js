import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';


export default function Pagination({ totalRecords, pageLimit, next, previous, fetchPeople, currentPage }) {
  const [pages, setPages] = useState(null);
  useEffect(() => {
    setPages(fetchPageNumbers(pageLimit, totalRecords, currentPage));
  }, [next, previous]);
  return (
    <nav aria-label=" Pagination" className="float-lg-right">
      <ul className="pagination">

        {pages && pages.map((page, index) => {
          if (page === LEFT_PAGE) return (
            <li key={index} className="page-item">
              <Link
                to={`/page/${currentPage - 1}`}
                className="page-link"
                aria-label="Previous"
                onClick={() => fetchPeople({ currentPage: currentPage - 1 })}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </Link>
            </li>
          )
          if (page === RIGHT_PAGE) return (
            <li key={index} className="page-item">
              <Link
                to={`/page/${currentPage + 1}`}
                className="page-link"
                aria-label="Next"
                onClick={() => fetchPeople({ currentPage: currentPage + 1 })}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </Link>
            </li>
          )
          return (
            <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
              <Link
                className="page-link"
                // onClick={() => fetchBooks({ currentPage: page })}
                onClick={() => fetchPeople({ currentPage: page })}
                to={page === 1 ? '/' : `/page/${page}`}
              >
                {page}
              </Link>
            </li>
          )

        })}
      </ul>
    </nav>
  );
}

function range(from, to, step = 1) {
  let i = from;
  const items = [];

  while (i <= to) {
    items.push(i);
    i += step;
  }
  return items;
};

function fetchPageNumbers(pageLimit, totalRecords, currentPage) {

  const totalPages = Math.ceil(totalRecords / pageLimit);

  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = 7;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    let pages = range(startPage, endPage);

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    if (hasLeftSpill && !hasRightSpill) {
      pages = [LEFT_PAGE, ...range(startPage - spillOffset, startPage - 1), ...pages];
    } else if (!hasLeftSpill && hasRightSpill) {
      pages = [...pages, ...range(endPage + 1, endPage + spillOffset), RIGHT_PAGE];
    } else {
      pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
    }

    return [1, ...pages, totalPages];
  }
  return range(1, totalPages);
};