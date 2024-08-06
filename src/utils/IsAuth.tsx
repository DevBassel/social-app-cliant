import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./getToken";

export default function IsAuth<T extends object>(Comp: ComponentType<T>) {
  const AuthenticatedComponent = (props: T) => {
    const token = getToken();

    if (token) {
      return <Comp {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthenticatedComponent;
}
