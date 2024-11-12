import Api, { authInstance } from '../../api/axiosInstance'
import MyBookings from '../../components/Profile/User/MyBookings';

export const editProfile = async (formData) => {
  console.log('coming to editprofile');

  const response = await Api.patch("api/patient/edit-profile", formData);
  console.log('response editprofile', response)
  return response;

};


export const refreshAccessToken = async () => {
  const response = await authInstance.post('api/patient/refresh-token', { withCredentials: true });
  console.log('refresh access token responnse ', response.data);

  return response.data;
}

export const fetchDoctorDetails = async (id) => {
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


export const confirmBooking = async (data) => {
  console.log('coming to confirm booking', data)
  const response = await Api.post(`api/patient/confirmBooking`, data)
  return response
}


export const fetchBookings = async (id, date) => {
  const response = await Api.get(`api/patient/fetchBookings`, {
    params: { id, date }
  });
  console.log('fetched booking response', response)
  return response
}


export const fetchMyBookings = async (patientId) => {
  try {
    const response = await Api.get('api/patient/myBookings', {
      params: { patientId },
    });
    console.log('Fetched my bookings:', response);
    return response;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  console.log('cancel booking id', bookingId)
  const response = await Api.patch(`api/patient/cancelBooking/${bookingId}`)
  console.log('response from cancel booking', response);
  return response;
}

export const getWalletHistory = async (patientId) => {
  console.log('wallet ', patientId);
  const response = await Api.get(`api/patient/walletHistory/${patientId}`)
  console.log("response wallet", response)
  return response;

}


export const fetchBanner = async () => {
  const response = await Api.get(`api/patient/getBanner`)
  console.log('banner ', response)
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
  console.log('fetch doctor list');
  const response = await Api.get('api/patient/fetchDoctorList'); 
  console.log('response of doctorlist', response);
  return response;
}


export const postRating = async(data) => {
  const response  = await Api.post(`api/patient/postRating`,data)
  return response;
}