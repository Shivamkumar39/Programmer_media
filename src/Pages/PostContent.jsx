import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser/lib/index';

const PostContent = ({ admin }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    paragraph: '',
    description: '',
    downloadLink1: '',
    downloadLink2: ''
  });
  const [img, setImg] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const desChnage = (data)=>{
  //   setFormData({...formData,description: data})
  // }

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!admin) {
      toast.error('You are not authorized to post content', { position: "top-center", autoClose: 5000, theme: "light" });
      return;
    }

    if (!formData.title || !formData.paragraph || !content || !formData.downloadLink1) {
      setErrorMsg('Please fill all fields!');
      return;
    }

    if (!img) {
      setErrorMsg('Please upload an image!');
      return;
    }

    // Convert HTML content to plain text
    const htmlToPlainText = HTMLReactParser(content);
    console.log(htmlToPlainText);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', img);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('paragraph', formData.paragraph);
      formDataToSend.append('description', content); // Ensure description is added as plain text
      formDataToSend.append('downloadLink1', formData.downloadLink1);
      formDataToSend.append('downloadLink2', formData.downloadLink2);

      const token = localStorage.getItem('authtoken');
      const response = await axios.post('http://localhost:3000/contents', formDataToSend, {
        headers: {
          'authtoken': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Content posted successfully', { position: "top-center", autoClose: 5000, theme: "light" });
      navigate('/');
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || 'Error posting content');
      toast.error('Error posting content', { position: "top-center", autoClose: 5000, theme: "light" });
    }
  };


 

  return (
    <div className='customcontainer pt-5 sticky'>
      <ToastContainer position="Bottom-right" autoClose={5000} hideProgressBar={false} theme="light" />
      <div className='min-w-[320px] w-[40rem] mt-40 bg-white shadow-md p-6 rounded-lg flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>Post New Content</h1>
        <form onSubmit={handlePost}>
          <div>
            <p className='font-bold text-sm text-left'>Image:</p>
            <input className='inputcontainer' type='file' accept='image/*' name='image' onChange={onFileChange} />
          </div>
          <div>
            <p className='font-bold text-sm text-left'>Title:</p>
            <input className='inputcontainer' type='text' placeholder='Title' required name='title' onChange={onChange} />
          </div>
          <div>
            <p className='font-bold text-sm text-left'>Paragraph:</p>
            <input className='inputcontainer' placeholder='Paragraph' required name='paragraph' onChange={onChange} />
          </div>
          <div>
            <p className='font-bold text-sm text-left'>Description:</p>
            <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
              console.log(newContent);
            }}
            />
          </div>
          <div>
            <p className='font-bold text-sm text-left'>1. Link:</p>
            <input className='inputcontainer' type='text' placeholder='Download Link' name='downloadLink1' onChange={onChange} />
          </div>
          <div>
            <p className='font-bold mt-1 text-sm text-left'>2. Link:</p>
            <input className='inputcontainer' type='text' placeholder='Download Link' name='downloadLink2' onChange={onChange} />
          </div>
          {errorMsg && <p className='underline text-red-300 font-serif'>{errorMsg}</p>}
          <button className='btns' type='submit'>Submit</button>
        </form>
      </div>

    
    </div>
  );
};

export default PostContent;
