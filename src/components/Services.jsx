import React from 'react'
import backend from '../assets/backend.png'
import frotend from '../assets/ux.png'
import fullstack from '../assets/computer.png'
import uiux from '../assets/web-service.png'
import admition from '../assets/admission.png'
import { Link } from 'react-router-dom'
const Services = () => {
    return (
        <>

            <div className="w-full h-full overflow-y-scroll flex flex-col items-center">
                <h1 className="font-bold underline m-5 text-2xl md:text-xl text-center">Services We Provide</h1>

                <div className="flex flex-wrap justify-center items-center gap-6">

                    {/* Example Service Card */}
                    <div className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-6">
                        <div className="h-50   rounded-xl hover:shadow-blue-gray-400">
                            <img
                                src={frotend}
                                alt="card-image"
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Frontend Website
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                Frontend Website Service Provide...<br />
                                Price Change According to number of pages...<br />
                                For more information Contact me... and Also Leave Inquiry
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to='/contact_me'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Contact me
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Add more service cards here */}
                    <div className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-6">
                        <div className="  rounded-xl">
                            <img
                                src={backend}
                                alt="card-image"
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Backend Service
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                Backend Service Provide...<br />
                                Price Change According to number of Routes...<br />
                                For more information Contact me... and Also Leave Inquiry
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to='/contact_me'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Contact me
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Add more service cards as needed */}
                    <div className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-6">
                        <div className="rounded-xl">
                            <img
                                src={fullstack}
                                alt="card-image"
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Fullstack Website  Service
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                Fullstack Website Service Provide...<br />
                                Price Change According to number of Pages & Routes .....<br />
                                For more information Contact me... and Also Leave Inquiry
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to='/contact_me'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Contact me
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-6 ">
                        <div className="rounded-xl">
                            <img
                                src={uiux}
                                alt="card-image"
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Web Designing Service
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                uiux Website Service Provide...<br />
                                Price Change According to number of pages...<br />
                                For more information Contact me... and Also Leave Inquiry
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to='/contact_me'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Contact me
                                </button>
                            </Link>
                        </div>
                    </div>

                    <h2 className='font-bold underline m-5 text-2xl md:text-xl text-center w-full'>Non tech Service</h2>

                    <div className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-6 ">
                        <div className="rounded-xl">
                            <img
                                src={admition}
                                alt="card-image"
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                admission consultancy services
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                You Trust 100% 1000+ Students Trusts <br />
                                We suggest you to Best University & collages For any stream <br />
                                Only 2% Fee Charge On your Collage Fee..
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to='/contact_me'>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Contact me
                                </button>
                            </Link>
                        </div>
                    </div>





                </div>
            </div>


        </>
    )
}

export default Services