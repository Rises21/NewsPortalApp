import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const useFetch = (url) => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(null);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const res = await axios.get(url);
      setToken(res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      setUserAuth(decoded);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) navigate("/login");
      console.log(error.response);
    }
  };

  useEffect(() => {
    refreshToken();
    //console.log(token, expire, userAuth);
  }, [url, token]);

  return { userAuth, token, expire };
};
export default useFetch;
