import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GoogleCallBack from "./pages/GoogleCallBack";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/auth/google" index element={<GoogleCallBack />} />
        <Route path="/profile" index element={<ProfilePage />} />
        <Route path="*" index element={<>not found</>} />
      </Routes>
    </>
  );
}

export default App;
