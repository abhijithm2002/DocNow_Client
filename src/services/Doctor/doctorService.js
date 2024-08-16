import DoctorApi from "../../api/doctorInstance";
import { authInstance } from "../../api/axiosInstance";

export const editDoctorProfile = async (formData) => {
    console.log('coming to editprofile');

    const response = await DoctorApi.patch("api/doctor/edit-profile", formData);
    console.log('response editprofile',response)
    return response;

};


export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/doctor/refresh-token',{withCredentials : true});
    console.log('refresh access token responnse ', response.data);

    return response.data;
}


export const documentsUpload = async (formData) => {
    console.log('coming to editprofile');

    const response = await DoctorApi.patch("api/doctor/uploadDocuments", formData);
    console.log('response document upload',response)
    return response;

};

export const getUploadedDocuments = async(doctorEmail) => {
    console.log('entered getupload documents');
    console.log('email get',doctorEmail)
    const response = await DoctorApi.get(`api/doctor/getDocuments?email=${doctorEmail}`)
    console.log('response from fetch documents', response)
    return response
}


export const updateSlots = async (slotsData) => {
    console.log('entered update slots')
    const response = await DoctorApi.post('api/doctor/updateSlots', slotsData)
    console.log('response from updated slots', response)
    return response;
}


export const fetchSlots = async (id, date) => {
    console.log('entered fetchSlots');
    
    const response = await DoctorApi.get(`api/doctor/fetchSlots`, {
      params: { id, date }
    });
    
    console.log('response fetched slots', response);
    return response;
  };
  
