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
// import InputField from "../../inputFields/InputField";
import SelectInput from "../selectInput";
const YearlyActivityReport = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  const [collapse, setCollapse] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
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
  const [selectedOption, setSelectedOption] = useState(null);
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
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     // padding: 20,
  //   }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';

  //     return { ...provided, opacity, transition };
  //   }
  // }
  // const options = [
  //   {
  //     label: "All",
  //     value: "all",
  //   },
  //   {
  //     label: "Bill Payment",
  //     value: "billpayment",
  //   },
  //   {
  //     label: "Fund-Transfer",
  //     value: "fund",
  //   },
  //   {
  //     label: "IBFT",
  //     value: "ibft",
  //   },
  // ];

  useEffect(() => {
    // setDateRange([new Date()]);
    setInitialValue(prevState => ({
      ...prevState,
      dateRange: [new Date(),new Date()],
      options: [        
      {
        label: "2022",
        value: "2022",
      },
      {
        label: "2021",
        value: "2021",
      },
      {
        label: "2020",
        value: "2020",
      },
    {
      label: "2019",
      value: "2019",
    },
    {
      label: "2018",
      value: "2018",
    },
    {
      label: "2017",
      value: "2017",
    },
    {
      label: "2016",
      value: "2016",
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
              <IntlMessages id="menu.yearlyActivityTransaction" />
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
                      <Label
                            for="year"
                            // style={{fontWeight:"bold"}}
                          >
                            <strong>Select Year</strong>
                          </Label>
                            <Select
                                name="year"
                                // id="companyName"
                                // value={values.companyName}
                                // isMulti={true}
                                options={options}
                                // className="pt-100"
                                // style={{paddingTop:"100px"}}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                styles={customStyles}
                                // onChange={setFieldValue}
                                // onBlur={setFieldTouched}
                              />
                        {/* <button className="btn btn-primary">Show Date</button> */}
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
                  {/* <Formik
                      onSubmit={(values) => this.handleSubmit(values)}
                      initialValues={{
                        stan: "",
                        companyName: [],
                        consumer_no: "",
                        // date: null,
                        // state: { value: "reasonml", label: "ReasonML" },
                      }}
                      // validationSchema={SignupSchema}
                      // onSubmit={this.handleSubmit}
                      // onSubmit={(values, actions) => {
                      //   setTimeout(() => {
                      //     alert(JSON.stringify(values, null, 2));
                      //     actions.setSubmitting(false);
                      //   }, 1000);
                      // }}
                    >
                      {({
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                      }) => (
                        <Form className="av-tooltip tooltip-label-bottom">
                          <FormGroup row>
                            <Colxx sm={4}>
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="form.stan" />
                                </Label>
                                <Field className="form-control" name="stan" />
                                {errors.stan && touched.stan ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.stan}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>

                            <Colxx sm={4}>
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="form.companyName" />
                                </Label>
                                <FormikReactSelect
                                  name="companyName"
                                  id="companyName"
                                  value={values.companyName}
                                  // isMulti={true}
                                  // options={options}
                                  // className="pt-100"
                                  // style={{paddingTop:"100px"}}
                                  // styles={customStyles}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {/* <SelectInput
                                  // label={"Select Action"}
                                  placeholder={"Select.."}
                                  options={options}
                                  required={true}
                                  handleChange={this.handleChange}
                                  name="companyname"
                                  // style={{
                                  //   paddingTop: "7px",
                                  //   paddingBottom: "7px",
                                  // }}
                                /> */}
                  {/* <Select
                                  // aria-label="stand-alone"
                                  // maxLength={3
                                  name="companyname"
                                  options={options}
                                  onChange={this.handleChange}
                                 
                                /> 

                                {errors.select && touched.select ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.select}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup className="form-group has-float-label">
                                <Label className="d-block">
                                  <IntlMessages id="form.consumerNumber" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="consumer_no"
                                  // required
                                />
                                {errors.consumer && touched.consumer ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.consumer}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                          </FormGroup>
                          <Button
                            style={{ float: "right" }}
                            color="primary"
                            type="submit"
                            className={`btn-shadow btn-multiple-state 
                              ${isSubmit ? "show-spinner" : ""}`}
                            size="lg"
                            disabled={isSubmit}
                          >
                            <i
                              style={{ fontSize: "16px" }}
                              class="fa fa-money"
                              aria-hidden="true"
                            />{" "}
                            {/* <i className="bi bi-check2-circle" />{""} 
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">
                              {/* {/ <IntlMessages id="user.login-button" /> /} 
                              Submit
                            </span>
                          </Button>
                        </Form>
                      )}
                    </Formik> */}
                </Colxx>
              </Row>
          </CardBody>
        </Card>
      </Colxx>
    </>
  );
};

export default YearlyActivityReport;
