import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { convert } from 'html-to-text';
import HTMLReactParser from 'html-react-parser/lib/index';

const ContentList = ({ admin }) => {
  const [contents, setContents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <>
      <div className="w-full h-full flex flex-col border">
        <div className="w-full flex justify-center p-4 md:px-5">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <h1 className='font-bold text-black ml-10'>Download 500+ Softwares</h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-2 top-2/3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="h-full w-full box-border overflow-x-hidden flex flex-wrap justify-center items-center pt-10 px-2 md:px-5">
          {filteredContents.map((content) => (
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
                <h2 className="text-xl font-semibold mb-2 ">{content.title}</h2>
                 
                </div>


                {/* <div className="mt-3 flex flex-col sm:flex-row justify-between items-center">
                  <span className="text-black font-bold mb-2 sm:mb-0">
                    1. Link:-
                    <a
                      href={content.downloadLink1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 pt-1 m-1 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Download
                    </a>
                  </span>
                  <span className="text-black font-bold mb-2 sm:mb-0">
                    2. Link
                    <a
                      href={content.downloadLink2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 pt-1 m-2 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Download
                    </a>
                  </span>
                </div> */}



                <div className="pt-3 flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleViewPost(content)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    View Post
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(content)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentList;
