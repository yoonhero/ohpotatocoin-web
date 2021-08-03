import React from "react"

export default function Notification(message) {
  return {
    title: "Success!",
    message: message,
    type: "success",
    insert: "bottom",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    
    dismiss: {
    duration: 1500,
    onScreen: true,
    pauseOnHover: true
  }
  };
}

export function FailNotification(message){
  return {
    title: "Error",
    message: message,
    type: "danger",
    insert: "bottom",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
     dismiss: {
    duration: 1500,
    onScreen: true,
    pauseOnHover: true
  },
  };   
}
