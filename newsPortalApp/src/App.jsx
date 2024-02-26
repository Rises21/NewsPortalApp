import NavigationBar from "./components/NavigationBar";
import "./app.scss";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "./api/customHooks/useFetch";

function App() {
  const navigate = useNavigate();
  const [msgLogin, setMsgLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  // console.log(isLogin);
  // console.log(refreshToken);
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    console.log(email, password, "<<<");
    try {
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      setMsgLogin(res.data.msg);
      setIsLogin(true);
      setRefreshToken(res.data.accessToken);
      setTimeout(() => {
        navigate("/", { replace: true });
        setMsgLogin("");
      }, 3000);
    } catch (error) {
      if (error.response) return setMsgLogin(error.response.data.msg);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3002/logout");
      console.log("executed logout.");
      setIsLogin(false);
      setRefreshToken("");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (refreshToken) setIsLogin(true);
  }, [refreshToken, isLogin, msgLogin]);

  return (
    <>
      <header id="header" className="w-100">
        <NavigationBar
          handleLogout={handleLogout}
          isLogin={isLogin}
          setRefreshToken={setRefreshToken}
        />
      </header>
      <main id="main">
        <Outlet
          context={{
            handleLogin: handleLogin,
            msgLogin: msgLogin,
            isLogin: isLogin,
            setIsLogin: setIsLogin,
            refreshToken: refreshToken,
          }}
        />
      </main>
      <footer id="footer">
        <div className="container-fluid text-center bg-secondary py-3">
          <p className="mb-0">&#169; 2023 By Bangkit Setio R</p>
        </div>
      </footer>
    </>
  );
}

export default App;
