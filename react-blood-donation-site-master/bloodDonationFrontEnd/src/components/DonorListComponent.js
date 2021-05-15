import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

function DonorData({ donorData }) {
  if (donorData != null) {
    const tabledata = donorData.map((donor, key) => {
      return (
        <tr>
          <th>{key + 1}.</th>
          <td>{donor.name}</td>
          <td>{donor.bloodGroup}</td>
          <td>{donor.mobileNum}</td>
          <td>{donor.email}</td>
        </tr>
      );
    });
    return <tbody>{tabledata}</tbody>;
  } else {
    return <tbody></tbody>;
  }
}

function DonorList(props) {
  return (
    <div>
      <Modal isOpen={props.isListOpen} toggle={props.toggleListOpen}>
        <ModalHeader toggle={props.toggleListOpen}>
          Current Donor's List
        </ModalHeader>
        <ModalBody>
          <Table striped>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Full Name</th>
                <th>Blood Group</th>
                <th>Mobile Number</th>
                <th>Email Id</th>
              </tr>
            </thead>
            <DonorData donorData={props.donorData} />
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DonorList;
