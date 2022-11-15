import React, { useEffect, useState } from "react";

import ReactTable from "react-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { CustomInputElement } from "components/custom/customInput";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import DataTablePagination from "../../../../components/DatatablePagination";
// import { DateRangePicker } from 'rsuite';
import { fetchIps, fetchSafTransaction } from "./apiCalls";
import { transformToObject } from "helpers/Utils";
import * as Yup from "yup";
import XLSX from 'xlsx';
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  // Form,
  FormGroup,
  Input,
  Label,
  Button,
  Collapse,
} from "reactstrap";
import { Tab, Tabs } from "react-bootstrap";
import ReactExport from "react-data-export";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";
// import "bootstrap/dist/css/bootstrap.css";

// import Select from "react-select";
import { CustomInput } from "reactstrap";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from "../FormikFields";
import CNICField from "../../inputFields/cnicField";
import InputField from "../../inputFields/InputField";
import SelectInput from "../selectInput";
const IncomingIBFT = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  const [collapse, setCollapse] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tableLoading, settableLoading] = useState(false);
  const [Items,setItems] = useState([]);
  const [sheetData,setSheetData] = useState(null);
  const [pagination, setPagination] = useState({
    totalPages: 10,
    currentPage: 1,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: "StampDate",
  });
  const { totalPages, selectedPageSize } = pagination;
  // const [dateRange, setDateRange] = useState([null, null]);
  const [initialValue, setInitialValue] = useState({
    dateRange: [],
    cnic: "",
    account: "",
    username: "",
    options: [],
  });
  const { dateRange, cnic, account, username, options } = initialValue;
  const [startDate, endDate] = dateRange;
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // setIsSelected(true);
  };

  const handleonExport = () => {
    var today = new Date()
    let time = today.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    let date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
    console.log("DATE =>> ",date)
    console.log("TIME =>> ",time)
    var wb = XLSX.utils.book_new();
    var wscols = [
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15}
  ];
  
  var ws = XLSX.utils.json_to_sheet(sheetData);
  ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb , ws, "Self Registration")

    XLSX.writeFile(wb, `${date}_${time}_Self_Registered_users.xlsx`)
  }

  useEffect(() => {
    // setDateRange([new Date()]);
    setInitialValue((prevState) => ({
      ...prevState,
      dateRange: [new Date(), new Date()],
      options: [
        {
          label: "All",
          value: "All",
        },
        {
          label: "Bill Payment",
          value: "Bill Payment",
        },
        {
          label: "fund",
          value: "Fund-Transfer",
        },
        {
          label: "ibft",
          value: "IBFT",
        },
      ],
    }));
  }, []);

  const toggle = () => {
    console.log("Toggle!");
    setCollapse(!collapse);
  };
  const handleTab = (e) => {
    e.preventDefault();
    console.log("handleTab!", dateRange);
    const [startDate, endDate] = dateRange;
    setLoading(true);
    // startDate = val.slice(0, 10);
    // endDate = val.slice(13);
    console.log(startDate, endDate);
    let startingDate = moment(startDate).format("YYYY-MM-DD");
    let endingDate = moment(endDate).format("YYYY-MM-DD");
    console.log(startingDate, "startingDate!");
    console.log(endingDate, "endingDate!");
    // setCollapse(!collapse);
  };
  const handleEvent = (event, picker) => {
    // const { rangeDate } = this.state.editInitValues;
    console.log("this.props: ", props);
    console.log("Event : ", event);
    console.log("Event : ", picker);
    const target = event.target;
    const name = event.target.name;
    console.log(target, "TargetType");
    const val = event.target.value;
    console.log(val, "Value");

    console.log(val, "Cnic");
    setInitialValue((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const columns = [
    {
      Header: "ID",
      id: "id",
      accessor: "id",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "PAN",
      id: "pan",
      accessor: "pan",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Source Bank IMD",
      id: "bankimd",
      accessor: "bankimd",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Source Account",
      id: "sourceaccount",
      accessor: "sourceaccount",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Dest Bank IMD",
      id: "dest bank imd",
      accessor: "dest bank imd",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Dest Bank Name",
      id: "Dest bank name",
      accessor: "dest bank name",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Dest Account",
      id: "dest account",
      accessor: "dest account",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Trans Amount(PKR)",
      id: "trans amount",
      accessor: "trans amount",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "response_code",
      id: "response_code",
      accessor: "response_code",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "status",
      id: "status",
      accessor: "status",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: () => (
        <div>
          Date/Time <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "stampDate",
      accessor: "stampDate",
      width: 150,
      filterable: false,
      // Cell: ({ original }) => this.getDateCell(original),
      Filter: ({ filter, onChange }) => {
        return (
          <div>
            <DatePicker
              selected={this.state.selectedDate}
              dateFormat="dd-MM-yyyy"
              style={{ height: "20px" }}
              onChange={(date) => {
                this.setState({ selectedDate: date });
                console.log(moment(date).format("DD-MM-YYYY"), "hellow wordl");
                const isValid = moment(date, ["DD-MM-YYYY"]).isValid();
                let formatedDate = "";
                if (isValid) formatedDate = moment(date).format("DD-MM-YYYY");
                onChange(formatedDate);
              }}
            />
          </div>
        );
      },
    },
    {
      Header: "Stan",
      id: "stan",
      accessor: "stan",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Client",
      id: "client",
      accessor: "client",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Auth ID",
      id: "authId",
      accessor: "authId",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
      // filterable: CustomInputElement(),
    },
  ];
  const dataSet1 = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true,
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false,
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false,
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true,
    },
  ];

  return (
    <>
      {/* {isLoading ? (
          <LoadingOverlay />
        ) : ( */}
      {/* // <div className="overlay-container d-flex justify-content-center align-items-center">
          //   <img src="https://hblbankuk.com/wp-content/uploads/2020/02/logo.svg"></img>
          // </div> */}
      <Colxx xxs="12">
        <div>
          <div className="d-flex align-items-center">
            <h1
              style={{
                color: "#23527c",
                cursor: "pointer",
                // fontWeight: "bold",
              }}
            >
              <IntlMessages id="menu.incomingIBFT" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        {/* style={{ overflow: "hidden" }} for upper of ForM */}
        <Card>
          <CardBody>
            <Row>
              <Colxx xxs="12" xl="12">
                <Form onSubmit={handleTab}>
                  <Row className="container">
                    <Colxx sm="4">
                      <FormGroup>
                        <Label
                          for="dateRange"
                          // style={{fontWeight:"bold"}}
                        >
                          <strong>DateRange mm/dd/yyyy</strong>
                        </Label>
                        <DateRangePicker
                          onEvent={handleEvent}
                          initialSettings={{
                            startDate: { startDate },
                            endDate: { endDate },
                            showDropdowns: true,
                          }}
                        >
                          <input
                            type="text"
                            name="date"
                            className="icon form-control"
                            style={{
                              borderRadius: "10px",
                              padding: "0.5rem",
                            }}
                          />
                        </DateRangePicker>
                      </FormGroup>
                      {/* <button className="btn btn-primary">Show Date</button> */}
                    </Colxx>

                    <Colxx sm="4">
                      <FormGroup>
                        {/* <Label for="cnic">Cnic</Label> */}
                        {/* <Input
                              id="examplePassword"
                              name="password"
                              placeholder="Password"
                              type="password"
                            /> */}
                        <InputField
                          // value={account}
                          label="From Account"
                          type="number"
                          id="account"
                          style={{ borderRadius: "10px", padding: "0.5rem" }}
                          name="account"
                          placeholder="Enter From Account"
                          onChange={handleEvent}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="4">
                      <FormGroup>
                        {/* <Label for="cnic">Cnic</Label> */}
                        {/* <Input
                              id="examplePassword"
                              name="password"
                              placeholder="Password"
                              type="password"
                            /> */}
                        <InputField
                          // value={account}
                          label="To Account"
                          type="number"
                          id="account"
                          style={{ borderRadius: "10px", padding: "0.5rem" }}
                          name="account"
                          placeholder="Enter To Account"
                          onChange={handleEvent}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm="12">
                      <Button
                        style={{ float: "right" }}
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state 
                          ${isSubmit ? "show-spinner" : ""}`}
                        size="lg"
                        disabled={isSubmit}
                      >
                        <i className="fa fa-search" />{" "}
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          {/* {/ <IntlMessages id="user.login-button" /> /} */}
                          Submit
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>

      {isLoading ? (
        <Colxx xxs="12" className="mt-4">
          <Row>
            <Colxx xxs="12" sm="12">
              <Card className="mb-4">
                <CardBody>
                  <label style={{ fontSize: "20px" }}>
                    <strong>Details</strong>
                  </label>
                  <Row>
              <Colxx sm="12">
                      {sheetData &&
                        <Button
                        style={{ float: "right" , marginBottom:"10px" }}
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state 
                        ${isSubmit ? "show-spinner" : ""}`}
                        size="lg"
                        disabled={isSubmit}
                        onClick={handleonExport}
                      >
                        <i class="fa fa-download" aria-hidden="true"></i>{" "}
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          {/* {/ <IntlMessages id="user.login-button" /> /} */}
                          Export To Excel
                        </span>
                      </Button>
                      }
                        
                      </Colxx>
              </Row>
                  <ReactTable
                    data={Items}
                    columns={columns}
                    filterable={true}
                    // className="-highlight react-table-fixed-height"
                    // style={{ cursor: "pointer" }}
                    TbodyComponent={CustomTBodyComponent}
                    noDataText="Data Not Found"
                    pages={totalPages}
                    showPagination={true}
                    showPageJump={true}
                    showPageSizeOptions={false}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    loading={tableLoading}
                    defaultPageSize={selectedPageSize}
                    PaginationComponent={DataTablePagination}
                    manual
                    // onPageChange={(selectedPage) =>
                    //   this.handleOnPageChange(selectedPage + 1)
                    // }
                    defaultFilterMethod={(filter, row, column) => {
                      return true;
                    }}
                    // onSortedChange={(sortProperties, columns, additive) => {
                    //   const [item] = sortProperties;
                    //   console.log("Item ==>", item);
                    //   const { id, desc } = item;
                    //   const orderBy = {
                    //     column: id,
                    //     asec: !desc,
                    //   };
                    //   this.setState({
                    //     orderBy,
                    //     tableLoading: true,
                    //   });

                    //   this.handleOnSort(orderBy); // Trigger handle onsort.
                    // }}
                    // onFilteredChange={(filtered, column, value) => {
                    //   console.log("hello world....", filtered);
                    //   const searchCriteria = transformToObject(filtered);
                    //   console.log(searchCriteria, "<<=Searching");
                    //   this.handleOnSearch(searchCriteria); // Trigger handle search
                    // }}
                  />
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      ) : null}
    </>
  );
};

export default IncomingIBFT;
