import React from 'react';

const Pagination = ({ daresPerPage, totalDares, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDares / daresPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center py-3'>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item '>
            <a onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'bg-blue-500 text-black border-purple-500 font-bold' : ''}`}>
    {number}
</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
