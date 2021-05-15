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
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
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
