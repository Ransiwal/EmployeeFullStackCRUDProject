import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSortUp, FaSortDown } from 'react-icons/fa';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees/all');
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/delete/${id}`);
            const updatedEmployees = employees.filter((employee) => employee._id !== id);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = employees.filter((employee) => 
            employee.name.toLowerCase().includes(value) ||
            employee.email.toLowerCase().includes(value) ||
            employee.designation.toLowerCase().includes(value) ||
            employee.course.toLowerCase().includes(value)
        );
        setFilteredEmployees(filtered);
    };

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedEmployees = [...filteredEmployees].sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredEmployees(sortedEmployees);
    };

    const handleSortFieldChange = (e) => {
        const field = e.target.value;
        handleSort(field);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 bg-fuchsia-100 py-10">
            <div className="container mx-auto px-6 md:px-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-purple-700">Employee List</h1>
                    <Link
                        to="/create"
                        className="bg-pink-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-pink-600 transition duration-200"
                    >
                        Add New Employee
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email, designation, or course"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />

                    <div className="flex items-center space-x-4">
                        <label className="text-purple-600 font-medium">Sort By:</label>
                        <select
                            onChange={handleSortFieldChange}
                            value={sortField}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                            <option value="_id">ID</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="createdAt">Created At</option>
                        </select>
                        <button
                            onClick={() => handleSort(sortField)}
                            className="text-purple-600"
                        >
                            {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                        </button>
                    </div>
                </div>


                <div className="overflow-x-auto rounded-lg shadow-xl bg-white">
                    <table className="min-w-full table-auto text-sm text-gray-800">
                        <thead className="bg-purple-500 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Unique ID</th>
                                <th className="py-3 px-4 text-left">Image</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Mobile No</th>
                                <th className="py-3 px-4 text-left">Gender</th>
                                <th className="py-3 px-4 text-left">Designation</th>
                                <th className="py-3 px-4 text-left">Course</th>
                                <th className="py-3 px-4 text-left">Created At</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee._id} className="border-b bg-white shadow-sm">
                                    <td className="py-3 px-4">{employee._id}</td>
                                    <td className="py-3 px-4">
                                        <img
                                            src={employee.image || 'https://via.placeholder.com/50'}
                                            alt={employee.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="py-3 px-4">{employee.name}</td>
                                    <td className="py-3 px-4">{employee.email}</td>
                                    <td className="py-3 px-4">{employee.mobileNo}</td>
                                    <td className="py-3 px-4">{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td className="py-3 px-4">{employee.designation}</td>
                                    <td className="py-3 px-4">{employee.course}</td>
                                    <td className="py-3 px-4">{new Date(employee.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 flex space-x-4">
                                        <Link
                                            to={`/edit/${employee._id}`}
                                            className="text-purple-500 hover:text-purple-700 transition duration-200"
                                        >
                                            <FaEdit className="inline-block mr-2" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(employee._id)}
                                            className="text-pink-500 hover:text-pink-700 transition duration-200"
                                        >
                                            <FaTrash className="inline-block mr-2" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
