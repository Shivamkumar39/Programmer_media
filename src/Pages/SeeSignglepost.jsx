import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser/lib/index';

const SeeSignglepost = () => {
  const { state } = useLocation();
  const { content } = state;
  return (
    <div className="w-full h-full p-4 flex flex-col items-center overflow-y-scroll">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg ">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <img
            className="object-cover rounded-lg max-w-full max-h-full"
            src={content.img}
            alt={content.title}
          />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
            <h4 className="text-xl font-semibold mb-2">{content.paragraph}</h4>
          </div>
          <div className="flex flex-col mb-4">
            <span className="text-black font-bold mb-2">1. Link:</span>
            <a
              href={content.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Download Link
            </a>
            <span className="text-black font-bold mb-2">2. Link:</span>
            <a
              href={content.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download Link
            </a>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl mt-4 p-6 bg-white shadow-lg rounded-lg">
        <h4 className="text-xl font-semibold mb-4">Description:</h4>
        <p className="text-gray-700">{HTMLReactParser(content.description)}</p>
      </div>
    </div>
  )
}

export default SeeSignglepost