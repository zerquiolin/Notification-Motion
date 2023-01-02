// Core
import React, { useContext, useEffect } from "react";
// Context
import { NotificationContext } from "../Contexts/NotificationContext";
// Framer Motion
import { motion, useAnimation } from "framer-motion";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

// Type & Interfaces
type NotificationType = "Success" | "Error" | "Info" | "Warning";
export interface INotification {
  type: NotificationType;
  text: string;
}
type IIcons = {
  [key in NotificationType]: IconDefinition;
};
type IColors = {
  [key in NotificationType]: {
    shadow: string;
    background: string;
    color: string;
  };
};

const Notification = () => {
  // Data
  const icons: IIcons = {
    Success: faCircleCheck,
    Error: faCircleXmark,
    Info: faCircleInfo,
    Warning: faTriangleExclamation,
  };
  const colors: IColors = {
    Success: { shadow: "#EAFCDD", background: "#D2F9BD", color: "#0F6021" },
    Error: { shadow: "#ffc1c1", background: "#FF7C66", color: "#7A1324" },
    Info: { shadow: "#CDF4FF", background: "#6ACEFF", color: "#012A7A" },
    Warning: { shadow: "#FFFCCD", background: "#FFF99B", color: "#7A6B01" },
  };

  const whiteColors = {
    shadow: "#f3f3f3",
    background: "#FFF",
    color: "#000",
  };

  // useContext
  const { notification, clearNotification } = useContext(NotificationContext);

  // useAnimation
  const motionController = useAnimation();

  // handlers - animations

  const fallingMotion = async () => {
    await motionController.start({
      background: colors[notification.type].background,
      color: colors[notification.type].color,
      boxShadow: `0px 0px 15px ${colors[notification.type].shadow}`,
      transition: { ease: "easeIn", duration: 0.2 },
    });

    await motionController.start({
      transform: "translateY(120%) scale(1.1)",
      transition: {
        ease: "easeIn",
        duration: 0.2,
      },
    });

    return await motionController.start({
      transform: "translateY(100%) scale(1)",
      transition: { ease: "easeInOut", delay: 0.2, duration: 0.2 },
    });
  };
  const elevatingMotion = async () => {
    await motionController.start({
      transform: "translateY(50%) rotate(-2deg)",
      transition: { duration: 0.2, ease: "easeInOut" },
    });
    await motionController.start({
      transform: "translateY(150%) rotate(5deg)",
      transition: { ease: "easeInOut", duration: 0.3 },
    });
    await motionController.start({
      scale: 1,
      background: whiteColors.background,
      color: whiteColors.color,
      boxShadow: `0px 0px 15px ${whiteColors.shadow}`,
      transform: "translateY(-200%) rotate(0deg)",
      transition: { ease: "easeInOut", delay: 0.2, duration: 0.2 },
    });

    setTimeout(clearNotification, 1000);
  };

  const playMotion = async () => {
    await fallingMotion();
    setTimeout(() => elevatingMotion(), 4000);
  };

  // useEffect
  useEffect(() => {
    if (notification.text === "") return;

    playMotion();
  }, [notification]);

  return (
    <div className="notification">
      <motion.div
        initial={{
          scale: 1,
          transform: "translateY(-200%)",
          background: whiteColors.background,
          color: whiteColors.color,
          boxShadow: `0px 0px 15px ${whiteColors.shadow}`,
        }}
        animate={motionController}
        className={`notification__card `}
      >
        {notification.text! !== "" && (
          <FontAwesomeIcon icon={icons[notification.type]} />
        )}
        <p>{notification.text}</p>
      </motion.div>
    </div>
  );
};

export default Notification;
