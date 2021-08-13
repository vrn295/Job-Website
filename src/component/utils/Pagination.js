import React from 'react';

const Pagination = ({ 
	jobPerPage, 
	totalJobs, 
	paginate,
	currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li onClick={() => paginate(number)} key={number} className={'page-item' + (currentPage === number ? " selected-page" : "")}>
              {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;