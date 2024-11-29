import DoctorApi from "../../api/doctorInstance";
import { authInstance } from "../../api/axiosInstance";

export const editDoctorProfile = async (formData) => {
    
    const response = await DoctorApi.patch("api/doctor/edit-profile", formData,{
    
    });
    
    return response;

};


export const refreshAccessToken = async () => {
    const response = await authInstance.post('api/doctor/refresh-token',{withCredentials : true});
    

    return response.data;
}


export const documentsUpload = async (formData) => {
    

    const response = await DoctorApi.patch("api/doctor/uploadDocuments", formData);
    
    return response;

};

export const getUploadedDocuments = async(doctorEmail) => {
    
    
    const response = await DoctorApi.get(`api/doctor/getDocuments?email=${doctorEmail}`)
    
    return response
}


export const updateSlots = async (slotsData) => {
    
    const response = await DoctorApi.post('api/doctor/updateSlots', slotsData)
    
    return response;
}


export const fetchSlots = async (id, date) => {
   
    const response = await DoctorApi.get(`api/doctor/fetchSlots`, {
      params: { id, date }
    });
    
    
    return response;
  };
  

  export const deleteSlots = async(slotId, selectedShifts) => {
    const response = await DoctorApi.patch(`api/doctor/deleteSlots`, {slotId, selectedShifts})
    
    return response
  }

  export const fetchAppointments = async (doctorId) => {
    const response = await DoctorApi.get(`/api/doctor/fetchAppointments/${doctorId}`);
    
    return response;
}

export const fetchWalletHistory = async(doctorId) => {
  
  const response = await DoctorApi.get(`api/doctor/wallet-history/${doctorId}`)
  
  return response;
}


export const updateBooking = async(bookingId) =>{
  
  const response = await DoctorApi.patch(`api/doctor/updateBooking`,{bookingId})
  return response
}

export const postPrescription = async({id,prescriptions}) => {
  
  
  const response = await DoctorApi.post(`api/doctor/postPrescription`,{id, prescriptions} )
  
  return response;
}

export const drAppointments = async(date, doctorId) => {
  const response = await DoctorApi.get(`api/doctor/drAppointments`, {params:{date, doctorId}})
  return response;
}


export const fetchNotification = async(doctorId) => {
  const response = await DoctorApi.get(`api/doctor/getNotification/${doctorId}`)
  return response;
}

export const markAsRead = async(notificationId) => {
  console.log('notification id ', notificationId)
  const response = await DoctorApi.patch(`api/doctor/markAsRead/${notificationId}/read`)
  response;
}

export const fetchAdminInDoctor = async() => {
  const response = await DoctorApi.get(`api/doctor/fetchAdmin`)
  return response;
}