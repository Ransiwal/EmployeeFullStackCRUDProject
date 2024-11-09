import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 flex items-center justify-center">
            <div className="text-center px-6 py-12">
                
                <h1 className="text-5xl font-extrabold text-purple-700 mb-6">Welcome to Employee Management</h1>
                <p className="text-xl text-gray-700 mb-8">Manage your employees easily and efficiently.</p>


                <div className="flex justify-center space-x-6">
                    
                    <Link
                        to="/create"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-10 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-l hover:from-purple-600 hover:to-pink-500"
                    >
                        <span className="font-semibold text-lg">Add New Employee</span>
                    </Link>


                    <Link
                        to="/employees"
                        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 px-10 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-500"
                    >
                        <span className="font-semibold text-lg">View All Employees</span>
                    </Link>
                </div>
            </div>


            <div className="absolute bottom-4 w-full text-center">
                <p className="text-sm text-gray-500">© Suryansh Employee Management System</p>
            </div>
        </div>
    );
};

export default HomePage;
