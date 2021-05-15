import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Button,
  FormFeedback
} from "reactstrap";
import csc from "country-state-city";
import axios from "axios";

class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      bloodgroup: "",
      mobilenum: "",
      mobilenumalt: "",
      state: "",
      city: "",
      willdonate: true,
      recovered: false,
      authorize: false,
      touched: {
        fullname: false,
        mobilenum: false,
        mobilenumalt: false
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  validate(fullname, mobilenum, mobilenumalt) {
    const errors = {
      fullname: "",
      mobilenum: "",
      mobilenumalt: ""
    };

    if (this.state.touched.fullname && fullname.length < 3)
      errors.fullname = "Name should have atleast 3 characters";
    else if (this.state.touched.fullname && fullname.length > 20)
      errors.fullname = "Name should have atmost 20 characters";

    if (this.state.touched.mobilenum && mobilenum.length !== 10)
      errors.mobilenum = "Mobile Number should be of 10 digits";

    if (this.state.touched.mobilenumalt) {
      if (mobilenumalt.length !== 10) {
        errors.mobilenumalt = "Mobile Number should be of 10 digits";
      } else if (mobilenumalt === mobilenum) {
        errors.mobilenumalt = "Mobile numbers should be different";
      }
    }

    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    const donorDetails = {
      name: this.state.fullname,
      bloodGroup: this.state.bloodgroup,
      mobileNumber: this.state.mobilenum,
      alternateMobileNumber: this.state.mobilenumalt,
      state: this.state.state,
      city: this.state.city,
      availability: this.state.willdonate,
      covidPlasma: this.state.recovered === "yes" ? true : false,
      showMobileNumber: this.state.authorize === "yes" ? true : false
    };
    axios.post("/donors/become", donorDetails,{withCredentials:true})
    .then((response) => {
      //responses are handled here
      alert(response.data.message);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const states = csc
      .getStatesOfCountry("IN")
      .map((state) => <option value={state.isoCode}>{state.name}</option>);
    const cities = csc
      .getCitiesOfState("IN", `${this.state.state}`)
      .map((city) => <option value={city.name}>{city.name}</option>);
    const errors = this.validate(
      this.state.fullname,
      this.state.mobilenum,
      this.state.mobilenumalt
    );
    return (
      <div>
        <Modal
          isOpen={this.props.isDonorOpen}
          toggle={this.props.toggleDonorOpen}
        >
          <ModalHeader toggle={this.props.toggleDonorOpen}>
            Donor Registration Form
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event) => {
                this.handleSubmit(event);
              }}
            >
              <FormGroup row>
                <Label htmlFor="fullname" md={6}>
                  Full Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                    value={this.state.fullname}
                    valid={errors.fullname === ""}
                    invalid={errors.fullname !== ""}
                    onBlur={this.handleBlur("fullname")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.fullname}</FormFeedback>
                </Col>
              </FormGroup>
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
                    onChange={this.handleInputChange}
                    value={this.state.bloodgroup}
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
              <h5 dark>Contact Information</h5>
              <FormGroup row>
                <Label htmlFor="mobilenum" md={6}>
                  Mobile Number
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="number"
                    id="mobilenum"
                    name="mobilenum"
                    value={this.state.mobilenum}
                    valid={errors.mobilenum === ""}
                    invalid={errors.mobilenum !== ""}
                    onBlur={this.handleBlur("mobilenum")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.mobilenum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="mobilenumalt" md={6}>
                  Alternate Mobile Number
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="number"
                    id="mobilenumalt"
                    name="mobilenumalt"
                    value={this.state.mobilenumalt}
                    valid={errors.mobilenumalt === ""}
                    invalid={errors.mobilenumalt !== ""}
                    onBlur={this.handleBlur("mobilenumalt")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.mobilenumalt}</FormFeedback>
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
              <FormGroup row>
                <Label htmlFor="willdonate" md={6}>
                  Please confirm your availability to donate blood
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="select"
                    id="willdonate"
                    name="willdonate"
                    value={this.state.willdonate}
                    onChange={this.handleInputChange}
                  >
                    <option>Available</option>
                    <option>Not Available</option>
                  </Input>
                </Col>
              </FormGroup>
              <Row form>
                <p>Are you a Covid-19 recovered warrior?</p>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        required
                        type="radio"
                        value="yes"
                        name="recovered"
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
                        name="recovered"
                        onChange={this.handleInputChange}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <FormGroup check>
                <Label check>
                  <Input
                    required
                    type="radio"
                    name="authorize"
                    value="yes"
                    onChange={this.handleInputChange}
                  />{" "}
                  I authorize this website to display my name, telephone number
                  and other details, so that the needy could contact me, as and
                  when there is an emergency.
                </Label>
              </FormGroup>
              <br />
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="authorize"
                    value="no"
                    onChange={this.handleInputChange}
                  />{" "}
                  I authorize this website to display my name, but not my
                  telephone number and other details, send me the details of the
                  reciever and i will be happy to contact them
                </Label>
              </FormGroup>
              <br />
              <Button type="submit" color="primary" block>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Donor;
