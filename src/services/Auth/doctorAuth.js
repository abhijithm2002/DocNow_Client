import Api from '../../api/axiosInstance'

export const doctorSignup = async (doctorData) => {
    try {
        const response = await Api.post('api/doctor/doctor-register', doctorData, {
            withCredentials: true,
        })
        return response
    } catch (error) {
        
    }
}


export const otpGenerator = async (email) => {
    
    try {
        
        const response = await Api.post('api/doctor/otp-generator', { email });
        return response;
    } catch (error) {
        
    }
};


export const validateDoctorOtp = async (enteredOtp, state) => {
  
        const response = await Api.post('api/doctor/otp-verify', {
            otp: enteredOtp,
            email: state.email,
            userData: state.userData 
        });
        
        return response;
}

export const resendDoctorOtp = async (state) => {
    try {
        const response = await Api.post('api/doctor/resend-otp', {
            email: state.email
        }, { withCredentials: true });
        return response;
    } catch (error) {
        
    }
};


export const doctorLogin = async (formData) => {
    const response = await Api.post('api/doctor/doctor-login', formData);
    
    return response;
 
};


export const googleDoctorLogin = async (email, name) => {
    
    const response = await Api.post('api/doctor/google-login', { email, name });
    return response;
};
