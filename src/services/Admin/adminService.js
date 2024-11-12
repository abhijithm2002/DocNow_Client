import Api from "../../api/axiosInstance";
import { authInstance } from "../../api/axiosInstance";
import AdminApi from "../../api/adminInstance";





export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/admin/refresh-token',{withCredentials : true});
    console.log('refresh access token responnse ', response.data);

    return response.data;
}


export const fetchUserList = async () => {
    console.log('fetch user listil vannu')
    const response = await AdminApi.get('/api/admin/fetchUserList')
    console.log('response of userlist', response)
    return response
}



export const BlockAndUnblockUser = async (userId, status) => {
    console.log('block and unblock user called');
    const response = await AdminApi.patch(`/api/admin/patient/${userId}/blockUnblock`, { status });
    console.log('block/unblock response:', response);
    return response;
};

export const fetchDoctorsList = async () => {
    console.log('fetch doctor list');
    const response = await AdminApi.get('/api/admin/fetchDoctorList'); 
    console.log('response of doctorlist', response);
    return response;
}

export const BlockAndUnblockDoctor = async (userId, status) => {
    console.log('block and unblock user called');
    const response = await AdminApi.patch(`/api/admin/doctor/${userId}/blockUnblock`, { status });
    console.log('block/unblock response:', response);
    return response;
};


export const verifyDoctor = async (doctorId) => {
        console.log('Sending request to verify doctor');
        const response = await AdminApi.patch(`/api/admin/doctor/${doctorId}/verify`);
        console.log('Response from verifyDoctor:', response);
        return response;
};

export const createBanner = async(formData) => {
    console.log('entered create banner');
    const response = await AdminApi.post(`/api/admin/createBanner`, formData);
    console.log('response banner',response)
    return response;
}

export const blockAndUnblockBanner = async(bannerId, status) => {
    console.log('banner id and status', bannerId, status)
    const response = await AdminApi.patch(`/api/admin/banner/${bannerId}/blockUnblockBanner`, {status})
    return response;
}
export const fetchBanner = async () => {
    console.log('fetch doctor list');
    const response = await AdminApi.get('/api/admin/fetchBanner'); 
    console.log('response of doctorlist', response);
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
