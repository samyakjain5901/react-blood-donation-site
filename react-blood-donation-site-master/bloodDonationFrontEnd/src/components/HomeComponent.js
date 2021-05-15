import React, { Component } from "react";
import {
  UncontrolledCarousel,
  Button,
  ButtonGroup,
  Row,
  Col,
} from "reactstrap";
import HomeData from "./HomeDataComponent";
import Donor from "./DonorComponent";
import Find from "./FindComponent";
import Request from "./RequestComponent";
import RequestList from "./RequestListComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDonorOpen: false,
      isFindOpen: false,
      isReqOpen: false,
    };
    this.toggleDonorOpen = this.toggleDonorOpen.bind(this);
    this.toggleReqOpen = this.toggleReqOpen.bind(this);
    this.toggleFindOpen = this.toggleFindOpen.bind(this);
  }

  toggleDonorOpen() {
    this.setState({ isDonorOpen: !this.state.isDonorOpen });
  }

  toggleReqOpen() {
    this.setState({ isReqOpen: !this.state.isReqOpen });
  }

  toggleFindOpen() {
    this.setState({ isFindOpen: !this.state.isFindOpen });
  }

  render() {
    return (
      <React.Fragment>
        <UncontrolledCarousel items={this.props.carousel} mt={50} /> <br />
        <Row>
          <Col md={{ size: 3, offset: 1 }}>
            <ButtonGroup vertical>
              <Button color="warning" size="lg" onClick={this.toggleDonorOpen}>
                Become a donor
              </Button>
              <br />
              <Button color="warning" size="lg" onClick={this.toggleFindOpen}>
                Find a Donor
              </Button>{" "}
              <br />
              <Button color="warning" size="lg" onClick={this.toggleReqOpen}>
                Request for Blood
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={6} className="home-table">
            <RequestList />
          </Col>
        </Row>
        <br />
        <HomeData />
        <Donor
          isDonorOpen={this.state.isDonorOpen}
          toggleDonorOpen={this.toggleDonorOpen}
        />
        <Find
          isFindOpen={this.state.isFindOpen}
          toggleFindOpen={this.toggleFindOpen}
        />
        <Request
          isReqOpen={this.state.isReqOpen}
          toggleReqOpen={this.toggleReqOpen}
        />
      </React.Fragment>
    );
  }
}

export default Home;
