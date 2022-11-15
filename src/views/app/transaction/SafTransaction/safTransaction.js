import React, { Component } from "react";
import ReactTable from "react-table";
import Select from "react-select";
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
import SelectInput from "../selectInput";
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
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
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

const SignupSchema = Yup.object().shape({
  // date: Yup.date().nullable().required("Date required"),
  stan: Yup.string().min(6, "please provide valid stan"),
  //  .max(50, 'Too Long!')
  // state: Yup.object()
  //   .shape({
  //     label: Yup.string().required(),
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required("State is required!"),
});
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

export default class SafTransaction extends Component {
  constructor(props) {
    super(props);

    this.mouseTrap = require("mousetrap");

    this.state = {
      // editCustomerInitValues: {
      //   account: "",
      //   cnic: "",
      //   debitCard: "",
      //   email: "",
      //   mnp: "",
      //   mobileUserStatus: "",
      //   mobile_number: "",
      //   username: "",
      // },
      isSubmit: false,
      collapse: true,
      isLoading: false,
      tableLoading: false,
      Options: [],
      Items: [],
      pagination: {
        totalPages: 10,
        currentPage: 1,
        TotalSize: 0,
        selectedPageSize: 10,
        orderBy: "StampDate",
      },
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  // handleChange = (event) => {
  //   const { target } = event;
  //   const { name } = target;
  //   console.log("Event =>> ",event)
  //   console.log("Target =>> ",target)
  //   console.log("Value =>> ",event.value)
  //   console.log("Name =>> ",target.name)
  //   // const value = target.type === "checkbox" ? target.checked : target.value;

  //   // this.setState({
  //   //   [name]: value,
  //   // });
  // };

  onFetchFailure = () => {
    // const { isLoading, islogin, isactiveTab } = this.state;
    // const {rangeDate,
    //   cnic,
    //   userName,
    //   account} = this.state.editInitValues;
    console.log("Errrrrrr Notify.... in call-center");
    this.setState({
      Options: [],
      isLoading: false,
      isSubmit: false,
      safTransactions: {
        stan: "",
        CompanyName: "",
        ConsumerNo: "",
      },
      // isactiveTab: !isactiveTab,
    });
  };
  onFetchSuccess = (data) => {
    console.log("onFetchSuccess: ", data);
    const {isSubmit} = this.state;
    console.log("onFetchSuccess Option : ", data);
    if (isSubmit) {
      this.setState({
        Items: data,
        isSubmit: false,
        isLoading: true,
      });
    } else {
      let arr = [];
      const option = data.forEach((element) => {
        arr.push({
          value: element.companyName.toLowerCase(),
          label: element.companyName,
        });
      });
      this.setState({
        options: arr,
      });
    }
  };
  componentDidMount() {
    fetchIps(this.onFetchSuccess, this.onFetchFailure);
  }

  handleSubmit = (values) => {
    // debugger
    console.log("Inside handleSubmit", values);
    console.log("Inside handleSubmit", values.companyName);

    const payload = {
      ...values,
      companyName:
        values.companyName == "" ? "-1" : values.companyName.label?.trim(),
      stan: values.stan == "" ? "-1" : values.stan,
      consumer_no: values.consumer_no == "" ? "-1" : values.consumer_no,
    };
    this.setState({
      isSubmit: true,
    });
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      // setSubmitting(false);
    }, 1000);

    fetchSafTransaction(payload, this.onFetchSuccess, this.onFetchFailure);
  };

  columns = [
    {
      Header: "ID",
      id: "id",
      accessor: "id",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Stan",
      id: "stan",
      accessor: "stan",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Channel",
      id: "channel",
      accessor: "channel",
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
      id: "activity_datetime",
      accessor: "activity_datetime",
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
      Header: "Status",
      id: "status",
      accessor: "status",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Retry Count",
      id: "retry_count",
      accessor: "retry_count",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Amount",
      id: "amount",
      accessor: "amount",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Auth ID",
      id: "auth_id",
      accessor: "auth_id",
      width: 120,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Company ID",
      id: "company_id",
      accessor: "company_id",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Consumer No.",
      id: "consumer_no",
      accessor: "consumer_no",
      width: 150,
      Filter: CustomInputElement(),
    },
  ];
  render() {
    const { match } = this.props;
    {
      console.log(this.props, "<<+Props");
    }
    const { options, isLoading, tableLoading, isSubmit, Items, pagination } =
      this.state;
    const { selectedPageSize, totalPages, currentPage } = pagination;
    console.log({ totalPages, currentPage });
    console.log(currentPage, "currentPageRender");
    console.log(Items, "ITems..");

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
                <IntlMessages id="menu.safTransaction" />
              </h1>
              <Breadcrumb match={match} />
            </div>
          </div>
          {/* style={{ overflow: "hidden" }} for upper of ForM */}
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12" xl="12">
                  <Formik
                    onSubmit={(values) => this.handleSubmit(values)}
                    initialValues={{
                      stan: "",
                      companyName: [],
                      consumer_no: "",
                      // date: null,
                      // state: { value: "reasonml", label: "ReasonML" },
                    }}
                    validationSchema={SignupSchema}
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
                            <FormGroup className="form-group">
                              <Label
                                for="stan"
                                // style={{fontWeight:"bold"}}
                              >
                                <strong>Stan</strong>
                              </Label>
                              <Field
                                className="form-control"
                                placeholder="Enter Stan"
                                name="stan"
                                style={{
                                  borderRadius: "10px",
                                  padding: "0.5rem",
                                }}
                              />
                              {errors.stan && touched.stan ? (
                                <div className="invalid-feedback d-block">
                                  {errors.stan}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx sm={4}>
                            <FormGroup className="form-group">
                              <Label
                                for="companyname"
                                // style={{fontWeight:"bold"}}
                              >
                                <strong>Company Name</strong>
                              </Label>
                              <FormikReactSelect
                                name="companyName"
                                id="companyName"
                                value={values.companyName}
                                // isMulti={true}
                                options={options}
                                // className="pt-100"
                                // style={{paddingTop:"100px"}}
                                styles={customStyles}
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
                                 
                                /> */}

                              {errors.select && touched.select ? (
                                <div className="invalid-feedback d-block">
                                  {errors.select}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup className="form-group">
                            <Label
                            for="consumernumber"
                            // style={{fontWeight:"bold"}}
                          >
                            <strong>Consumer Number</strong>
                          </Label>
                              <Field
                                className="form-control"
                                name="consumer_no"
                                placeholder="Enter Consumer Number"
                                // required
                                style={{
                                  borderRadius: "10px",
                                  padding: "0.5rem",
                                }}
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
                              ${this.state.isSubmit ? "show-spinner" : ""}`}
                          size="lg"
                          disabled={this.state.isSubmit}
                        >
                          <i
                            style={{ fontSize: "16px" }}
                            class="fa fa-money"
                            aria-hidden="true"
                          />{" "}
                          {/* <i className="bi bi-check2-circle" />{""} */}
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
                      </Form>
                    )}
                  </Formik>
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
                    <ReactTable
                      data={Items}
                      columns={this.columns}
                      filterable={true}
                      // className="-highlight react-table-fixed-height"
                      // style={{ cursor: "pointer" }}
                      TbodyComponent={CustomTBodyComponent}
                      noDataText="Currently Data Not Found"
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
  }
}
