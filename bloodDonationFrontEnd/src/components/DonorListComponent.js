import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

function DonorData({ donorData }) {
  if (donorData != null) {
    console.log(donorData);
    const tabledata = donorData.map((donor,key) => {
      return (
        <tr>
          <th scope="row">{key+1}</th>
          <td>{donor.name}</td>
          <td>{donor.bloodGroup}</td>
          <td>{donor.state}, {donor.city}</td>
          <td>{donor.isCovidPlasmaDonor ? "YES" : "NO"}</td>
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
            <DonorData donorData={props.donorData} />
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DonorList;
