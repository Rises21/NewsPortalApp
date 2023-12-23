import NavigationBar from "./components/NavigationBar";
import "./app.scss";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "./api/customHooks/useFetch";

function App() {
  const navigate = useNavigate();
  const [msgLogin, setMsgLogin] = useState("");
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    console.log(email, password, "<<<");
    try {
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      setMsgLogin(res.data.msg);
      //setRefreshToken(res.data.accessToken);
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
      setRefreshToken("");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const { userAuth, token, expire } = useFetch("http://localhost:3002/token");
  const [refreshToken, setRefreshToken] = useState("");
  console.log(token, "token app");
  console.log(refreshToken, "<<<<<");
  useEffect(() => {
    setRefreshToken(token);
  }, [token, msgLogin]);

  // const navigate = useNavigate();
  // const [userAuth, setUserAuth] = useState(null);
  // const [token, setToken] = useState("");
  // const [expire, setExpire] = useState("");
  // useEffect(() => {
  //   refreshtTokenAuth();
  // }, [token]);

  // const refreshtTokenAuth = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3002/token");
  //     setToken(res.data.accessToken);
  //     const decoded = jwtDecode(res.data.accessToken);
  //     setUserAuth(decoded);
  //     setExpire(decoded.exp);
  //     return {token}
  //   } catch (error) {
  //     if (error.response) navigate("/login");
  //     console.log(error.response);
  //   }
  // };

  // const axiosJWT = axios.create();

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentDate = new Date();
  //     if (expire * 1000 < currentDate.getTime()) {
  //       const res = await axios.get("http://localhost:3002/token");
  //       config.headers.Authorization = `Bearer ${res.data.accessToken}`;
  //       setToken(res.data.accessToken);
  //       const decoded = jwtDecode(res.data.accessToken);
  //       setUserAuth(decoded);
  //       setExpire(decoded.exp);
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  return (
    <>
      <header id="header" className="w-100">
        <NavigationBar
          refreshToken={refreshToken}
          handleLogout={handleLogout}
        />
      </header>
      <main id="main">
        <Outlet
          context={{
            token: refreshToken,
            handleLogin: handleLogin,
            msgLogin: msgLogin,
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
