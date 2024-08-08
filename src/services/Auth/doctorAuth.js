import Api from '../../api/axiosInstance'

export const doctorSignup = async (doctorData) => {
    try {
        const response = await Api.post('api/doctor/doctor-register', doctorData, {
            withCredentials: true,
        })
        return response
    } catch (error) {
        console.log('Error in doctorSignup api', error.message);
    }
}


export const otpGenerator = async (email) => {
    console.log('Otp generator vannu doctor');
    try {
        console.log('otp tryil vannu')
        const response = await Api.post('api/doctor/otp-generator', { email });
        return response;
    } catch (error) {
        console.log("Error in otpGenerator Api", error.message);
    }
};


export const validateDoctorOtp = async (enteredOtp, state) => {
  
        const response = await Api.post('api/doctor/otp-verify', {
            otp: enteredOtp,
            email: state.email,
            userData: state.userData 
        });
        console.log('response is ', response);
        return response;
}

export const resendDoctorOtp = async (state) => {
    try {
        const response = await Api.post('api/doctor/resend-otp', {
            email: state.email
        }, { withCredentials: true });
        return response;
    } catch (error) {
        console.log("Error in resendDoctorOtp Api", error.message);
    }
};


export const doctorLogin = async (formData) => {
    const response = await Api.post('api/doctor/doctor-login', formData);
    return response;
 
};


export const googleDoctorLogin = async (email, name) => {
    console.log('coming to google doctor login');
    const response = await Api.post('api/doctor/google-login', { email, name });
    return response;
};
