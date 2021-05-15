import React, { Component } from "react";
import { Card, CardText, CardBody } from "reactstrap";

class BloodChart extends Component {
  render() {
    return (
      <div
        class="container-fluid"
        style={{ backgroundImage: "url(assets/bloodBg.jpg)" }}
      >
        <div className="row">
          <div className="m-auto col-md-8">
            <Card style={{ backgroundColor: "white" }}>
              <img
                width="100%"
                src="/assets/bloodChart.jpg"
                alt="Blood Chart"
              />
              <CardBody>
                <CardText style={{ color: "orangered" }}>
                  <strong>
                    Donors with type O- blood are universal red cell donors
                    whose donations can be given to people of all blood types.
                    Donors with types AB- and AB+ blood are universal plasma
                    donors, while patients with type AB+ are universal red cell
                    recipients because they can receive red cells from all
                    types.
                  </strong>
                </CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default BloodChart;
