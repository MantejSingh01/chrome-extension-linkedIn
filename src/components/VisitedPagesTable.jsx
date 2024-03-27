import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const VisitedPagesTable = () => {
  const [visitedPages, setVisitedPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    getAllDetails();
  }, []);

  const getAllDetails = async () => {
    const res = await fetch("http://localhost:3008/getAllRecords");
    const result = await res.json();
    console.log(result);
    setVisitedPages(result);
  };

  const handleCheckboxChange = (e, page) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, page._id]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== page._id)
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3008/deleteRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedRows }),
      });
      const data = await response.json();
      console.log(data);
      const updatedVisitedPages = visitedPages.filter(
        (page) => !selectedRows.includes(page._id)
      );
      setVisitedPages(updatedVisitedPages);
      setSelectedRows([]);
      const updatedPageCount = Math.ceil(updatedVisitedPages.length / itemsPerPage);
      if (updatedPageCount < currentPage) {
        setCurrentPage(updatedPageCount);
      }
      alert(data.message ? data.message : "Record(s) deleted successfully");
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert("email copied !!");
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return visitedPages.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(visitedPages.length / itemsPerPage);

  // Function to generate an array of page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="visited-pages-table">
      <div className="table-header">
        <h3 className="selected">{selectedRows.length} Selected</h3>
        <div className="header-inner">
          <button className={selectedRows.length === 0 ? "disabled" : ""} onClick={handleDelete}>Delete</button>
          {visitedPages && <CSVLink data={visitedPages}>Export as CSV</CSVLink>}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Logo</th>
            <th>Title</th>
            <th>URL</th>
            <th>Industry</th>
            <th>Founded</th>
            <th>HQ Location</th>
          </tr>
        </thead>
        <tbody>
          {getPageData().map((page, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(page._id)}
                  onChange={(e) => handleCheckboxChange(e, page)}
                />
              </td>
              <td>
                <img src={page.ImgSrc} alt="Page" />
              </td>
              <td>{page.Title}</td>
              <td>
                <a
                  href={page.Website}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopyUrl(page.Website);
                  }}
                >
                  {page.Website}
                </a>
              </td>
              <td>{page.Industry}</td>
              <td>{page.Founded}</td>
              <td>{page.Headquarters}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
       
        <span>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, visitedPages.length)}-
          {Math.min(currentPage * itemsPerPage, visitedPages.length)} of {visitedPages.length}
        </span>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
         <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default VisitedPagesTable;
