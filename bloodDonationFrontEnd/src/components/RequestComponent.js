import React, { Component } from "react";
import RequestList from "./RequestListComponent";
import axios from "axios";
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
  FormText,
  FormFeedback
} from "reactstrap";
import csc from "country-state-city";
var reqData;

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      city: "",
      brcode: "",
      fullname: "",
      bloodgroup: "",
      age: "",
      date: "",
      units: "",
      mobilenum: "",
      mobilenumalt: "",
      hospname: "",
      hosplocation: "",
      patientaddress: "",
      purpose: "",
      recovered: false,
      touched: {
        fullname: false,
        mobilenum: false,
        mobilenumalt: false,
        patientaddress: false,
        purpose: false
      },
      isListOpen: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleListOpen = this.toggleListOpen.bind(this);
    this.postBloodReq = this.postBloodReq.bind(this);
    this.handleBrCode = this.handleBrCode.bind(this);
  }

  handleBrCode() {
    const BloodReqCode = {
      code: this.state.brcode
    };
    axios
      .post("/bloodrequest/getbycode", BloodReqCode, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data.request)
          this.setState({
            state: response.data.request.state,
            city: response.data.request.city,
            brcode: response.data.request.code,
            fullname: response.data.request.name,
            bloodgroup: response.data.request.bloodGroup,
            age: response.data.request.age,
            // date: response.data.request.,
            // units: response.data.request.,
            mobilenum: response.data.request.mobileNumber,
            mobilenumalt: response.data.request.alternateMobileNumber,
            hospname: response.data.hospitalName,
            // hosplocation: response.data.request.,
            patientaddress: response.data.request.patientAdress,
            purpose: response.data.request.purpose
            // recovered:response.data.request.,
          });
        else {
          alert("OOPs No such request could be found sorry");
        }
      });
  }

  postBloodReq() {
    const bloodReq = {
      name: this.state.fullname,
      age: this.state.age,
      bloodGroup: this.state.bloodgroup,
      mobileNumber: this.state.mobilenum,
      alternateMobileNumber: this.state.mobilenumalt,
      state: this.state.state,
      city: this.state.city,
      requirementDate: this.state.date,
      unitsNeeded: this.state.units,
      hospitalName: this.state.hospname,
      patientAdress: this.state.patientaddress,
      purpose: this.state.purpose,
      covidPlasma: this.state.recovered === "yes" ? true : false
    };
    axios
      .post("/bloodrequest/new", bloodReq, { withCredentials: true })
      .then((response) => {
        //handle the response here properly and adequately
        alert(response.data.message);
      });
  }

  toggleListOpen() {
    this.setState({ isListOpen: !this.state.isListOpen });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target === "radio" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  validate(fullname, mobilenum, mobilenumalt, patientaddress, purpose) {
    const errors = {
      fullname: "",
      mobilenum: "",
      mobilenumalt: "",
      patientaddress: "",
      purpose: ""
    };

    if (this.state.touched.fullname && fullname.length < 3)
      errors.fullname = "Name should be >= 3 characters";
    else if (this.state.touched.fullname && fullname.length > 20)
      errors.fullname = "Name should be <= 20 characters";

    if (this.state.touched.mobilenum && mobilenum.length !== 10)
      errors.mobilenum = "Mobile Number should be of 10 digits";

    if (this.state.touched.mobilenumalt) {
      if (mobilenumalt.length !== 10) {
        errors.mobilenumalt = "Mobile Number should be of 10 digits";
      } else if (mobilenumalt === mobilenum) {
        errors.mobilenumalt = "Mobile numbers should be different";
      }
    }

    if (this.state.touched.patientaddress && patientaddress.length < 15)
      errors.patientaddress = "Address should be atleast 15 characters long";

    if (this.state.touched.purpose && purpose.length < 15)
      errors.purpose = "Purpose of need should be atleast 15 characters long";

    return errors;
  }

  // function sendBloodRequest(){
  //   const data;
  // axios.post("http://localhost:3000/bloodrequest/new",data)
  // .then(response=>{
  // //analyse the response and do things accordingly
  // })
  // }

  render() {
    const states = csc
      .getStatesOfCountry("IN")
      .map((state) => <option value={state.isoCode}>{state.name}</option>);
    const cities = csc
      .getCitiesOfState("IN", `${this.state.state}`)
      .map((city) => <option>{city.name}</option>);
    const errors = this.validate(
      this.state.fullname,
      this.state.mobilenum,
      this.state.mobilenumalt,
      this.state.patientaddress,
      this.state.purpose
    );
    return (
      <>
        <Modal isOpen={this.props.isReqOpen} toggle={this.props.toggleReqOpen}>
          <ModalHeader toggle={this.props.toggleReqOpen}>
            Blood Request Form
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                this.handleBrCode();
              }}
            >
              <FormText color="primary">
                <strong>
                  If you had previously posted your blood request and now want
                  to update your blood request then please enter previous
                  request code and press submit.
                </strong>
              </FormText>
              <br />
              <FormGroup row>
                <Label htmlFor="brcode" md={5}>
                  Blood Request Code :
                </Label>
                <Col md={5}>
                  <Input
                    required
                    type="text"
                    id="brcode"
                    name="brcode"
                    value={this.state.brcode}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Button color="info" size="sm">
                  Submit
                </Button>
              </FormGroup>
            </Form>
            <hr />
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                this.props.toggleReqOpen();
                this.toggleListOpen();
                this.postBloodReq();
              }}
            >
              <FormGroup row>
                <Label htmlFor="fullname" md={6}>
                  Patient Full Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="fullname"
                    name="fullname"
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
                  Patient Blood Group :
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
              <FormGroup row>
                <Label htmlFor="age" md={6}>
                  Patient Age :
                </Label>
                <Col md={3}>
                  <Input
                    required
                    type="number"
                    id="age"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="date" md={6}>
                  When do you need Blood?
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="date"
                    id="date"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="units" md={6}>
                  How many units do you need?
                </Label>
                <Col md={3}>
                  <Input
                    required
                    type="number"
                    id="units"
                    name="units"
                    value={this.state.units}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="mobilenum" md={6}>
                  Mobile Number :
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
                  Alternate Mobile Number :
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
              <FormGroup row>
                <Label htmlFor="hospname" md={6}>
                  Hospital Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="hospname"
                    name="hospname"
                    value={this.state.hospname}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="hosplocation" md={6}>
                  Location :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="hosplocation"
                    name="hosplocation"
                    value={this.state.hosplocation}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="patientaddress" md={6}>
                  Patient Address :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="textarea"
                    rows="4"
                    id="patientaddress"
                    name="patientaddress"
                    value={this.state.patientaddress}
                    valid={errors.patientaddress === ""}
                    invalid={errors.patientaddress !== ""}
                    onBlur={this.handleBlur("patientaddress")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.patientaddress}</FormFeedback>
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
                <Label htmlFor="purpose" md={6}>
                  Purpose :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="textarea"
                    rows="4"
                    id="purpose"
                    name="purpose"
                    value={this.state.purpose}
                    valid={errors.purpose === ""}
                    invalid={errors.purpose !== ""}
                    onBlur={this.handleBlur("purpose")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.purpose}</FormFeedback>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={8}>
                  <p>Do you need Covid recovered person's plasma?</p>
                </Col>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        required
                        type="radio"
                        name="recovered"
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
                        name="recovered"
                        value="no"
                        onChange={this.handleInputChange}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" color="primary" block>
                Post Blood Request
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <RequestList
          isListOpen={this.state.isListOpen}
          toggleListOpen={this.toggleListOpen}
          requestData={reqData}
        />
      </>
    );
  }
}

export default Request;
