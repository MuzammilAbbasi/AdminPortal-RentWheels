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
import { array } from "yup";
import { Input } from "rsuite";
// import { BookingTable } from "components/BookingTable";
// import { useTable } from "react-table";
const divsearch = 12.5;
class getuserlist extends Component {
  curr = 0;
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
  dateformat = (st) => {
    let temp = st.split("T");
    return temp[0] + " " + temp[1].split("Z")[0];
  };
  columns = [
    {
      Header: "ID",
      accessor: "_id",
      width: 190,
    },
    {
      Header: "Renter",
      id: "rent",
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
      Cell: ({ value }) => this.dateformat(value),
    },
    {
      Header: "End Time",
      accessor: "endTime",
      width: 150,
      Cell: ({ value }) => this.dateformat(value),
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
      page: 0,
    };
    this.callAPI = this.callAPI.bind(this);
    this.callAPI();
  }
  callAPI() {
    fetch("http://localhost:8000/api/v1/bookings?page=1&limit=5")
      .then((response) => response.json())
      .then((data) => {
        // alert(data.Payload.data[0]._id);
        this.setState({
          list: data.Payload.data,
        });
      });
  }
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        // console.log(rowInfo.original._id);
        console.log(
          this.state.list.find((o) => o._id === rowInfo.original._id)
        );
      },
    };
  };

  pageChange = () => {
    // this.setState({ page: pageIndex });
    // this.curr = pageIndex;
    // console.log(this.curr);
    fetch(`http://localhost:8000/api/v1/bookings?page=${this.curr + 1}&limit=5`)
      .then((response) => response.json())
      .then((data) => {
        this.state.list = [];
        this.setState({
          list: data.Payload.data,
        });
        // this.state.list = data.Payload.data;
      });
    console.log(this.state.list);
  };

  searchTable = (e, q) => {
    fetch(`http://localhost:8000/api/v1/bookings?${q}=${e}`)
      .then((response) => response.json())
      .then((data) => {
        this.state.list = [];
        console.log(data);
        this.setState({
          list: data.Payload.data,
        });
        // this.state.list = data.Payload.data;
      });
    // console.log(this.state.list);
  };

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
            <Row>
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => this.searchTable(e, "_id")}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => this.searchTable(e, "renter")}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                type="text"
                name="date"
                placeholder="Search"
                className="icon form-control"
                style={{
                  width: `${divsearch}%`,
                  borderRadius: "10px",
                  padding: "0.5rem",
                  position: "relative",
                  //   left: "15px",
                }}
                required={true}
                onChange={(e) => console.log(e.target.value)}
              />
            </Row>
            <div className="container">
              <ReactTable
                data={this.state.list}
                columns={this.columns}
                // pages={4}
                defaultPageSize={5}
                page={this.curr}
                showPagination={true}
                showPageJump={true}
                showPageSizeOptions={false}
                showPaginationTop={false}
                getTrProps={this.onRowClick}
                // onPageChange={this.pageChange}
                // onPageChange={(pageIndex) => {
                //   this.curr = pageIndex;
                //   // this.setState({ page: pageIndex });
                //   this.pageChange();
                // }}
                showPaginationBottom={true}
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

export default getuserlist;
