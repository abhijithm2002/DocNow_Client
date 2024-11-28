import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateUserOtp, resendUserOtp, userSignup } from "../../../services/Auth/userAuth";
import { validateDoctorOtp, resendDoctorOtp, doctorSignup } from "../../../services/Auth/doctorAuth";
import { isAxiosError } from "axios";

function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState(Array(4).fill(false));
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const location = useLocation();

  // Refs for input fields
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = false;
        return newErrors;
      });

      // Automatically move to the next input
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = true;
        return newErrors;
      });
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setOtpErrorMessage("Please enter a 4-digit OTP");
      setErrors(Array(4).fill(true));
      return;
    }

    const { state } = location;
    try {
      const validateOtp = state.userType === "patient" ? validateUserOtp : validateDoctorOtp;
      const signup = state.userType === "patient" ? userSignup : doctorSignup;

      const response = await validateOtp(enteredOtp, state);
      if (response.status === 200) {
        const signupData = JSON.parse(localStorage.getItem("signupData"));
        if (response.data.message === "User verified") {
          const signupResponse = await signup(signupData);
          if (signupResponse.status === 201) {
            toast.success("User registered successfully. Please log in.");
            localStorage.removeItem("signupData");
            setOtp(["", "", "", ""]);
            setErrors(Array(4).fill(false));
            setOtpErrorMessage("");
            navigate(state.userType === "patient" ? "/login" : "/doctor/login");
          } else {
            console.error("Unexpected signup response:", signupResponse);
          }
        }
      } else if (response.status === 400) {
        setOtpErrorMessage(response.data.message);
        setErrors(Array(4).fill(true));
      }
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 400) {
        setOtpErrorMessage(error.response.data.message);
      } else {
        setOtpErrorMessage("An error occurred during OTP verification");
      }
      console.error("Error in OTP verification or user signup:", error);
    }

    setOtp(["", "", "", ""]);
    setErrors(Array(4).fill(false));
  };

  const handleResend = async () => {
    if (resendEnabled) {
      const { state } = location;
      setTimer(20);
      setResendEnabled(false);
      try {
        const resendOtp = state.userType === "patient" ? resendUserOtp : resendDoctorOtp;
        const response = await resendOtp(state);
        if (response.status === 200) {
          toast.success("OTP successfully resent.");
        } else {
          toast.error("Failed to resend OTP.");
        }
      } catch (error) {
        toast.error("Failed to resend OTP.");
        console.error("Error in resend OTP:", error);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen justify-center items-center"
      style={{
        backgroundImage: `url('/public/assets/bg.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">DocNow</h1>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Enter OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            {otp.map((value, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-2 ${
                    errors[index] ? "border-red-500" : ""
                  }`}
                />
              </div>
            ))}
          </div>
          {otpErrorMessage && (
            <div className="text-red-500 text-xs mb-4 text-center">{otpErrorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleResend}
            disabled={!resendEnabled}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Resend OTP {resendEnabled ? "" : `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
