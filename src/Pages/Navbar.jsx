import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ admin }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const checkAdminStatus = () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const decodedToken = jwt_decode(authToken);
        if (decodedToken && decodedToken.user && decodedToken.user.isAdmin) {
          setIsAdmin(true);
        }
      }
    };

    checkAdminStatus();
  }, []);


  useEffect(() => {
    setIsAdmin(admin);
    console.log(admin);
  }, [admin])

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };



  // const [query, setQuery] = useState('');
  // const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //     try {
  //         const response = await axios.get(`http://localhost:3000/search?query=${query}`);
  //         setResults(response.data);
  //     } catch (error) {
  //         console.error('Error searching:', error);
  //     }
  // };

  return (
    <>
      <nav className="bg-white w-full shadow-md sticky top-0 z-50  h-[10dvh] box-border">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h2>Software Downloader</h2>
            </div>


            <div className="hidden md:block md:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/services" className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link to="/contact_me" className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                {!isAdmin && (
                  <Link to='/login' className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>

                )}

                {isAdmin && (
                  <div className="post-content-button mt-1">
                    <Link to="/post" className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">Post Content</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleNavbar}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <i className="fi fi-br-grip-lines"></i>
                ) : (
                  <i className="fi fi-br-x"></i>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/contact_me" className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            {!isAdmin && (
              <Link to='/login' className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>

            )}


            <button type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false">Docs</button>
            {isAdmin && (
              <div className="post-content-button mt-1 w-auto">
                <Link to="/post" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-auto">Post Content</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>


  );
};

export default Navbar;
