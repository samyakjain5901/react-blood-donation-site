import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

function RequestData({ requestData }) {
  if (requestData != null) {
    const tabledata = requestData.map((request) => {
      return (
        <tr>
          <th scope="row">{request.key}</th>
          <td>{request.fullname}</td>
          <td>{request.bloodgroup}</td>
          <td>{request.statecity}</td>
          <td>{request.isCovidPlasmaDonor ? "YES" : "NO"}</td>
        </tr>
      );
    });
    return <tbody>{tabledata}</tbody>;
  } else {
    return <tbody></tbody>;
  }
}

function RequestList(props) {
  return (
    <div>
      <Modal isOpen={props.isListOpen} toggle={props.toggleListOpen}>
        <ModalHeader toggle={props.toggleListOpen}>
          Current Requests
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th scope="row">S.No.</th>
                <th>Full Name</th>
                <th>Blood Group</th>
                <th>City, State</th>
                <th>Covid Plasma Donor</th>
              </tr>
            </thead>
            <RequestData requestData={props.requestData} />
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RequestList;
