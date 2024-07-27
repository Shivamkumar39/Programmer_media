import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ContentList = ({ admin }) => {
  const [contents, setContents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContents.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Getcontents');
        setContents(response.data);
      } catch (err) {
        console.error('Error fetching contents:', err);
      }
    };

    const checkAdminStatus = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.isAdmin) {
        setIsAdmin(true);
      }
    };

    fetchContents();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    setIsAdmin(admin);
  }, [admin]);

  const handleViewPost = (content) => {
    navigate(`/postpage`, { state: { content } });
  };

  const handleEdit = (content) => {
    navigate(`/editcontent/${content._id}`, { state: { content } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete('http://localhost:3000/deletecontent', {
        data: { id }
      });
      console.log(response.data);

      if (response.data.success) {
        alert('Content deleted successfully!');
        window.location.reload();
      } else {
        setError('Failed to delete content');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred while deleting content');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /// pageination
  const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const maxVisiblePages = 7; // Adjust this based on your design

    const getPageNumbers = () => {
      const pageNumbers = [];
      const ellipsis = '...';

      if (totalPages <= maxVisiblePages) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show ellipsis and last page
        const halfVisible = Math.floor(maxVisiblePages / 2);
        const startPage = Math.max(currentPage - halfVisible, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (startPage > 1) {
          pageNumbers.push(1, ellipsis);
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        if (endPage < totalPages) {
          pageNumbers.push(ellipsis, totalPages);
        }
      }

      return pageNumbers;
    };

    const renderPageNumbers = () => {
      const pageNumbers = getPageNumbers();
    
      return pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          className={`border-t-purple-400 w-10 h-10 border-gray-700 mx-1 flex items-center justify-center rounded ${
            currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
          }`}
        >
          {pageNumber}
        </button>
      ));
    };
    
    return (
      <div className="flex justify-center items-center border-gray-100 border rounded w-full mt-4 py-2">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="mr-3 flex items-center justify-center w-10 h-10 border-gray-700 border rounded bg-white"
          >
            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        )}
    
        {renderPageNumbers()}
    
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="ml-3 flex items-center justify-center w-10 h-10 border-gray-700 border rounded bg-white"
          >
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        )}
      </div>
    );
    
  };








  return (
    <>
      <div className="w-full h-full flex flex-col border">
      <div className="w-full flex flex-col items-center p-2 md:px-5">
  <h1 className="font-bold text-black mb-2">Download 500+ Softwares</h1>

  <div className="relative w-full md:w-1/2 lg:w-1/3 flex items-center">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
    />
    <MagnifyingGlassIcon className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>

  {/* <form className="flex items-center mt-2">
    <select
      id="underline_select"
      className="block py-2.5 px-4 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
    >
      <option selected>Windows</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
    </select>
  </form> */}
</div>



        <div className="h-full w-full box-border overflow-x-hidden flex flex-wrap justify-center items-center pt-10 px-2 md:px-5">
          {currentItems.map((content) => (
            <div
              key={content._id}
              className="lg:max-w-72 lg:min-w-72 md:max-w-72 md:min-w-72 sm:max-w-72 sm:min-w-72 max-w-md w-full sm:w-auto h-auto justify-center rounded overflow-hidden shadow-lg mb-5 container sm:mr-5 items-center p-4"
            >
              <div className="flex justify-center items-center p-4 cursor-pointer" onClick={() => handleViewPost(content)}>
                <img
                  className="w-32 h-32 object-cover rounded-t-md"
                  src={content.img}
                  alt={content.title}
                />
              </div>
              <div className="px-6 py-4">
                <div className="h-24 bg-white rounded-b-lg shadow-sm p-6 cursor-pointer scrollbar-hide overflow-hidden" onClick={() => handleViewPost(content)}>
                  <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
                </div>

                <div className="pt-3 flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleViewPost(content)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    View Post
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(content)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(content._id)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredContents.length / itemsPerPage)} handlePageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default ContentList;
