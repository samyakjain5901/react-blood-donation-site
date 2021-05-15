import React, { Component } from "react";
import DonorList from "./DonorListComponent";
import csc from "country-state-city";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
var users;

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      city: "",
      bloodgroup: "",
      coviddonor: false,
      isListOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleListOpen = this.toggleListOpen.bind(this);
    this.findDonor = this.findDonor.bind(this);
  }

  findDonor() {
    const queryDetails = {
      bloodGroup: this.state.bloodgroup,
      state: this.state.state,
      city: this.state.city,
      covidPlasma: this.state.coviddonor === "yes" ? true : false,
    };
    // console.log(queryDetails);

    axios
      .post("/donors/find", queryDetails, { withCredentials: true })
      .then((response) => {
        //handle the response here adequately
        //it also contains the array with the list(response.List)
        users = response.data.List;
        this.toggleListOpen();
        console.log(users);
      });
  }

  toggleListOpen() {
    // event.preventDefault();
    this.props.toggleFindOpen();
    this.setState({ isListOpen: !this.state.isListOpen });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const states = csc
      .getStatesOfCountry("IN")
      .map((state) => <option value={state.isoCode}>{state.name}</option>);
    const cities = csc
      .getCitiesOfState("IN", `${this.state.state}`)
      .map((city) => <option value={city.name}>{city.name}</option>);
    return (
      <>
        <Modal
          isOpen={this.props.isFindOpen}
          toggle={this.props.toggleFindOpen}
        >
          <ModalHeader toggle={this.props.toggleFindOpen}>
            Search for Blood Donor
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                this.findDonor();
              }}
            >
              <FormGroup row>
                <Label htmlFor="bloodgroup" md={6}>
                  Blood Group :
                </Label>
                <Col md={4}>
                  <Input
                    required
                    type="select"
                    id="bloodgroup"
                    name="bloodgroup"
                    value={this.state.bloodgroup}
                    onChange={this.handleInputChange}
                  >
                    <option></option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </Input>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="state">State</Label>
                    <Input
                      required
                      type="select"
                      id="state"
                      name="state"
                      value={this.state.state}
                      onChange={this.handleInputChange}
                    >
                      <option></option>
                      {states}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="city">City</Label>
                    <Input
                      required
                      type="select"
                      id="city"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                    >
                      <option></option>
                      {cities}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <p>Covid-19 Plasma Donor?</p>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        required
                        type="radio"
                        name="coviddonor"
                        value="yes"
                        onChange={this.handleInputChange}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        value="no"
                        name="coviddonor"
                        onChange={this.handleInputChange}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" color="primary" block>
                Find Donor
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <DonorList
          isListOpen={this.state.isListOpen}
          toggleListOpen={this.toggleListOpen}
          donorData={users}
        />
      </>
    );
  }
}

export default Find;
