import React from 'react';
import type { PaginationInfo } from '../../../types';
import './Pagination.scss';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  const itemsPerPageOptions = [10, 25, 50, 100];
  
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <div className="pagination__info">
        <span className="pagination__text">
          Showing{' '}
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="pagination__select"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {' '}out of {totalItems.toLocaleString()}
        </span>
      </div>

      <div className="pagination__controls">
        <button
          className="pagination__btn pagination__btn--prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </button>

        <div className="pagination__pages">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination__ellipsis">...</span>
              ) : (
                <button
                  className={`pagination__page ${
                    page === currentPage ? 'pagination__page--active' : ''
                  }`}
                  onClick={() => handlePageClick(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className="pagination__btn pagination__btn--next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      <div className="pagination__summary">
        <span className="pagination__text">
          {startItem}-{endItem} of {totalItems.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Pagination;