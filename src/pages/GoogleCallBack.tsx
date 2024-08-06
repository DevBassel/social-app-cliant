import { Navigate, useSearchParams } from "react-router-dom";

export default function GoogleCallBack() {
  const [searchParams] = useSearchParams();
  if (searchParams.get("token")) {
    localStorage.setItem("token", searchParams.get("token")!);
  }

  return <Navigate to={"/profile"} />;
}
