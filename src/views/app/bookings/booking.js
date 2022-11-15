import React, { Component, Fragment } from "react";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import ReactTable from "react-table";
import { CustomInputElement } from "components/custom/customInput";
import "./style.css";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
// import { BookingTable } from "components/BookingTable";
// import { useTable } from "react-table";
class Booking extends Component {
  StatusNamer = (st) => {
    return st === "0"
      ? "Pending"
      : st === "1"
      ? "Confirmed"
      : st === "2"
      ? "Cancelled"
      : st === "3"
      ? "Terminated"
      : "Completed";
  };
  columns = [
    {
      Header: "ID",
      accessor: "_id",
      width: 190,
    },
    {
      Header: "Renter",
      accessor: "renter.username",
      width: 100,
    },
    {
      Header: "Rentee",
      accessor: "rentee.username",
      width: 100,
    },
    {
      Header: "Vehicle",
      accessor: "vehicle.model",
      width: 100,
    },
    {
      Header: "Starting Time",
      accessor: "startTime",
      width: 150,
    },
    {
      Header: "End Time",
      accessor: "endTime",
      width: 150,
    },
    {
      Header: "Total Rent",
      accessor: "totalAmount",
      width: 150,
    },
    {
      Header: "Status",
      accessor: "rentalStatus",
      width: 150,
      Cell: ({ value }) => this.StatusNamer(value),
    },
    // {
    //   Header: "Source Bank IMD",
    //   id: "bankimd",
    //   accessor: "bankimd",
    //   width: 150,
    //   filterable: false,
    //   Filter: CustomInputElement(),
    // },
    // {
    //   Header: "Source Account",
    //   id: "sourceaccount",
    //   accessor: "sourceaccount",
    //   width: 120,
    //   // filterable: false,
    //   Filter: CustomInputElement(),
    // },
    // {
    //   Header: "Dest Bank IMD",
    //   id: "dest bank imd",
    //   accessor: "dest bank imd",
    //   width: 120,
    //   // filterable: false,
    //   Filter: CustomInputElement(),
    // },
    // {
    //   Header: "Dest Bank Name",
    //   id: "Dest bank name",
    //   accessor: "dest bank name",
    //   width: 120,
    //   // filterable: false,
    //   Filter: CustomInputElement(),
    // },

    // {
    //   Header: "Dest Account",
    //   id: "dest account",
    //   accessor: "dest account",
    //   width: 150,
    //   // filterable: false,
    //   Filter: CustomInputElement(),
    // },
  ];
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.callAPI = this.callAPI.bind(this);
    this.callAPI();
  }
  callAPI() {
    fetch("http://localhost:8000/api/v1/bookings")
      .then((response) => response.json())
      .then((data) => {
        // alert(data.Payload.data[0]._id);
        this.setState({
          list: data.Payload.data,
        });
      });
  }
  element = document.q;
  render() {
    // let tbd = this.state.list.map((data) => {
    //   return (
    //     <tr key={data._id} onClick={() => alert(data._id)}>
    //       <td>{data._id}</td>
    //       <td>{data.renter.username}</td>
    //       <td>{data.rentee.username}</td>
    //       <td>{data.vehicle.model}</td>
    //       <td>{data.startTime}</td>
    //       <td>{data.endTime}</td>
    //       <td>{data.totalAmount}</td>
    //       <td>
    //         {data.rentalStatus === "0"
    //           ? "Pending"
    //           : data.rentalStatus === "1"
    //           ? "Confirmed"
    //           : data.rentalStatus === "2"
    //           ? "Cancelled"
    //           : data.rentalStatus === "3"
    //           ? "Terminated"
    //           : "Completed"}
    //       </td>
    //     </tr>
    //   );
    // });

    return (
      <>
        <Colxx xxs="12">
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <h1>
                <IntlMessages id="Bookings" />
              </h1>
            </div>
          </div>
        </Colxx>
        <Card>
          <CardBody>
            <div className="container">
              <ReactTable
                data={this.state.list}
                columns={this.columns}
                showPagination={true}
                showPageJump={true}
                showPageSizeOptions={false}
                showPaginationTop={true}
                defaultPageSize={10}
              />
              {/* <BookingTable /> */}
              {/* <table className="table table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Booking ID</th>
                    <th>Renter</th>
                    <th>Rentee</th>
                    <th>Vehicle</th>
                    <th>Starting Time</th>
                    <th>End Time</th>
                    <th>Total Rent</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{tbd}</tbody>
              </table> */}
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Booking;
