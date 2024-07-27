import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

///Admin Login (Userbname: - Shivam, password: - Shivam@123)


const Login = ({handelAdmin}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errormsg, setErrormsg] = useState('');
    const navigate = useNavigate();

    
      

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formData.username === "" || formData.password === "") {
            setErrormsg('Fill all fields please!!!!');
            return;
        }

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: formData.username, password: formData.password })
        });

        if (response.ok) {
            const data = await response.json();
            handelAdmin(data.user.isAdmin);
            toast.success('Successfully logged in', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem('authtoken', data.authToken);
            navigate('/');
            console.log(data.authToken);
            
        } else {
            const errorData = await response.json();
            setErrormsg(errorData.message || 'Incorrect username or password');
            toast.error('🔺🔺 Please enter the correct username and password', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className='customcontainer'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='inputbox'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <div>
                    <p className='font-bold text-sm text-left'>Username:</p>
                    <input
                        className='inputcontainer'
                        type='text'
                        placeholder='username'
                        required
                        name='username'
                        onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                    />
                </div>
                <div>
                    <p className='font-bold text-sm text-left'>Password:</p>
                    <input
                        className='inputcontainer'
                        type='password'
                        placeholder='Password'
                        required
                        name='password'
                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                        minLength={5}
                    />
                </div>
                <div>
                    <p className='underline text-red-300 font-serif'>{errormsg}</p>
                    <button className='btns' onClick={handleLogin}>Submit</button>
                    <p className='m-2'>Create New Account! <Link to='/register'><span className='underline font-bold'>Signup</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

