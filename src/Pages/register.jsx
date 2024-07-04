import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (formData.username === "" || formData.password === "") {
            setErrorMsg('Fill all fields please!!!!');
            return;
        } else {
            try {
                const response = await axios.post('http://localhost:3000/register', 
                    { username, password },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data); // Log response from server
                navigate('/login');
                // Handle success scenario (e.g., redirect to login page)
            } catch (error) {
                console.error(error);
                setErrorMsg('Registration failed');
                // Handle error scenario
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="5"
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
