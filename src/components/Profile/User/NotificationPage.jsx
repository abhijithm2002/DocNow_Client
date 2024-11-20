import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { useSocketContext } from "../../../socket/SocketContext";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNotifications } from "../../../socket/hooks/useNotifications";
import { markAsRead } from "../../../services/User/userService";


export default function NotificationPage() {
  const { newBooking } = useSocketContext();
  const userId = useSelector((state) => state.auth.user._id)

  const { notifications, setNotifications, unreadCount } = useNotifications(userId);

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


  const handleMarkAsRead = async (id) => {
  try {
    await markAsRead(id); 
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Notifications</h2>
          
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
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => handleMarkAsRead(notification._id)}
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
