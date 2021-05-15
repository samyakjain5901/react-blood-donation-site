import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import SignIn from "./SignInComponent";
import SignUp from "./SignUpComponent";
import axios from "axios";
import { AnimationWrapper } from "react-hover-animation";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpenIn: false,
      isModalOpenUp: false,
      name: "",
      picUrl: "",
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModalIn = this.toggleModalIn.bind(this);
    this.toggleModalUp = this.toggleModalUp.bind(this);
    this.handleNav = this.handleNav.bind(this);
    // this.setName = this.setName.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      console.log("called");
      this.getName();
    }
  }

  componentDidMount() {
    document.querySelector(".navbar").style.backgroundImage =
      "url(assets/bloodBg.jpg)";
  }

  navbarHandler() {
    document.querySelector(".navbar").classList.remove("fixed-top");
    document.querySelector(".navbar").classList.add("sticky-top");
    document.querySelector(".navbar").style.backgroundImage =
      "url(assets/Blood.jpg)";
  }

  handleNav() {
    if (this.state.isNavOpen) this.toggleNav();
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModalIn() {
    this.setState({ isModalOpenIn: !this.state.isModalOpenIn });
  }

  toggleModalUp() {
    this.setState({ isModalOpenUp: !this.state.isModalOpenUp });
  }
  logMeOut(logeedIntoggle) {
    axios.get("/logout", { withCredentials: true }).then((response) => {
      alert(response.data);
      logeedIntoggle();
    });
  }

  getName() {
    axios.get("/picurl", { withCredentials: true }).then((response) => {
      if (response.data === "No") {
        axios.get("/getname", { withCredentials: true }).then((response) => {
          console.log("this");
          console.log(this);
          this.setState({ name: response.data });
        });
      } else {
        this.setState({ picUrl: response.data });
      }
    });
  }

  render() {
    // const BRAND_STYLES={
    //   backgroundImage :"url('assets/blood.png')",
    // }
    // if (this.props.isLoggedIn) {
    //   this.getName();
    // }
    return (
      <React.Fragment>
        <Navbar dark expand="md" sticky="top">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/bloodDrop.png"
                height="50"
                width="30"
                alt="blood_donation"
              />
              Blood<span style={{ color: "white" }}>For</span>You
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <AnimationWrapper
                    style={{
                      borderRadius: "60px",
                      backgroundColor: "#cca300",
                    }}
                  >
                    <NavLink
                      className="nav-link"
                      to="/home"
                      style={{
                        fontWeight: "bold",
                        color: "#EDF5E1",
                      }}
                      onClick={this.handleNav}
                    >
                      <span className="fa fa-home fa-lg"></span> Home
                    </NavLink>
                  </AnimationWrapper>
                </NavItem>
                <NavItem>
                  <AnimationWrapper
                    style={{
                      borderRadius: "60px",
                      backgroundColor: "#00802b",
                    }}
                  >
                    <NavLink
                      className="nav-link"
                      to="/aboutus"
                      style={{
                        fontWeight: "bold",
                        color: "#EDF5E1",
                      }}
                      onClick={this.handleNav}
                    >
                      <span className="fa fa-info fa-lg"></span> About Us
                    </NavLink>
                  </AnimationWrapper>
                </NavItem>
                <NavItem>
                  <AnimationWrapper
                    style={{
                      borderRadius: "60px",
                      backgroundColor: "orangered",
                    }}
                  >
                    <NavLink
                      className="nav-link"
                      to="/bloodchart"
                      style={{ fontWeight: "bold", color: "#EDF5E1" }}
                      onClick={this.handleNav}
                    >
                      <span className="fa fa-bar-chart fa-lg"></span> Blood
                      Chart
                    </NavLink>
                  </AnimationWrapper>
                </NavItem>
                {"  "}
                <NavItem>
                  <AnimationWrapper
                    style={{
                      borderRadius: "60px",
                      backgroundColor: "#800080",
                    }}
                  >
                    <NavLink
                      className="nav-link"
                      to="/contactus"
                      style={{ fontWeight: "bold", color: "#EDF5E1" }}
                      onClick={this.handleNav}
                    >
                      <span className="fa fa-address-card fa-lg"></span> Contact
                      Us
                    </NavLink>
                  </AnimationWrapper>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.isLoggedIn ? (
                    <>
                      <Button color="primary" onClick={this.toggleModalIn}>
                        <span className="fa fa-sign-in fa-lg"></span> Sign In
                      </Button>{" "}
                      <Button color="primary" onClick={this.toggleModalUp}>
                        <span className="fa fa-sign-up fa-lg"></span> Sign Up
                      </Button>{" "}
                    </>
                  ) : (
                    <UncontrolledButtonDropdown>
                      {this.state.picUrl === "" ? (
                        <DropdownToggle
                          style={{
                            backgroundColor: "#b30000",
                            borderRadius: "30px",
                          }}
                          size="lg"
                        >
                          <strong>
                            {this.state.name.charAt(0).toUpperCase()}
                          </strong>
                        </DropdownToggle>
                      ) : (
                        <DropdownToggle
                          className="imageOfPerson"
                          style={{
                            padding: "0px",
                            height: "40px",
                            width: "55px",
                            borderRadius: "100%",
                          }}
                        >
                          <img
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              borderRadius: "100%",
                              objectFit: "contain",
                            }}
                            src={this.state.picUrl}
                            alt="img"
                          />
                        </DropdownToggle>
                      )}
                      <DropdownMenu>
                        <NavLink style={{ color: "black" }} to="/myprofile">
                          <DropdownItem>
                            <span className="fa fa-user-circle"></span> My
                            Profile
                          </DropdownItem>
                        </NavLink>
                        <DropdownItem
                          onClick={() => {
                            this.logMeOut(this.props.toggleLoggedIn);
                          }}
                        >
                          <span className="fa fa-sign-out"></span> Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        {/* <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Blood Donation</h1>
                <p></p>
              </div>
            </div>
          </div>
        </Jumbotron> */}

        <SignIn
          isModalOpenIn={this.state.isModalOpenIn}
          toggleModalIn={this.toggleModalIn}
          isLoggedIn={this.props.isLoggedIn}
          toggleLoggedIn={this.props.toggleLoggedIn}
          getName={() => {
            this.getName();
          }}
        />
        <SignUp
          isModalOpenUp={this.state.isModalOpenUp}
          toggleModalUp={this.toggleModalUp}
          isLoggedIn={this.props.isLoggedIn}
          toggleLoggedIn={this.props.toggleLoggedIn}
          getName={() => {
            this.getName();
          }}
        />
      </React.Fragment>
    );
  }
}

export default Header;
