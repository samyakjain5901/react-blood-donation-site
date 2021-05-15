import React from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Media,
} from "reactstrap";

const HomeData = (props) => {
  return (
    <div>
      <Row>
        <Col sm="6">
          <Card>
            <CardImg top src="/assets/eligible.jpg" alt="eligible" />
            <CardBody>
              <CardTitle tag="h3">Am I Eligible to donate ?</CardTitle>
              <CardText>
                A healthy individual can donate blood once every month. To
                ensure the safety of both patients and donors, these are some of
                the requirements donors must meet to be eligible to donate blood
                based on their donation type. Learn more about general health,
                travel, medications, tattoos and about the eligibility
                requirements to donate blood by clicking below.
              </CardText>
              <Button color="info">
                View details <span className="fa fa-angle-double-right"></span>
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardBody>
              <CardImg
                top
                src="/assets/rbc.jpg"
                alt="rbc"
                style={{ marginBottom: 25 }}
              />
              <CardTitle tag="h3">Never donated blood before ?</CardTitle>
              <CardText>
                Blood Donation is a COMPLETELY SAFE healthy activity with no
                side-effects whatsoever and it leads to a more fulfilling life.
                Each year, approximately 15 million people require blood. Even
                more blood is required as we go through this pandemic. Every
                day, blood donations help patients of all ages: accident and
                burn victims, heart surgery and organ transplant patients.
              </CardText>
              <Button color="info">
                View details <span className="fa fa-angle-double-right"></span>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>{" "}
      <br />
      <Row>
        <Media className="col-12 mt-2">
          <Media body className="ml-5 col-md-8">
            <Media heading tag="h2">
              Our Mission <span className="text-muted">Saving Lives </span>
            </Media>
            <p>
              Blood Donation is a natural process that enables individuals to
              help others. The first and foremost advantage of donating blood is
              the exalted feeling of saving someone's life by such blood
              donation can save lives. According to a report by the Mental
              Health Foundation, donating blood reduces stress, improves your
              emotional well-being, benefits your physical health and helps in
              getting rid of negative feelings.
            </p>
          </Media>
          <Media right middle className="col-md-4">
            <Media object src="assets/heart.jpg" alt="heart" />
          </Media>
        </Media>
      </Row>
      <hr />
      <Row>
        <Media className="col-12 mt-2">
          <Media left middle className="ml-5 col-md-4">
            <Media object src="assets/drop.png" alt="drops" />
          </Media>
          <Media body className="col-md-8">
            <Media heading tag="h2">
              Convenient and Hassle free process{" "}
              <span className="text-muted">
                For donors as well as receivers .
              </span>
            </Media>
            <p>
              We aim to make the best use of contemporary technologies in
              delivering a promising web portal to bring together blood donors
              to fulfill all the requests in our country. Join us make a
              difference in someone's life and turn strangers into friends. Each
              drop of blood counts. We all come together as a team to help you
              achieve that.
            </p>
          </Media>
        </Media>
      </Row>{" "}
      <br />
    </div>
  );
};

export default HomeData;
