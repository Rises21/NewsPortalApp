import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import gmailLogo from "../assets/gmailLogo.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import { useState } from "react";

const RegisterPage = ({ auth }) => {
  //dont foreget to add params authed later !!!
  console.log(auth);

  const [lookPwd, setLookPwd] = useState("password");
  const handleLookPwd = () => {
    lookPwd === "password" ? setLookPwd("text") : setLookPwd("password");
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
              <h3 className="tittleHeader__login">Register</h3>
            </div>
            <Form className="loginForm">
              <Form.Group className="m-3 containerInput__user">
                {/* <Form.Label htmlFor="inputPassword5">Email</Form.Label> */}
                <Form.Control
                  type="text"
                  id="inputName"
                  className="inputForm__login"
                  placeholder="Username"
                  aria-describedby="usernameField"
                />
                <span className="container__icon">
                  <img src={gmailLogo} alt="gmail icon" />
                </span>
              </Form.Group>
              <Form.Group className="m-3 containerInput__user">
                {/* <Form.Label htmlFor="inputPassword5">Email</Form.Label> */}
                <Form.Control
                  type="email"
                  id="inputEmail"
                  className="inputForm__login"
                  placeholder="Email"
                  aria-describedby="emailField"
                />
                <span className="container__icon">
                  <img src={gmailLogo} alt="gmail icon" />
                </span>
              </Form.Group>
              <Form.Group className="m-3 containerInput__user">
                {/* <Form.Label htmlFor="inputPassword">Password</Form.Label> */}
                <Form.Control
                  type={lookPwd}
                  id="inputPassword"
                  className="inputForm__login"
                  placeholder="Password"
                  aria-describedby="passwordField"
                />
                <span className="container__icon" onClick={handleLookPwd}>
                  {lookPwd === "password" ? (
                    <img src={passwordIcon} alt="password icon" />
                  ) : (
                    <img src={gmailLogo} alt="gmail icon" />
                  )}
                </span>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="px-5 py-2 mt-2 mb-4"
              >
                Create Account
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterPage;
