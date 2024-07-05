import React from 'react'

const Footer = () => {
  return (
   
        <div className="bg-white px-4 py-9  lg:px-20 lg:py-12 z-500 w-full ">
            <div className="flex flex-col md:flex-row md:justify-between pb-10">
                <div className="flex flex-col items-center">
                    <button className="w-full md:w-auto px-24 py-2 bg-black border rounded-md text-xl font-semibold leading-tight text-gray-100 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-900 focus:ring-opacity-50">Get started</button>
                    <p className="pt-2 text-sm leading-none text-gray-900 cursor-pointer hover:underline">Or see our plans</p>
                </div>
                <div>
                    <p className="w-72 pt-9 md:py-0 text-sm leading-tight text-gray-900">10:00 AM to 6 PM, Monday - Friday Semurh inc 800 bolystan street suite 2475, Bostan MA</p>
                </div>
            </div>

            <div className="w-full px-8 border-black border rounded-md flex flex-col justify-start md:flex-row md:justify-between lg:justify-center gap-2 md:gap-20 py-6">
                <p className="text-sm leading-none text-gray-900">USA 800 Bolystan street,2475,Bostan MA</p>
                <div className="flex justify-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                    </svg>
                    <p className="text-sm leading-none text-gray-900">mail@smrush .com</p>
                </div>
            </div>


            <div className="pt-10 lg:pt-24 flex justify-center md:justify-start gap-12">
               
                
            </div>
        </div>
  )
}

export default Footer