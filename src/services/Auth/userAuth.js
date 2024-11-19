import Api,{authInstance} from '../../api/axiosInstance';

export const userSignup = async (userData) => {
    try {
        
        const response = await Api.post('api/patient/user_register', userData, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        
    }
};

export const validateUserOtp = async (enteredOtp, state) => {
        const response = await Api.post('api/patient/otp-verify', {
            otp: enteredOtp,
            email: state.email,
            userData: state.userData 
        });
        
        return response;
    
}


export const resendUserOtp = async (state) => {
    try {
        const response = await Api.post('api/patient/resend-otp', {
            email: state.email
        }, {withCredentials: true});
        return response;
    } catch (error) {
        
    }
}

export const otpGenerator = async (email) => {
    try {
        const response = await Api.post('api/patient/otp-generator', { email });
        return response;
    } catch (error) {
        
    }
};


export const userLogin = async (formData) => {
    
      const response = await authInstance.post('api/patient/login', formData);
      
      return response;
   
  };


export const googleLogin = async(email, name) => {
    
    
    
    const response = await authInstance.post('api/patient/google-login', {email, name});
    
    return response
}


