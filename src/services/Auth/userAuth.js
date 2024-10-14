import Api,{authInstance} from '../../api/axiosInstance';

export const userSignup = async (userData) => {
    try {
        console.log('coming to usersignup')
        const response = await Api.post('api/patient/user_register', userData, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.log('Error in userSignUp Api', error.message);
    }
};

export const validateUserOtp = async (enteredOtp, state) => {
        const response = await Api.post('api/patient/otp-verify', {
            otp: enteredOtp,
            email: state.email,
            userData: state.userData 
        });
        console.log('response is ',response)
        return response;
    
}


export const resendUserOtp = async (state) => {
    try {
        const response = await Api.post('api/patient/resend-otp', {
            email: state.email
        }, {withCredentials: true});
        return response;
    } catch (error) {
        console.log("Error in resend Otp Api",error.message);
    }
}

export const otpGenerator = async (email) => {
    try {
        const response = await Api.post('api/patient/otp-generator', { email });
        return response;
    } catch (error) {
        console.log("Error in otpGenerator Api", error.message);
    }
};


export const userLogin = async (formData) => {
    console.log('coming to userLogin')
      const response = await authInstance.post('api/patient/login', formData);
      console.log('response of userData', response)
      return response;
   
  };


export const googleLogin = async(email, name) => {
    console.log('coming to google patient login');
    console.log('email and name', email, name);
    
    const response = await authInstance.post('api/patient/google-login', {email, name});
    console.log('response', response)
    return response
}
