import Api, { authInstance } from '../../api/axiosInstance'

export const editProfile = async (formData) => {
    console.log('coming to editprofile');

    const response = await Api.patch("api/patient/edit-profile", formData);
    console.log('response editprofile',response)
    return response;

};


export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/patient/refresh-token',{withCredentials : true});
    console.log('refresh access token responnse ', response.data);

    return response.data;
}

export const fetchDoctorDetails = async(id) => {
    console.log('coming to fetchDoctor details', id)
    const response = await Api.get(`api/patient/fetchDoctorDetails?id=${id}`);
    console.log('response doctor details', response);
    
    return response;
  }

  export const fetchSlots = async (id, date) => {
   
    const response = await Api.get(`api/patient/fetchSlots`, {
      params: { id, date }
    });
    
    console.log('response fetched slots', response);
    return response;
  };
  

