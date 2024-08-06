import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GoogleCallBack from "./pages/GoogleCallBack";
import { ProfilePage } from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { HomePage } from "./pages/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import { ChatPage } from "./pages/ChatPage";
import CallContainer from "./components/ui/activeChate/CallContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" index element={<ProfilePage />} />
          <Route path="/chats" element={<ChatPage />}>
            <Route path="call" element={<CallContainer />} />
          </Route>
        </Route>

        {/* auth */}
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/auth/google" index element={<GoogleCallBack />} />

        <Route path="*" index element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
