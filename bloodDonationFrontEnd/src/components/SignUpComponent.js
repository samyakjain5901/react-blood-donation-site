import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  FormGroup,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  Col,
  Row
} from "reactstrap";

function SignUp(props) {
  const [emailid, setEmail] = useState("");
  const [GottenOtp, setGottenOtp] = useState(0);
  const [writtenOtp, setOtp] = useState("");
  const [verfiedOtp, setVerifiedOtp] = useState(false);
  const [passwords, setpassword] = useState({
    password: "",
    confirmPassword: ""
  });
  const [passwordMatches, setpasswordMatches] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showVerifyBtn, setShowVerifyBtton] = useState(true);
  const [otpMssg, setOtpMssg] = useState("X");
  // const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (
      passwords.password !== "" &&
      passwords.password === passwords.confirmPassword
    ) {
      // alert("yeahh!");
      setpasswordMatches(true);
    } else if (passwords.password !== passwords.confirmPassword) {
      setpasswordMatches(false);
    }
  }, [passwords]);
  useEffect(() => {
    resetModal();
    setEmail("");
  }, [props.isLoggedIn]);
  function handleEmailChange(event) {
    if (!verfiedOtp) setEmail(event.target.value);
    else {
      const result = window.confirm(
        "Are you sure you want to change your mail,  doing so will  need reverfication"
      );
      if (result) {
        setGottenOtp(0);
        setOtp("");
        setVerifiedOtp(false);
        setpassword({
          password: "",
          confirmPassword: "",
          match: false
        });
        setShowOtp(false);
        setOtpMssg("X");
        setShowVerifyBtton(true);
        setEmail(event.target.value);
      } else {
        setEmail((prev) => prev);
      }
    }
  }
  function VerifyEmail(event) {
    // const obj = {
    //   email: emailid
    // };
    // console.log(obj);
    axios
      .post("/verify/email", {
        email: emailid
      })
      .then((res) => {
        setGottenOtp(res.data);
        setShowOtp(true);
        // alert(GottenOtp);
      });
    event.preventDefault();
  }
  useEffect(() => {
    // if (GottenOtp !== 0) alert(GottenOtp, writtenOtp);
    if (GottenOtp !== 0 && writtenOtp == GottenOtp) {
      // alert("yeahh");
      setOtpMssg("ok");
      setTimeout(() => {
        setVerifiedOtp(true);
        setShowOtp(false);
        setShowVerifyBtton(false);
      }, 3000);
    }
  }, [writtenOtp]);
  function resetModal() {
    if (props.isModalOpenUp) props.toggleModalUp();
    setGottenOtp(0);
    setOtp("");
    setVerifiedOtp(false);
    setpassword({
      password: "",
      confirmPassword: "",
      match: false
    });
    setShowOtp(false);
    setOtpMssg("X");
    setShowVerifyBtton(true);
  }
  function handleSuccessGoogle() {
    window.open("http://localhost:5000/auth/google", "_self");
  }
  function handleSuccessFacebook() {
    window.open("http://localhost:5000/auth/facebook", "_self");
  }
  function handleSubmitLocal(event) {
    props.toggleModalUp();
    const userInfo = {
      email: emailid,
      password: passwords.password
    };
    axios
      .post("/register", userInfo, { withCredentials: true })
      .then((response) => {
        if (
          response.data === "A user with this id already exists Login Instead"
        ) {
          alert(
            "A user with the following email id already exists Log in instead"
          );
          resetModal();
        } else if (response.data === "error") {
          alert("OOPs there was an error.Plz try again!");
          resetModal();
        } else {
          props.getName();
          props.toggleLoggedIn();
        }
      });
    // props.toggleLoggedIn();
    event.preventDefault();
  }
  return (
    <Modal isOpen={props.isModalOpenUp} toggle={resetModal}>
      <ModalHeader toggle={resetModal}>Sign Up</ModalHeader>
      <ModalBody>
        <Form onSubmit={VerifyEmail}>
          <Button color="danger" onClick={handleSuccessGoogle}>
            Google
          </Button>{" "}
          <Button
            color="primary"
            onClick={handleSuccessFacebook}
          >
            Facebook
          </Button>
          <FormGroup>
            <Label htmlFor="email">Email ID</Label>
            <Row>
              <Col md={8}>
                <Input
                  type="email"
                  value={emailid}
                  onChange={handleEmailChange}
                  id="email"
                  name="email"
                />
              </Col>
              <Col md={4}>
                {showVerifyBtn ? (
                  <Button size="sm" color="primary" type="submit">
                    Verify Email
                  </Button>
                ) : (
                  <Button size="sm" color="primary">
                    Verified
                  </Button>
                )}
              </Col>
            </Row>
          </FormGroup>
          <FormGroup row>
            {showOtp && (
              <>
                <Col md={{ size: 5 }}>
                  <Input
                    type="password"
                    id="otp"
                    name="otp"
                    value={writtenOtp}
                    placeholder="Enter OTP"
                    onChange={(event) => {
                      setOtp(event.target.value);
                      // alert(writtenOtp.toString().length);
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    size="sm"
                    color={otpMssg === "ok" ? "success" : "danger"}
                  >
                    {otpMssg}
                  </Button>
                </Col>
              </>
            )}
          </FormGroup>
        </Form>
        <Form onSubmit={handleSubmitLocal}>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={passwords.password}
              id="password"
              name="password"
              onChange={(event) => {
                setpassword((prev) => {
                  return {
                    ...prev,
                    password: event.target.value
                  };
                });
              }}
            />
            {passwords.password.length > 0 && passwords.password.length < 6 ? (
              <Label>password should be altleast 6 characters</Label>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={passwords.confirmPassword}
              onChange={(event) => {
                setpassword((prev) => {
                  return {
                    ...prev,
                    confirmPassword: event.target.value
                  };
                });
              }}
            />
            {passwords.confirmPassword !== "" &&
              (passwordMatches ? (
                <Label>passwords matches</Label>
              ) : (
                <Label>passwords don't match</Label>
              ))}
          </FormGroup>
          {verfiedOtp && passwordMatches && passwords.password.length > 5 ? (
            <Button type="submit" value="submit" color="primary">
              Sign Up
            </Button>
          ) : (
            <Button type="submit" value="submit" disabled={true}>
              Sign Up
            </Button>
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default SignUp;
