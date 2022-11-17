import React from 'react'

function Pagination({ currentPage, itemsPerPage, length, onPageChange }) {

  const pagesCount = Math.ceil(length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="d-flex justify-content-space-around">
        <div className={"btn btn-primary " + (currentPage === 1 && " disabled")}>
          <a onClick={() => onPageChange(currentPage - 1)} className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo; Previous</span>
          </a>
        </div>

        <div>
          Page {currentPage} / {pagesCount}
        </div>
        {/*       {pages.map(page =>
        <li key={page} className={page === currentPage ? "page-item active" : "page-item"}><a onClick={() => onPageChange(page)} className="page-link" >{page}</a></li>
      )} */}


        <div className={"btn btn-primary " + (currentPage === pagesCount && " disabled")}>
          <a onClick={() => onPageChange(currentPage + 1)} className="page-link" aria-label="Next">
            <span aria-hidden="true">Next &raquo;</span>
          </a>
        </div>
      </div>

    </>
  )
}

export default Pagination