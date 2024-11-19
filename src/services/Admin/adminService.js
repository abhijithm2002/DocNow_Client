import Api from "../../api/axiosInstance";
import { authInstance } from "../../api/axiosInstance";
import AdminApi from "../../api/adminInstance";





export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/admin/refresh-token',{withCredentials : true});
    

    return response.data;
}


export const fetchUserList = async () => {
    
    const response = await AdminApi.get('/api/admin/fetchUserList')
    
    return response
}



export const BlockAndUnblockUser = async (userId, status) => {
    
    const response = await AdminApi.patch(`/api/admin/patient/${userId}/blockUnblock`, { status });
    
    return response;
};

export const fetchDoctorsList = async () => {
    
    const response = await AdminApi.get('/api/admin/fetchDoctorList'); 
    
    return response;
}

export const fetchDoctors = async () => {
    
    const response = await AdminApi.get('/api/admin/fetchDoctors'); 
    
    return response;
}

export const BlockAndUnblockDoctor = async (userId, status) => {
    
    const response = await AdminApi.patch(`/api/admin/doctor/${userId}/blockUnblock`, { status });
    
    return response;
};


export const verifyDoctor = async (doctorId) => {
        
        const response = await AdminApi.patch(`/api/admin/doctor/${doctorId}/verify`);
        
        return response;
};

export const createBanner = async(formData) => {
    
    const response = await AdminApi.post(`/api/admin/createBanner`, formData);
    
    return response;
}

export const blockAndUnblockBanner = async(bannerId, status) => {
    
    const response = await AdminApi.patch(`/api/admin/banner/${bannerId}/blockUnblockBanner`, {status})
    return response;
}
export const fetchBanner = async () => {
    
    const response = await AdminApi.get('/api/admin/fetchBanner'); 
    
    return response;
}

export const Bookings = async() =>{
    const response = await AdminApi.get(`/api/admin/bookings`)
    return response;
}


export const bookingList = async(userData) =>{
    const response = await AdminApi.get(`/api/admin/bookingList`,{params: userData})
    return response;
}


