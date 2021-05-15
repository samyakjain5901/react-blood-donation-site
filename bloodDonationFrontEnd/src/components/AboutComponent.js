import React from "react";
import { Jumbotron, Container, Media, Row } from "reactstrap";

const About = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-5">About Us</h1>
        </Container>
        <hr width="250px" className="header-line" />
      </Jumbotron>
      <div className="row row-content text-center col-md-10">
        <p
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px"
          }}
        >
          Have you at anytime witnessed a relative of yours or a close friend
          searching frantically for a blood donor, when blood banks say out of
          stock, the donors in mind are out of reach and the time keeps ticking?
          Have you witnessed loss of life for the only reason that a donor was
          not available at the most needed hour? Is it something that we as a
          society can do nothing to prevent? This thought laid our foundation.{" "}
          <br />
          Through this website, we seek donors who are willing to donate blood,
          as well as provide the timeliest support to those in frantic need of
          it.
        </p>
      </div>
      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Media className="col-12">
          <Media left middle className="ml-5">
            <Media object src="assets/binoculars.png" alt="Our Vision" />
          </Media>
          <Media body className="mr-5 text-center">
            <Media heading tag="h1">
              Our Vision
            </Media>
            <p className="about-text">
              Bringing Dignity to Life of people by making Quality blood and
              blood products available when needed.{" "}
            </p>{" "}
            <p className="about-text">
              Provide a global platform to celebrate and thank individuals who
              donate blood voluntarily, for altruistic reasons and without any
              monetary reward.{" "}
            </p>
          </Media>
        </Media>
      </Row>
      <hr className="about-line" />
      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Media className="col-12 mt-2">
          <Media body className="ml-5 text-center">
            <Media heading tag="h1">
              Our Goal
            </Media>
            <p className="about-text">
              This website aims at maintaining all the information pertaining to
              blood donors, different blood groups and help receivers manage in
              a better way.
            </p>{" "}
            <p className="about-text">
              To provide transparency in this field, make the process of
              obtaining blood which is hassle-free and corruption-free and make
              the system of blood donating and receiving effective.
            </p>
          </Media>
          <Media right middle>
            <Media object src="assets/target.png" alt="Our Goal" />
          </Media>
        </Media>
      </Row>
      <hr className="about-line" />
      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Media className="col-12 mt-2">
          <Media left middle className="ml-5">
            <Media object src="assets/goal.png" alt="Our Mission" />
          </Media>
          <Media body className="mr-5 text-center">
            <Media heading tag="h1">
              Our Mission
            </Media>
            <p className="about-text">
              To make blood donation 100% voluntary without any replacement
              donor by building individual or institutional alliances.
            </p>{" "}
            <p className="about-text">
              Provide a global platform to celebrate and thank individuals who
              donate blood voluntarily, for altruistic reasons and without any
              monetary reward.
            </p>
          </Media>
        </Media>
      </Row>
      <br />
    </div>
  );
};

export default About;
