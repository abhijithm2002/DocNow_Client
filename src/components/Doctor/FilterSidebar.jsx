import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaFilter, FaMoneyBillWave, FaUserMd, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const FilterSidebar = ({ onFilterChange }) => {
    // Yup schema for validation
    const validationSchema = Yup.object({
        specialization: Yup.string(),
        minPrice: Yup.number()
            .min(0, 'Min price must be at least 0.')
            .max(Yup.ref('maxPrice'), 'Min price cannot exceed max price.')
            .typeError('Please enter a valid number'),
        maxPrice: Yup.number()
            .min(Yup.ref('minPrice'), 'Max price must be greater than or equal to min price.')
            .typeError('Please enter a valid number'),
        state: Yup.string(),
        experienceYears: Yup.number()
            .min(0, 'Experience years must be at least 0.')
            .typeError('Please enter a valid number'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            specialization: '',
            minPrice: '',
            maxPrice: '',
            state: '',
            experienceYears: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onFilterChange(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-full max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
                <FaFilter className="text-deepBlue w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>

            {/* Specialization Filter */}
            <div className="mb-6">
                <label className="block font-medium text-gray-700">Specialization</label>
                <select
                    id="specialization"
                    name="specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50"
                >
                    <option value="" label="Select specialization" />
                    <option value="Allergy and Immunology" label="Allergy and Immunology" />
                    <option value="Anesthesiology" label="Anesthesiology" />
                    <option value="Cardiology" label="Cardiology" />
                    <option value="Critical Care Medicine" label="Critical Care Medicine" />
                    <option value="Dentistry" label="Dentistry" />
                    <option value="Dermatology" label="Dermatology" />
                    <option value="Endocrinology" label="Endocrinology" />
                    <option value="Family Medicine" label="Family Medicine" />
                    <option value="Gastroenterology" label="Gastroenterology" />
                    <option value="Geriatrics" label="Geriatrics" />
                    <option value="Hematology" label="Hematology" />
                    <option value="Infectious Disease" label="Infectious Disease" />
                    <option value="Internal Medicine" label="Internal Medicine" />
                    <option value="Nephrology" label="Nephrology" />
                    <option value="Neurology" label="Neurology" />
                    <option value="Obstetrics and Gynecology" label="Obstetrics and Gynecology" />
                    <option value="Oncology" label="Oncology" />
                    <option value="Ophthalmology" label="Ophthalmology" />
                    <option value="Orthopedics" label="Orthopedics" />
                    <option value="Otolaryngology" label="Otolaryngology" />
                    <option value="Pediatrics" label="Pediatrics" />
                    <option value="Physical Medicine and Rehabilitation" label="Physical Medicine and Rehabilitation" />
                    <option value="Plastic Surgery" label="Plastic Surgery" />
                    <option value="Psychiatry" label="Psychiatry" />
                    <option value="Pulmonology" label="Pulmonology" />
                    <option value="Radiology" label="Radiology" />
                    <option value="Rheumatology" label="Rheumatology" />
                    <option value="Surgery" label="Surgery" />
                    <option value="Urology" label="Urology" />
                    <option value="Vascular Surgery" label="Vascular Surgery" />

                </select>
            </div>

            {/* Booking Fees Filter */}
            <div className="mb-6">
                <label className="block font-medium text-gray-700">Booking Fees</label>
                <div className="flex space-x-2">
                    <div className="w-1/2">
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={formik.values.minPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Min"
                            className={`w-full p-3 border rounded-lg bg-gray-50 ${formik.touched.minPrice && formik.errors.minPrice
                                ? 'border-red-500'
                                : 'border-gray-300'
                                }`}
                        />
                        {formik.touched.minPrice && formik.errors.minPrice && (
                            <p className="mt-1 text-sm text-red-500">{formik.errors.minPrice}</p>
                        )}
                    </div>
                    <div className="w-1/2">
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={formik.values.maxPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Max"
                            className={`w-full p-3 border rounded-lg bg-gray-50 ${formik.touched.maxPrice && formik.errors.maxPrice
                                ? 'border-red-500'
                                : 'border-gray-300'
                                }`}
                        />
                        {formik.touched.maxPrice && formik.errors.maxPrice && (
                            <p className="mt-1 text-sm text-red-500">{formik.errors.maxPrice}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* State Filter */}
            <div className="mb-6">
                <label className="block font-medium text-gray-700">State</label>
                <select
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50"
                >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                </select>
            </div>

            {/* Experience Years Filter */}
            <div className="mb-6">
                <label className="block font-medium text-gray-700">Experience Years</label>
                <input
                    type="number"
                    id="experienceYears"
                    name="experienceYears"
                    value={formik.values.experienceYears}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Years"
                    className={`w-full p-3 border rounded-lg bg-gray-50 ${formik.touched.experienceYears && formik.errors.experienceYears
                        ? 'border-red-500'
                        : 'border-gray-300'
                        }`}
                />
                {formik.touched.experienceYears && formik.errors.experienceYears && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.experienceYears}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 bg-irishBlueColor text-white hover:bg-skyBlue rounded-lg"
            >
                Apply Filters
            </button>
        </form>
    );
};

export default FilterSidebar;
