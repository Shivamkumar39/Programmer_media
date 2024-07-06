import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/register';
import PostContent from './Pages/PostContent';
import Login from './Pages/Login';
import ContentList from './Pages/Content';
import Navbar from './Pages/Navbar';
import Aboutpage from './components/Aboutpage';

import SeeSignglepost from './Pages/SeeSignglepost';
import EditComponent from './components/edit';
import Footer from './components/Footer';
import Contact from './components/contact';
import Services from './components/Services';

// import Layout from './components/Layout';


const App = () => {

  const [admin, setAdmin] = useState(false);


  const handelAdmin = (input) => {
    setAdmin(input);
  }



  return (

    <>

      <BrowserRouter>

        <div className='w-full h-screen'>
          <Navbar  admin={admin}  />
          <div className='w-full h-[90dvh] box-border flex'>
        
            {/* <SideBar  admin={admin} /> */}
            
            <div className='h-full w-full sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] border box-border'>
              <Routes>

                <Route path='/' element={<ContentList admin={admin} />} />
                <Route path='/about' element={<Aboutpage />} />
                <Route path='/register' element={<Register />} />
                <Route path="/login" element={<Login handelAdmin={handelAdmin} />} />
                <Route path="/post" element={<PostContent admin={admin} />} />
                <Route path='/postpage' element={<SeeSignglepost />}/>
                <Route path='/editcontent/:id' element={<EditComponent admin={admin} />}/>
                <Route path='/footer' element={<Footer/>}/>
                <Route path='/contact_me' element={<Contact/>}/>
                <Route path='/services' element={<Services/>}/>


              </Routes>
            </div>
       

          </div>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App