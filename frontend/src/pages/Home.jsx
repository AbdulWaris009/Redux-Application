import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/reducer/userSlice";
import { Trash2 } from "lucide-react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    const { users, loading, error } = useSelector((state) => state.users); 
    console.log("Users from Redux:", users);


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const res = await axios.delete(`http://localhost:3000/api/v1/users/delete/${id}`);
                if (res.status === 200) {
                    alert("Deleted successfully");
                    window.location.reload()
                    setUsers(users.filter((user) => user._id !== id)); 
                } else {
                    alert("Failed to delete");
                }
            } catch (error) {
                console.error("Error deleting user:", error);

            }
        }
    };
    


    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-400 via-purple-100 to-white p-6">
            <header className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-md rounded-lg">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-500 bg-clip-text text-transparent">
                    User Management System
                </h1>
                <Link to="/register">
                    <button className="bg-white text-blue-800 cursor-pointer px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                        Add User
                    </button>
                </Link>
            </header>

            <main className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">User List</h2>

                {loading && <p className="text-center text-gray-500">Loading users...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="py-6 px-8 text-left">Profile</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Gender</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">Actions</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-100">
                                        <td className="p-3">
                                            <img
                                                src={`http://localhost:3000/${user.profile}`}
                                                alt="User"
                                                className="w-20 h-20 rounded-full border border-gray-300"
                                            />
                                        </td>
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.gender}</td>
                                        <td className="p-3">{user.city}</td>
                                        <td className="p-8  space-x-3">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && <p className="text-center text-gray-500">No users found.</p>
                )}
            </main>
        </div>
    );
};

export default Home;
