import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../contexts/AuthContext';

const Navbar = () => {
    const { auth, logout } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        
        const userData = localStorage.getItem('user');
        if (userData) {
            console.log(userData)
            setUser(JSON.parse(userData)); 
        }
        
    }, [auth.isLoggedIn]); 

    const handleLogout = (e) => {
        e.preventDefault();
        logout()
    };

    return (
        <nav className="bg-black shadow-lg py-2">
            <div className="max-w-screen-2xl mx-auto px-6 flex flex-row justify-between ">
                
                <div className='flex flex-row justify-start gap-10'>
                <Link to="/" className="text-white text-2xl font-bold">
                    <img className='w-12 rounded-full' src='https://imgcdn.stablediffusionweb.com/2024/3/11/2b05f6e7-3fc4-48a9-be9b-ea59b81c3371.jpg'></img>
                </Link>
                {auth.isLoggedIn ? (
                        <Link
                            to="/"
                            className="text-white text-lg mt-2 hover:text-pink-400 transition duration-300">
                            Home
                        </Link>
                    ) : <></>}
                    </div>


                <div className='justify-end'>
                {auth.isLoggedIn ? (

                    <div className="space-x-6 mt-2 ">

                        <span className="mr-4 text-white font-bold ">{user?.name}</span>

                        <button onClick={handleLogout} className='text-white border-2 p-1 border-white rounded-md hover:text-pink-400 hover:border-pink-400 hover:cursor-pointer'>LogOut</button>

                    </div>
                ) : (
                    <div className="space-x-6">
                        <Link to="/login" className="text-white text-lg hover:text-pink-400 ">Login</Link>
                        <Link to="/signup" className="text-white text-lg hover:text-pink-400 ">Sign Up</Link>

                    </div>

                )
                }
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
