import axios from "axios";
// import { use } from "passport";
import React, { Component } from "react";
import { Table } from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqs: [],
    };
    this.deleThisReq = this.deleThisReq.bind(this);
  }
  componentDidMount() {
    const x = true;
    if (x)
      axios
        .get("/bloodrequest/showexistingrequests", { withCredentials: true })
        .then((response) => {
          //handle the response adequately here
          this.setState({ reqs: [...response.data.List] });
          // console.log(this.state.reqs);
        });
  }
  deleThisReq(code) {
    const obj = { code: code };
    axios.post("/bloodrequest/deletebycode", obj).then((response) => {
      alert(response.data.message);
      axios
        .get("/bloodrequest/showexistingrequests", { withCredentials: true })
        .then((response) => {
          this.setState({ reqs: [...response.data.List] });
        });
    });
  }
  render() {
    return (
      <div>
        <h4>My Profile</h4>
        {/* userdata */}
        <Table striped>
          <thead>
            <tr>
              <th>Req.No.</th>
              <th>Blood Request Code</th>
              <th>Patient Name</th>
              <th>Blood Group</th>
              <th>Date of Request</th>
              <th>Date When Required</th>
              <th>Units of Blood</th> //Changes are made
            </tr>
          </thead>
          {this.state.reqs &&
            this.state.reqs.map((data, key) => {
              console.log(data, key);
              return (
                <tr>
                  <th scope="row">{key + 1}</th>
                  <td>{data.code}</td>
                  <td>{data.requirementDate}</td>
                  <td>{1}</td>
                  <td>{data.unitsNeeded}</td>
                  <td>
                    {data.state}, {data.city}
                  </td>
                  <td
                    onClick={() => {
                      this.deleThisReq(data.code);
                    }}
                  >
                    <span className="fa fa-trash-alt"></span>
                  </td>
                </tr>
              );
            })}
        </Table>
      </div>
    );
  }
}

export default Profile;

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   secret: [String],
//   googleId: String,
//   facebookId: String,
// });
// const donorSchema = new mongoose.Schema({
//   userDetails:userSchema,
//  name:String,
//   bloodGroup:String,
//   mobileNumber:Number,
//   alternateMobileNumber:Number,
//   state:String,
//   city:String,
//   availability:Boolean,
//   covidPlasma:Boolean,
//   showMobileNumber:Boolean,
// });
// const bloodRequestSchema=new mongoose.Schema({
//   userDetails:userSchema,
//   code:Number,
//   name:String,
//   age:Number,
//   bloodGroup:String,
//   mobileNumber:Number,
//   alternateMobileNumber:Number,
//   state:String,
//   city:String,
//   requirementDate:Date,
//   unitsNeeded:Number,
//   hospitalName:String,
//   patientAdress:String,
//   purpose:String,
//   covidPlasma:Boolean,
// })
