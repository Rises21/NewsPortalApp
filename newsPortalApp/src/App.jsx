import NavigationBar from "./components/NavigationBar";
import "./app.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    refreshtTokenAuth();
  }, [token]);

  const refreshtTokenAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3002/token");
      setToken(res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      setUserAuth(decoded);
      //console.log(decoded, "<<<decoded>");
      console.log(token, "the token....");
    } catch (error) {
      if (error.response) navigate("/login");
      console.log(error.response);
    }
  };

  return (
    <>
      <header id="header" className="w-100">
        <NavigationBar userAuth={userAuth} />
      </header>
      <main id="main">
        <Outlet
          context={{
            userAuth: userAuth,
            cbAuth: refreshtTokenAuth,
            token: token,
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
