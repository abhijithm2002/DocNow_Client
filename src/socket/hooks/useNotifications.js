import { useState, useEffect } from 'react';
import { fetchNotification } from '../../services/Doctor/doctorService';
import {fetchUserNotifications} from '../../services/User/userService'
import { useSelector } from 'react-redux';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
    const doctor = useSelector((state) => state.doctor.doctor);
    const patient = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if(doctor) {
        const response = await fetchNotification(userId);
        if (response.status === 200) {
          setNotifications(response.data.data);
        }
        } else {
        console.log('entered fetchuser notifications')
        const response = await fetchUserNotifications(userId);
        if (response.status === 200) {
          setNotifications(response.data.data);
        }
        }
        
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };
    
    if (userId) fetchNotifications();
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, setNotifications, unreadCount };
};
