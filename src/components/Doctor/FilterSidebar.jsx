import React, { useState } from 'react';
import { FaFilter, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';

const FilterSidebar = ({ onFilterChange }) => {
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSpecializationChange = (e) => {
        setSelectedSpecialization(e.target.value);
        onFilterChange({ specialization: e.target.value, minPrice, maxPrice });
    };

    
    return (
        <div className="w-full max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
            <div className="flex items-center space-x-2 mb-6">
                <FaFilter className="text-deepBlue w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>

            {/* Specialization Filter */}
            <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <FaUserMd className="text-irishBlueColor w-5 h-5" />
                    <h3 className="font-medium text-gray-700">Specialization</h3>
                </div>
                <select
                    value={selectedSpecialization}
                    onChange={handleSpecializationChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-irishBlueColor transition duration-200"
                >
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Surgery">Surgery</option>
                </select>
            </div>

            {/* Price Filter */}
            {/* <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className="text-green-500 w-5 h-5" />
                    <h3 className="font-medium text-gray-700">Price Range</h3>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                    <input
                        type="number"
                        name="minPrice"
                        value={minPrice}
                        onChange={handlePriceChange}
                        placeholder="Min"
                        className="w-1/2 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-300 transition duration-200"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        placeholder="Max"
                        className="w-1/2 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-300 transition duration-200"
                    />
                </div>
            </div> */}
        </div>
    );
};

export default FilterSidebar;
