import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import BloodChart from "./BloodComponent";
import Profile from "./ProfileComponent";
import { CAROUSEL } from "../shared/carousel.js";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: CAROUSEL,
      isLoggedIn: false,
      isProfileOpen: false,
    };
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
  }
  componentDidMount() {
    // alert("yo");
    axios.get("/check", { withCredentials: true }).then((response) => {
      if (response.data === "Yes") {
        this.setState({ isLoggedIn: true });
      }
    });
  }
  toggleProfile() {
    this.setState({ isProfileOpen: !this.state.isProfileOpen });
  }

  toggleLoggedIn() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }
  //component
  render() {
    return (
      <div className="mainComponent">
        <Header
          isLoggedIn={this.state.isLoggedIn}
          toggleLoggedIn={this.toggleLoggedIn}
        />
        <Switch>
          <Route
            path="/home"
            component={() => <Home carousel={this.state.carousel} />}
          />
          <Route path="/aboutus" component={About} />
          <Route path="/bloodchart" component={BloodChart} />
          <Route path="/contactus" component={Contact} />
          <Route
            path="/myprofile"
            component={() => (
              <Profile
                isProfileOpen={this.state.isProfileOpen}
                toggleProfile={this.toggleProfile}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
