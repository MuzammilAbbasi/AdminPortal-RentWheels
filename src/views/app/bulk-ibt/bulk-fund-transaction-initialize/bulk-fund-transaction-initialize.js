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
import { Link } from 'react-router-dom';
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
  Collapse,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CustomInput,
  UncontrolledDropdown,
} from "reactstrap";
import { Tab, Tabs } from "react-bootstrap";

import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";

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
import { NotificationManager } from "components/common/react-notifications";
const BulkFundTransferInitiate = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  const URL = match.url.substr(0,13)
  console.log(URL,"URL")
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [tableLoading, settableLoading] = useState(false);
  const [Items, setItems] = useState([]);
  const [sheetData, setSheetData] = useState(null);
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
    report: [],
  });
  const { dateRange, cnic, account, username, options, report } = initialValue;
  const [selectedOption, setSelectedOption] = useState({
    label: "All",
    value: "All",
  });
  const [reportOption, setReportOption] = useState({
    label: "Mobile Application Activation/Deactivation Report",
    value: "activationreport",
  });
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
    setInitialValue((prevState) => ({
      ...prevState,
      dateRange: [new Date(), new Date()],
      options: [
        {
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
        },
      ],
      report: [
        {
          label: "Mobile Application Activation/Deactivation Report",
          value: "activationreport",
        },
        {
          label: "International Request Report",
          value: "internationalreport",
        },
      ],
    }));
  }, []);

  const toggle = () => {
    console.log("Toggle!");
  };
  const handleTab = (e) => {
    e.preventDefault();
    console.log("handleTab!", dateRange);
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
    setInitialValue((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleonExport = () => {
    const header = fileHeaders.map((c) => c.exportValue);
    console.log("HEADERS =>>", header);
    var today = new Date();
    let time = today.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let date =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();
    console.log("DATE =>> ", date);
    console.log("TIME =>> ", time);
    var wb = XLSX.utils.book_new();
    var wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    if (sheetData) {
      var ws = XLSX.utils.json_to_sheet(sheetData);
      ws["!cols"] = wscols;

      XLSX.utils.book_append_sheet(wb, ws, "Self Registration");

      XLSX.writeFile(wb, `${date}_${time}_Self_Registered_users.xlsx`);
    } else {
      let notification = NotificationManager.error(
        "DATA NOT FOUND",
        "400",
        3000,
        null,
        null,
        "filled"
      );
    }
  };
  const fileHeaders = React.useMemo(
    () => [
      {
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "From Account",
            accessor: "fromaccount",
          },
          {
            Header: "From Bank IMD",
            accessor: "frombankimd",
          },
          {
            Header: "To Account",
            accessor: "toaccount",
          },
          {
            Header: "ToBankName",
            accessor: "toBankname",
          },
          {
            Header: "To Bank IMD",
            accessor: "tobankimd",
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
          {
            Header: "Payment Mode",
            accessor: "paymentmode",
          },
          {
            Header: "Cheque Number",
            accessor: "chequenumber",
          },
          {
            Header: "Date Time",
            accessor: "date",
          },
          {
            Header: "To Account Title",
            accessor: "toaccounttitle",
          },
        ],
      },
    ],
    []
  );

  // this.setState({ ...this.editInitValues, rangeDate: [startDate, endDate] });
  return (
    <>
      {/* {isLoading ? (
          <LoadingOverlay />
        ) : ( */}
      {/* // <div className="overlay-container d-flex justify-content-center align-items-center">
          //   <img src="https://hblbankuk.com/wp-content/uploads/2020/02/logo.svg"></img>
          // </div> */}
      <Colxx xxs="12" xs="12">
        <div>
          <div className="d-flex align-items-center">
            <h3
              style={{
                color: "#23527c",
                cursor: "pointer",
                // fontWeight: "bold",
              }}
            >
              <IntlMessages id="menu.fund-transfer-transactions" />
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
                  <Row>
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
                          <strong>Purpose of Payment</strong>
                        </Label>
                        <Select
                          name="payment"
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
                      <InputGroup className="mt-4">
                        <CustomInput
                          type="file"
                          id="exampleCustomFileBrowser4"
                          name="customFile"
                        />
                        <InputGroupAddon addonType="append">
                          <Button outline color="primary">
                            <IntlMessages id="input-groups.button" />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Colxx>


                    <Colxx sm="12" xxs="12">
                      <Link to={`${URL}/BulkFundTransferTransactions/listOfUploadedFiles`}>
                      <Button
                        style={{ float: "right" }}
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state 
                        ${isSubmit ? "show-spinner" : ""}`}
                        size="md"
                        disabled={isSubmit}
                        // onClick={handleonExport}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          {/* {/ <IntlMessages id="user.login-button" /> /} */}
                          List of Uploaded File Details
                        </span>
                      </Button>
                      </Link>
                      

                      <Button
                        style={{ float: "right", marginRight: "10px" }}
                        color="primary"
                        type="submit"
                        className={`btn-shadow btn-multiple-state 
                        ${isSubmit ? "show-spinner" : ""}`}
                        size="md"
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
                          Template of BULK IBFT
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
    </>
  );
};

export default BulkFundTransferInitiate;
