import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();  // Get the employee ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        gender: 'M',
        designation: '',
        course: '',
        image: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setFormData(response.data);  // Populate the form with employee data
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/employees/update/${id}`, formData);  // PUT request to update
            navigate('/employees');  // Redirect to employee list
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 flex items-center justify-center">
            <div className="container mx-auto px-6 md:px-10">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-semibold text-purple-700 mb-6">Edit Employee</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="mobileNo">Mobile No</label>
                            <input
                                type="text"
                                id="mobileNo"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        {/* Designation */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="designation">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        {/* Course */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="course">Course</label>
                            <input
                                type="text"
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        {/* Image */}
                        <div className="mb-4">
                            <label className="block text-lg text-gray-700" htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
