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

import Select from "react-select";
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
const LoginAuditReport = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  const [collapse, setCollapse] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [dateRange, setDateRange] = useState([null, null]);
  const [initialValue,setInitialValue] = useState(
    {
      dateRange: [],
      cnic: "",
      account: "",
      username: "",
      options:[]
    }
    )
  const {dateRange,cnic,account,username,options} = initialValue
  const [startDate, endDate] = dateRange;
  const [isLoading,setLoading] = useState(false);
  const [tableLoading,settableLoading] = useState(false);
  const Items= useState([]);
  const [pagination,setPagination]= useState(
    {
        totalPages: 10,
        currentPage: 1,
        TotalSize: 0,
        selectedPageSize: 10,
        orderBy: "StampDate",
      })
  const {totalPages,selectedPageSize} = pagination;
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
        label: "Bill Payment",
        value: "Bill Payment",
      },
      {
        label: "Fund-Transfer",
        value: "fund",
      },
      {
        label: "IBFT",
        value: "ibft",
      }]

  }))
  }, []);

  const toggle = () => {
    console.log("Toggle!");
    setCollapse(!collapse);
  };
  const handleTab = (e) => {
    e.preventDefault();
    console.log("handleTab!",dateRange);
    const [startDate, endDate] = dateRange;

    // startDate = val.slice(0, 10);
    // endDate = val.slice(13);
    setLoading(true)
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
    setInitialValue(prevState => ({
      ...prevState,
      [name]: val,

    }));
  };
  const columns = [
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
      Header: "Activity",
      id: "activity",
      accessor: "activity",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "CNIC",
      id: "cnic",
      accessor: "cnic",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "From Account",
      id: "account",
      accessor: "account",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "To Account/Consumer No",
      id: "consumerno",
      accessor: "consumerno",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Company/Bank imd",
      id: "bank imd",
      accessor: "bank",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "BankName",
      id: "toBank",
      accessor: "toBank",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Amount (PKR)",
      id: "amount",
      accessor: "amount",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Response Description",
      id: "Description",
      accessor: "Description",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Txn Ref no",
      id: "rrn",
      accessor: "rrn",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Stan",
      id: "stan",
      accessor: "stan",
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
    {
      Header: "Account Nature",
      id: "Nature",
      accessor: "Nature",
      width: 150,
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
            <h1
              style={{
                color: "#23527c",
                cursor: "pointer",
                // fontWeight: "bold",
              }}
            >
              <IntlMessages id="menu.LoginAudit" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        {/* style={{ overflow: "hidden" }} for upper of ForM */}
        <Card>
          <CardBody>
              <Row className="mt-3">
                <Colxx xxs="12" xl="12">
                  <Form onSubmit={handleTab}>
                    <Row className="container">
                      <Colxx sm="4">
                        <FormGroup>
                          {/* <Label for="cnic">Cnic</Label> */}
                          {/* <Input
                              id="examplePassword"
                              name="password"
                              placeholder="Password"
                              type="password"
                            /> */}
                          <CNICField
                            label="Cnic *"
                            name="cnic"
                            handleChange={handleEvent}
                            // value={cnic}
                            id="cnic"
                            className="rounded-sm"
                            style={{ borderRadius: "10px", padding: "0.5rem" }}
                            // errors,
                            // touched,
                            // disabled,
                            // containerClassName,
                            // autoComplete="off"
                            required={true}
                            // maxLength={13}
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
                            label="Mobile Number"
                            type="number"
                            id="mobile"
                            style={{ borderRadius: "10px", padding: "0.5rem" }}
                            required={true}
                            name="mobile"
                            placeholder="Enter Mobile Number"
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

                    <label style={{fontSize:"20px"}}>
                      <strong>Details</strong>
                    </label>
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

export default LoginAuditReport;
