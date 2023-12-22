import { Row, Col, Form, Button } from "react-bootstrap";
import gmailLogo from "../assets/gmailLogo.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/register");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password, "<<<");
    try {
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      setMsg(res.data.msg);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error) {
      if (error.response) return setMsg(error.response.data.msg);
    }
  };

  return (
    <div className="forBg__wrapper">
      <div className="login__bg">
        <Row className="justify-content-center loginForm__container">
          <Col
            sm={{ span: 12, offset: 0 }}
            className="text-center centeringForm"
          >
            <div className="tittleHeader__container">
              <h3 className="tittleHeader__login">Login</h3>
            </div>
            <Form className="loginForm" onSubmit={handleLogin}>
              <p
                className={
                  msg === "Login Success."
                    ? "text-success fw-bold"
                    : "text-danger fw-bold"
                }
              >
                {msg}
              </p>
              <Form.Group className="m-3 containerInput__user">
                {/* <Form.Label htmlFor="inputPassword5">Email</Form.Label> */}
                <Form.Control
                  type="email"
                  id="inputEmail"
                  className="inputForm__login"
                  placeholder="Email"
                  aria-describedby="emailField"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="container__icon">
                  <img src={gmailLogo} alt="gmail icon" />
                </span>
              </Form.Group>
              <Form.Group className="m-3 containerInput__user">
                {/* <Form.Label htmlFor="inputPassword">Password</Form.Label> */}
                <Form.Control
                  type="password"
                  id="inputPassword"
                  className="inputForm__login"
                  placeholder="Password"
                  aria-describedby="passwordField"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="container__icon">
                  <img src={passwordIcon} alt="password icon" />
                </span>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="px-5 py-2 mt-2"
              >
                Login
              </Button>
            </Form>
            <div className="my-2">
              <span className="dividerButton__login p-2">Or</span>
            </div>
            <Button
              variant="outline-primary"
              type="submit"
              className="mb-4 px-4"
              onClick={handleClick}
            >
              Create Account
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
