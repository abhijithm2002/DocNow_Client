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
   
    const response = await DoctorApi.get(`api/doctor/fetchSlots`, {
      params: { id, date }
    });
    
    console.log('response fetched slots', response);
    return response;
  };
  

  export const deleteSlots = async(slotId, selectedShifts) => {
    const response = await DoctorApi.patch(`api/doctor/deleteSlots`, {slotId, selectedShifts})
    console.log('delete slot response ', response)
    return response
  }

  export const fetchAppointments = async (doctorId) => {
    const response = await DoctorApi.get(`/api/doctor/fetchAppointments/${doctorId}`);
    console.log('response from fetch appointments:', response);
    return response;
}

export const fetchWalletHistory = async(doctorId) => {
  console.log('doctor id fetch wallet', doctorId)
  const response = await DoctorApi.get(`api/doctor/wallet-history/${doctorId}`)
  console.log('response fetcching wallet history', response);
  return response;
}


export const updateBooking = async(bookingId) =>{
  console.log('update booking', bookingId)
  const response = await DoctorApi.patch(`api/doctor/updateBooking`,{bookingId})
  return response
}

export const postPrescription = async({id,prescriptions}) => {
  console.log('id ', id)
  console.log('formdata ', prescriptions)
  const response = await DoctorApi.post(`api/doctor/postPrescription`,{id, prescriptions} )
  console.log('response from sub', response)
  return response;
}

export const drAppointments = async(date, doctorId) => {
  const response = await DoctorApi.get(`api/doctor/drAppointments`, {params:{date, doctorId}})
  return response;
}

