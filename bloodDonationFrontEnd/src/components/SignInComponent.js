import React, { useState } from "react";
import {
  Modal,
  FormGroup,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";
import axios from "axios";

export default function SignIn(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });

  function resetModal() {
    setUserInfo({
      email: "",
      password: ""
    });
    props.toggleModalIn();
  }

  function handleSubmitLocal(event) {
    // alert("yo");
    axios("/login", {
      method: "post",
      data: userInfo,
      withCredentials: true
    }).then((response) => {
      alert(response.data);
      if (response.data === "No User Exists") {
        alert("OOPs No such user exists login instead");
      } else {
        resetModal();
        props.getName();
        props.toggleLoggedIn();
      }
    });

    event.preventDefault();
  }
  // console.log(gotAuthenticated);
  function handleSuccessGoogle() {
    window.open("http://localhost:5000/auth/google", "_self");
  }
  function handleSuccessFacebook() {
    window.open("http://localhost:5000/auth/facebook", "_self");
  }
  function handleFailure(res) {
    console.log("failed miserably");
  }
  return (
    <Modal isOpen={props.isModalOpenIn} toggle={props.toggleModalIn}>
      <ModalHeader toggle={resetModal}>Sign In</ModalHeader>
      <ModalBody>
        <Button type="submit" color="danger" onClick={handleSuccessGoogle}>
          Google
        </Button>{" "}
        <Button type="submit" color="primary" onClick={handleSuccessFacebook}>
          Facebook
        </Button>
        {/* <Button color="primary">Facebook</Button> */}
        <Form onSubmit={handleSubmitLocal}>
          <FormGroup>
            <Label htmlFor="email">Email ID</Label>
            <Input
              type="email"
              value={userInfo.email}
              onChange={(event) =>
                setUserInfo((prevValue) => {
                  return {
                    ...prevValue,
                    email: event.target.value
                  };
                })
              }
              id="email"
              name="email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={userInfo.password}
              onChange={(event) =>
                setUserInfo((prevValue) => {
                  return {
                    ...prevValue,
                    password: event.target.value
                  };
                })
              }
              id="password"
              name="password"
            />
          </FormGroup>
          <Button type="submit" value="submit" color="primary">
            Sign In
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}
