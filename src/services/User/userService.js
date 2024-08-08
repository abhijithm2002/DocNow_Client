import Api, { authInstance } from '../../api/axiosInstance'

export const editProfile = async (formData) => {
    console.log('coming to editprofile');

    const response = await Api.post("api/patient/edit-profile", formData);
    console.log('response editprofile',response)
    return response;

};


export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/patient/refresh-token',{withCredentials : true});
    console.log('refresh access token responnse ', response.data);

    return response.data;
}


