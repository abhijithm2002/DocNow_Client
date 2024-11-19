import Api from '../../api/axiosInstance';

export const adminLogin = async (formData) => {
    
    const response = await Api.post('/api/admin/admin-login', formData); // Ensure this URL matches the server route
    return response;
};
