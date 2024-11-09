import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '', 
        image: ''
    });

    const navigate = useNavigate();

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'course') {
            setFormData((prevData) => ({
                ...prevData,
                course: value, 
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        
        if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            
            alert("Only JPG and PNG files are allowed.");
        }
    };
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        try {
            
            const response = await axios.post('http://localhost:5000/api/employees/create', formData);
            alert('Employee created successfully!');
            navigate('/employees'); 
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('Failed to create employee');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>


                    <div>
                        <label htmlFor="mobileNo" className="block text-gray-700 font-semibold">Mobile No</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>


                    <div>
                        <label htmlFor="designation" className="block text-gray-700 font-semibold">Designation</label>
                        <select
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-gray-700 font-semibold">Gender</label>
                        <div className="flex items-center space-x-6">
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="M"
                                    checked={formData.gender === 'M'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="male" className="text-gray-700">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="F"
                                    checked={formData.gender === 'F'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="female" className="text-gray-700">Female</label>
                            </div>
                        </div>
                    </div>


                    <div>
                        <label className="block text-gray-700 font-semibold">Course</label>
                        <div className="flex items-center space-x-6">
                            <div>
                                <input
                                    type="checkbox"
                                    id="MCA"
                                    name="course"
                                    value="MCA"
                                    checked={formData.course === 'MCA'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="MCA" className="text-gray-700">MCA</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="BCA"
                                    name="course"
                                    value="BCA"
                                    checked={formData.course === 'BCA'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="BCA" className="text-gray-700">BCA</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="CSC"
                                    name="course"
                                    value="CSC"
                                    checked={formData.course === 'CSC'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="CSC" className="text-gray-700">CSC</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="BTECH"
                                    name="course"
                                    value="BTECH"
                                    checked={formData.course === 'BTECH'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="BTECH" className="text-gray-700">BTECH</label>
                            </div>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-semibold">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none"
                        />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200"
                        >
                            Create Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;


