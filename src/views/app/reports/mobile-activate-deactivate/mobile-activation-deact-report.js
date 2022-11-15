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
import XLSX from "xlsx"; 

import DataTablePagination from "../../../../components/DatatablePagination";
// import { DateRangePicker } from 'rsuite';
import { fetchIps, fetchSafTransaction } from "./apiCalls";
import { transformToObject } from "helpers/Utils";
import Select from "react-select";
import * as Yup from "yup";
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

import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";
// import "bootstrap/dist/css/bootstrap.css";
import "../style.css"
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
const ActivationDeactivationReport = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  const [isSubmit, setSubmit] = useState(false);
  const[isLoading,setisLoading] = useState(false);
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
  const [initialValue,setInitialValue] = useState(
    {
      dateRange: [],
      cnic: "",
      account: "",
      username: "",
      options:[],
      report:[]
    }
    )
  const {dateRange,cnic,account,username,options,report} = initialValue
  const [selectedOption, setSelectedOption] = useState(
    { label: "All", value: "All" }
  );
  const [reportOption, setReportOption] = useState(
    { label: "Mobile Application Activation/Deactivation Report", value: "activationreport" }
  );
  const [startDate, endDate] = dateRange;

  const customStyles = {
    control: (base) => ({
      ...base,
      // height: 35,
      // paddingBottom:"20px",
      // minHeight: 44,
      borderRadius: "10px",
      // padding: "0.5rem"
    }),
  };

  useEffect(() => {
    // setDateRange([new Date()]);
    setInitialValue(prevState => ({
      ...prevState,
      dateRange: [new Date(),new Date()],
      options: [{
        label: "All",
        value: "All",
      },
      {
        label: "Customer Request",
        value: "customer request",
      },
      {
        label: "FRMU",
        value: "frmu",
      },
      {
        label: "Compliance Request",
        value: "compliance request",
      }],
      report:[{
        label: "Mobile Application Activation/Deactivation Report",
        value: "activationreport",
      },
      {
        label: "International Request Report",
        value: "internationalreport",
      },
    ]
  }))
  }, []);

  const toggle = () => {
    console.log("Toggle!");
    
  };
  const handleTab = (e) => {
    e.preventDefault();
    console.log("handleTab!",dateRange);
    // const [startDate, endDate] = dateRange;
    setisLoading(true);
    // // startDate = val.slice(0, 10);
    // // endDate = val.slice(13);
    // console.log(startDate, endDate);
    // let startingDate = moment(startDate).format("YYYY-MM-DD");
    // let endingDate = moment(endDate).format("YYYY-MM-DD");
    // console.log(startingDate, "startingDate!");
    // console.log(endingDate, "endingDate!");
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
    setInitialValue(prevState => ({
      ...prevState,
      [name]: val,

    }));
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

const columns = [

  {
    Header: "Id",
    id: "id",
    accessor: "id",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "CNIC",
    id: "nbp_customer_cnic",
    accessor: "nbp_customer_cnic",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Account Title",
    id: "account_title",
    accessor: "account_title",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Branch Code",
    id: "branch_code",
    accessor: "branch_code",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Account Number",
    id: "account_number",
    accessor: "account_number",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Product Type",
    id: "product_type",
    accessor: "product_type",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Mobile Number",
    id: "mobile_no",
    accessor: "mobile_no",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Email",
    id: "email",
    accessor: "email",
    width: 150,
    // filterable: false,
    Filter: CustomInputElement(),
  },


  {
    Header: () => (
      <div>
        Login Date <span className="text-muted">[dd-MM-yyyy]</span>
      </div>
    ),
    id: "login_date",
    accessor: "login_date",
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
    Header: () => (
      <div>
        Registration Date <span className="text-muted">[dd-MM-yyyy]</span>
      </div>
    ),
    id: "registration_date",
    accessor: "registration_date",
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
    Header: "User Locked",
    id: "locked",
    accessor: "locked",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Wrong Password Count",
    id: "wrong_password_count",
    accessor: "wrong_password_count",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Customer Status",
    id: "customer_status",
    accessor: "customer_status",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "is Self Registered",
    id: "is_self_registered",
    accessor: "is_self_registered",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Account Nature",
    id: "account_nature",
    accessor: "account_nature",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },
  {
    Header: "Device Type",
    id: "device_type",
    accessor: "device_type",
    width: 100,
    // filterable: false,
    Filter: CustomInputElement(),
  },

];
    // this.setState({ ...this.editInitValues, rangeDate: [startDate, endDate] });
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
            <h3
              style={{
                color: "#23527c",
                cursor: "pointer",
                // fontWeight: "bold",
              }}
            >
              <IntlMessages id="menu.ActivationDeactivation" />
            </h3>
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
                            <strong>DateRange:</strong>
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
                            label="Call Center Agent Username"
                            name="callcenteragent"
                            type="text"
                            id="callcenteragent"
                            style={{ borderRadius: "10px", padding: "0.5rem" }}
                            
                            placeholder="Enter Call Center Agent Username"
                            onChange={handleEvent}
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm="4">
                        <FormGroup>
                          <InputField
                            // value={account}
                            label="App Username"
                            type="text"
                            id="account"
                            style={{ borderRadius: "10px", padding: "0.5rem" }}
                            name="account"
                            placeholder="Enter Username"
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
                            // value={userName}
                            label="CLI"
                            type="number"
                            id="cli"
                            style={{ borderRadius: "10px", padding: "0.5rem" }}
                            required={true}
                            name="clix`"
                            placeholder="Enter CLI"
                            onChange={handleEvent}
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm="4">
                        <FormGroup>
                          {/* <Label for="activity">Activity</Label> */}
                          {/* <Input
                              id="examplePassword"
                              name="password"
                              placeholder="Password"
                              type="password"
                            /> */}
                             <Label
                            for="activity"
                            // style={{fontWeight:"bold"}}
                          >
                            <strong>Blocking Request</strong>
                          </Label>
                            <Select
                                name="blocking"
                                // id="companyName"
                                // value={values.companyName}
                                // isMulti={true}
                                options={options}
                                // className="pt-100"
                                // style={{paddingTop:"100px"}}
                                defaultValue={selectedOption}
                                onChange={() => setSelectedOption}
                                styles={customStyles}
                                // onChange={setFieldValue}
                                // onBlur={setFieldTouched}
                              />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm="4">
                        <FormGroup>
                          {/* <Label for="activity">Activity</Label> */}
                          {/* <Input
                              id="examplePassword"
                              name="password"
                              placeholder="Password"
                              type="password"
                            /> */}
                            <Label
                            for="activity"
                            // style={{fontWeight:"bold"}}
                          >
                            <strong>Report Request</strong>
                          </Label>
                            <Select
                                name="report"
                                // id="companyName"
                                // value={values.companyName}
                                // isMulti={true}
                                options={report}
                                // className="pt-100"
                                // style={{paddingTop:"100px"}}
                                defaultValue={reportOption}
                                onChange={setReportOption}
                                styles={customStyles}
                                // onChange={setFieldValue}
                                // onBlur={setFieldTouched}
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
                          Export
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

export default ActivationDeactivationReport;
