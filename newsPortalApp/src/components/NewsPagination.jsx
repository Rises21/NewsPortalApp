import React from "react";
import { Pagination } from "react-bootstrap";

const NewsPagination = ({ onChangePage, current, totalPages }) => {
  let items = [];
  if (current > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
    );
  }

  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <Pagination.Item
        key={page}
        aria-describedby={page}
        active={page === current}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < totalPages) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
    );
  }

  return (
    <Pagination className="p-4 justify-content-center">{items}</Pagination>
  );
};

export default NewsPagination;
