import Api, { authInstance } from '../../api/axiosInstance'
import MyBookings from '../../components/Profile/User/MyBookings';

export const editProfile = async (formData) => {
  

  const response = await Api.patch("api/patient/edit-profile", formData);
  
  return response;

};


export const refreshAccessToken = async () => {
  const response = await authInstance.post('api/patient/refresh-token', { withCredentials: true });
  

  return response.data;
}

export const fetchDoctorDetails = async (id) => {
  
  const response = await Api.get(`api/patient/fetchDoctorDetails?id=${id}`);
  

  return response;
}

export const fetchSlots = async (id, date) => {

  const response = await Api.get(`api/patient/fetchSlots`, {
    params: { id, date }
  });

  
  return response;
};


export const confirmBooking = async (data) => {
  
  const response = await Api.post(`api/patient/confirmBooking`, data)
  return response
}


export const fetchBookings = async (id, date) => {
  const response = await Api.get(`api/patient/fetchBookings`, {
    params: { id, date }
  });
  
  return response
}


export const fetchMyBookings = async (patientId) => {
  try {
    const response = await Api.get('api/patient/myBookings', {
      params: { patientId },
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
// export const fetchMyBookings = async (patientId, page, limit =7) => {
//   
//   const response = await Api.get(`/api/patient/myBookings/${patientId}?page=${page}&limit=${limit}`);
//   
//   return response.data; // Expect { data: bookings, totalCount }
// };


export const cancelBooking = async (bookingId) => {
  
  const response = await Api.patch(`api/patient/cancelBooking/${bookingId}`)
  
  return response;
}

export const getWalletHistory = async (patientId) => {
  
  const response = await Api.get(`api/patient/walletHistory/${patientId}`)
  
  return response;

}


export const fetchBanner = async () => {
  const response = await Api.get(`api/patient/getBanner`)
  
  return response;
}

export const addFavouriteDoctor = async (patientId, doctorId, name, expertise) => {
  const response = await Api.patch(`api/patient/addToFavourites`, {
    patientId,
    doctorId,
    name,
    expertise
  })

  return response;
}

export const getFavouriteDoctors = async (patientId) => {
  const response = await Api.get(`api/patient/getFavouriteDoctors/${patientId}`)
  return response;
}


export const fetchDoctorsList = async () => {
  
  const response = await Api.get('api/patient/fetchDoctorList'); 
  
  return response;
}


export const postRating = async(data) => {
  const response  = await Api.post(`api/patient/postRating`,data)
  return response;
}

export const fetchAdmin = async() => {
  const response = await Api.get(`api/patient/fetchAdmin`)
  return response;
}

export const fetchUserNotifications = async(patientId) => {
  const response = await Api.get(`api/patient/getNotification/${patientId}`)
  return response;
}


export const markAsRead = async(notificationId) => {
  console.log('notification id ', notificationId)
  const response = await Api.patch(`api/patient/markAsRead/${notificationId}/read`)
  response;
}