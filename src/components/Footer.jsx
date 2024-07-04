import React from 'react'

const Footer = () => {
  return (
   
        <div className="bg-gray-800 px-4 py-9 md:px-6 md:py-12 lg:px-20 lg:py-12 z-500">
            <div className="flex flex-col md:flex-row md:justify-between pb-10">
                <div className="flex flex-col items-center">
                    <button className="w-full md:w-auto px-24 py-2 bg-white border rounded-md text-xl font-semibold leading-tight text-gray-800 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-200 focus:ring-opacity-50">Get started</button>
                    <p className="pt-2 text-sm leading-none text-gray-300 cursor-pointer hover:underline">Or see our plans</p>
                </div>
                <div>
                    <p className="w-72 pt-9 md:py-0 text-sm leading-tight text-gray-300">10:00 AM to 6 PM, Monday - Friday Semurh inc 800 bolystan street suite 2475, Bostan MA</p>
                </div>
            </div>

            <div className="w-full px-8 border-white border rounded-md flex flex-col justify-start md:flex-row md:justify-between lg:justify-center gap-2 md:gap-20 py-6">
                <p className="text-sm leading-none text-gray-300">USA 800 Bolystan street,2475,Bostan MA</p>
                <div className="flex justify-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                    </svg>
                    <p className="text-sm leading-none text-gray-300">mail@smrush .com</p>
                </div>
            </div>
            

            <div className="pt-10 lg:pt-24 flex justify-center md:justify-start gap-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler cursor-pointer icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler cursor-pointer icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler cursor-pointer icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler cursor-pointer icon-tabler-brand-youtube" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="3" y="5" width="18" height="14" rx="4" />
                    <path d="M10 9l5 3l-5 3z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler cursor-pointer icon-tabler-brand-pinterest" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="8" y1="20" x2="12" y2="11" />
                    <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
            </div>
        </div>
  )
}

export default Footer