import React from "react";
import { Table } from "reactstrap";

//On clicking name in request table, user can see all details of that person
function RequestData({ data }) {
  if (data != null) {
    const tabledata = data.map((request) => {
      return (
        <tr>
          <th>{request.key}</th>
          <td>{request.fullname}</td>
          <td>{request.bloodgroup}</td>
          <td>{request.statecity}</td>
          <td>{request.date}</td>
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
    <div style={{ backgroundColor: "floralwhite" }}>
      <h4 className="text-center">
        <strong>CURRENT REQUESTS</strong>
      </h4>
      <Table bordered>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Full Name</th>
            <th>Blood Group</th>
            <th>City, State</th>
            <th>Date of Requirement</th>
          </tr>
        </thead>
        <RequestData data={props.data} />
      </Table>
    </div>
  );
}

export default RequestList;
