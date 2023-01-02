// Core
import React, { useContext } from "react";
// Components
import Notification from "./Components/Notification";
// Context
import { NotificationContext } from "./Contexts/NotificationContext";
// Style
import "./Scss/Style.scss";

function App() {
  // useContext
  const { notification, newNotification } = useContext(NotificationContext);
  return (
    <div className="App">
      <button
        onClick={() =>
          newNotification({
            type: "Success",
            text: "We succesfully loaded your data!",
          })
        }
      >
        Success
      </button>
      <button
        onClick={() =>
          newNotification({
            type: "Info",
            text: "Loading Information, please wait.",
          })
        }
      >
        Information
      </button>
      <button
        onClick={() =>
          newNotification({
            type: "Warning",
            text: "Please fill all the required information (Ticket Number)",
          })
        }
      >
        Warning
      </button>
      <button
        onClick={() =>
          newNotification({
            type: "Error",
            text: "Something went wrong, please try again!",
          })
        }
      >
        Error
      </button>
      <Notification />
    </div>
  );
}

export default App;
