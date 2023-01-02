// Core
import React, { createContext, useState, useEffect } from "react";
// Interface
import { INotification } from "../Components/Notification";

// Interfaces
interface INotificationContext {
  notification: INotification;
  newNotification: (notification: INotification) => void;
  clearNotification: () => void;
}
interface INotificationProvider {
  children: React.ReactNode;
}

// Context
export const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext
);

const NotificationProvider = ({ children }: INotificationProvider) => {
  // useSTate
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notification, setNotification] = useState<INotification>({
    type: "Success",
    text: "",
  });

  // Handlers
  const newNotification = (notification: INotification) => {
    setNotifications([...notifications, notification]);
  };
  const startNotification = () => {
    if (notifications.length === 0) return;

    setIsPlaying(true);

    const currentNotifications = notifications;
    const currentNotification = currentNotifications.shift();

    setNotifications(currentNotifications);
    setNotification(currentNotification as INotification);
  };
  const clearNotification = () => {
    setIsPlaying(false);
    setNotification({ type: "Success", text: "" });
  };

  // useEffect
  useEffect(() => {
    if (!isPlaying) {
      startNotification();
      console.log({ msg: "Current Notifications", notifications });
    }
  }, [notifications, isPlaying]);

  return (
    <NotificationContext.Provider
      value={{ notification, newNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
