import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CONSTANTS_COMMON from '../../constants/common';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]); 
    const user = useSelector((state) => state.auth.user);
    const doctor = useSelector((state) => state.doctor.doctor);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const id = user?._id || doctor?._id;
                const action = user ? "fetchDoctorForUsers" : "fetchUsersForDoctors";
                const response = await axios.get(`${CONSTANTS_COMMON.API_BASE_URL}api/message/conversations`, {
                    params: { id, action }
                });

                if (response.data?.conversation) {
                    setConversations(response.data.conversation);
                  } else {
                    console.warn("No conversations found in API response");
                  }
                  
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, [user, doctor]);
    
    return { loading, conversations };
};

export default useGetConversations;

