import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export default function IsAuth<T extends object>(Comp: ComponentType<T>) {
  const token = localStorage.getItem("token");

  // Define a named function instead of using an anonymous function
  return (props: T) => {
    if (token) return <Comp {...props} />;
    else return <Navigate to={"/login"} />;
  };
}
