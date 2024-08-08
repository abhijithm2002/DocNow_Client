// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../config/firebase';
// import { isAxiosError } from 'axios';
// import { toast } from 'react-toastify';
// import { googleLogin } from '../services/Auth/userAuth';
// import { userSignup } from '../services/Auth/userAuth';


// const LoginWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(auth, provider)
//         console.log(result)
//         const user = result.user
//         console.log('result response siginwith pop', user);

//         if (user) {
//             const response = await googleLogin(
//                 user?.email as string,
//                 user?.displayName as string,
//             )
//             return response
//         }
//     } catch (error) {
//         if (isAxiosError(error)) {
//             toast.error(error.response?.data.message)
//         }
//     }
// }


// export default LoginWithGoogle


import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { googleLogin } from '../services/Auth/userAuth';
import { googleDoctorLogin } from '../services/Auth/doctorAuth';

const LoginWithGoogle = async (userType) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user) {
            let response;
            if (userType === 'doctor') {
                response = await googleDoctorLogin(user.email, user.displayName);
            } else {
                response = await googleLogin(user.email, user.displayName);
            }
            return response;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
};

export default LoginWithGoogle;
