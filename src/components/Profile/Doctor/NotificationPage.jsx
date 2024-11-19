import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { useSocketContext } from "../../../socket/SocketContext";
import { useSelector } from "react-redux";
import { fetchNotification } from "../../../services/Doctor/doctorService";
import toast from "react-hot-toast";

export default function NotificationPage() {
  const { newBooking } = useSocketContext();
  const [notifications, setNotifications] = useState([]);
  const doctorId = useSelector((state) => state.doctor.doctor._id)

  useEffect(() => {
    const fetchNotifications = async() => {
      try {
        const response = await fetchNotification(doctorId)
        console.log('response response of notifications', response)
        if (response.status === 200) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        toast.error('Error in fetching notifications')
      }
    }
    if(doctorId) {
      fetchNotifications()
    }
  },[doctorId])

  useEffect(() => {
    if (newBooking) {
      const newNotification = {
        id: Date.now().toString(),
        message: newBooking.message,
        timestamp: new Date().toLocaleString(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [newBooking]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Button size="sm" variant="light" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </CardHeader>
        <CardBody>
          {unreadCount > 0 && (
            <div className="mb-4">
              <Badge color="primary" variant="flat">
                {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
              </Badge>
            </div>
          )}
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No new notifications
            </p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification, index) => (
                <li key={index}>
                  <Card
                    className={`w-full ${
                      notification.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <CardBody className="flex items-start space-x-4 p-4">
                      <Bell
                        className={`h-5 w-5 ${
                          notification.read
                            ? "text-gray-400"
                            : "text-blue-500"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold text-gray-700">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
        <CardFooter>
          <p className="text-sm text-gray-500">
            You have {notifications.length} total notifications.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
