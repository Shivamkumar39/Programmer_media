import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';

const EditComponent = ({ admin }) => {
    const { id } = useParams();
    const location = useLocation();
    const editor = useRef(null);
    const navigate = useNavigate();
    const { state } = location;
    const content = state ? state.content : null;

    const [formData, setFormData] = useState({
        img: null,
        title: '',
        paragraph: '',
        description: '',
        downloadLink1: '',
        downloadLink2: ''
    });

    useEffect(() => {
        if (content) {
            setFormData({
                img: content.img || null,
                title: content.title || '',
                paragraph: content.paragraph || '',
                description: content.description || '',
                downloadLink1: content.downloadLink1 || '',
                downloadLink2: content.downloadLink2 || ''
            });
        } else {
            toast.error('No content data available. Redirecting...');
            setTimeout(() => navigate(-1), 3000);
        }
    }, [content, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, img: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('paragraph', formData.paragraph);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('downloadLink1', formData.downloadLink1);
        formDataToSend.append('downloadLink2', formData.downloadLink2);
        if (formData.img) {
            formDataToSend.append('image', formData.img);
        }

        try {
            const token = localStorage.getItem('authtoken');
            const response = await axios.put(`http://localhost:3000/editcontent/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authtoken': token
                }
            });
            if (response.data) {
                toast.success('Content updated successfully!');
            } else {
                toast.error('Failed to update content.');
            }
        } catch (error) {
            toast.error(`Failed to update content: ${error.message}`);
            console.error('Error updating content:', error);
        }
    };

    if (!content) {
        return null; // or handle loading state
    }

    return (
        <div className='customcontainer pt-5 sticky'>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} theme="light" />

            <div className='min-w-[320px] w-[40rem] mt-40 bg-white shadow-md p-6 rounded-lg flex flex-col gap-6'>
                <h1 className='text-2xl font-bold'>Edit Content</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='font-bold text-sm text-left'>Image:</p>
                        <input className='inputcontainer' type='file' accept='image/*' name='image' onChange={handleFileChange} />
                    </div>
                    <div>
                        <p className='font-bold text-sm text-left'>Title:</p>
                        <input
                            className='inputcontainer'
                            type='text'
                            placeholder='Title'
                            required
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className='font-bold text-sm text-left'>Paragraph:</p>
                        <textarea
                            className='inputcontainer'
                            placeholder='Paragraph'
                            required
                            name='paragraph'
                            value={formData.paragraph}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className='font-bold text-sm text-left'>Description:</p>
                        <JoditEditor
                            ref={editor}
                            value={formData.description}
                            onChange={(newContent) => setFormData({ ...formData, description: newContent })}
                        />
                    </div>
                    <div>
                        <p className='font-bold text-sm text-left'>Download Link Windows:</p>
                        <input
                            className='inputcontainer'
                            type='text'
                            placeholder='Download Link'
                            required
                            name='downloadLink1'
                            value={formData.downloadLink1}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className='font-bold mt-1 text-sm text-left'>Download Link Apple MacOS:</p>
                        <input
                            className='inputcontainer'
                            type='text'
                            placeholder='Download Link'
                            required
                            name='downloadLink2'
                            value={formData.downloadLink2}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className='underline text-red-300 font-serif'>Error message goes here</p>
                        <button className='btns' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditComponent;
