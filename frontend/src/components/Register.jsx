import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../redux/reducer/userSlice';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [file, setFile] = useState(null);

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !city || !gender || !file) {
            alert("Please fill all fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("gender", gender);
        formData.append("profile", file);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/users", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("User Registered:", response.data);
            
            dispatch(getAllUsers());
            navigate('/');

        } catch (error) {
            console.error("Error Registering User:", error);
            alert("Registration Failed. Please try again.");
        }
    };

    return (
        <div className="px-5 py-6 rounded-lg shadow-md bg-gradient-to-r from-blue-200 via-purple-200 to-gray-200">
            <header className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-md rounded-lg">
                <h1 className="text-2xl font-bold">User Management System</h1>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-700 bg-clip-text text-transparent">
                    Adding New User
                </h1>
            </header>

            <form onSubmit={handleSubmit}>
                
                <div className="mb-4 mt-3">
                    <label htmlFor="name" className="block text-lg font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

            
                <div className="mb-4">
                    <label className="block text-lg font-medium">Gender</label>
                    <div className="flex items-center">
                        <label htmlFor="male" className="mr-4">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                className="mr-2"
                                value="male"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label htmlFor="female">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                className="mr-2"
                                value="female"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                    </div>
                </div>

                
                <div className="mb-4">
                    <label htmlFor="city" className="block text-lg font-medium">City</label>
                    <input
                        type="text"
                        id="city"
                        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

            
                <div className="mb-4">
                    <label htmlFor="profile" className="block text-lg font-medium">Profile Image</label>
                    <input
                        type="file"
                        id="profile"
                        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="profile"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                    <Link to={"/"}>
                        <button
                            type="button"
                            className="px-6 py-2 bg-red-900 text-white font-semibold rounded-md hover:bg-red-700"
                        >
                            Home
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
