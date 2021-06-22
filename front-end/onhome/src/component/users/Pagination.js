import React from "react";

const Pagination = ({ omrPerPage, totalOmrs, paginate }) => {
  const pageNumber = [];
  
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalOmrs / omrPerPage); i++) {
    pageNumber.push(i);
  }

  return (
      <div>
    <ul class="pagination pagination-sm" style={{position:"relative",top:"25px",left:"370px"}}>
      {pageNumber.map((pageNum) => (
        <li class="page-item" >
         <a class="page-link" href="#" onClick={(e)=>{e.preventDefault(); paginate(pageNum); }}>{pageNum}</a> 
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Pagination;