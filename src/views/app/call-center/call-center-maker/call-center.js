import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { CustomInputElement } from "components/custom/customInput";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import CustomerDemoGraphicForm from "./CallCenterDetails/customerDemoGraphicForm/customerdemographicform";
import VirtualCardForm from "./CallCenterDetails/VirtualCardComponent/virtual-card-form";
import MobileApplicationActivity from "./CallCenterDetails/MobileApplicationDataTable/mobile-application-activity";
import {
  getDataAgainstCnicAndUsername,
} from "./apiCalls";
import CNICField from "../../inputFields/cnicField";
import InputField from "../../inputFields/InputField";
// import Tabs from "../../tabs/BasicTabs";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
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
// import "bootstrap/dist/css/bootstrap.css";
import { Tab, Tabs } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";

import "bootstrap-daterangepicker/daterangepicker.css";
import "./style.css";
export default class CallCenter extends Component {
  constructor(props) {
    super(props);

    this.mouseTrap = require("mousetrap");

    this.state = {
      startDate: "",
      endDate: "",
      islogin: false,
      isLoading: false,
      tableLoading: false,
      
      MobileActivityValues:{
        rangeDate: [
          moment(new Date()).format("YYYY-MM-DD"),
          moment(new Date()).format("YYYY-MM-DD"),
        ],
        cnic: "",
        userName: "",
        account: "",
      },
      editInitValues: {
        rangeDate: [
          moment(new Date()).format("YYYY-MM-DD"),
          moment(new Date()).format("YYYY-MM-DD"),
        ],
        cnic: "",
        userName: "",
        account: "",
      },
      editCustomerInitValues: {
        accountNumber: "",
        cnic: "",
        customerLevel:"",
        customerStatus: "",
        deactivationReason: "",
        debitCard: "",
        email: "",
        encUmpsCardNo: "",
        locked: "",
        mnp: "",
        mobileNo: "",
        requestFrom: "",
        username:""
      },
      key: "",
      virtualInitValues: {
        cnic:"",
        username:"",
        virtualcard: "",
        transaction_expirydate: "",
        virtualStatus: "",
        transactionStatus: "",
        isvirtualAccepted: false,

      },
  
    };
  }
  onFetchFailure = () => {
    this.setState({
      editCustomerInitValues: "",
      editInitValues: {
        rangeDate: [
          moment(new Date()).format("YYYY-MM-DD"),
          moment(new Date()).format("YYYY-MM-DD"),
        ],
        cnic: "",
        userName: "",
        account: "",
      },
      islogin: false,
      isLoading: false,
    });
  };
  onFetchSuccess = (data) => {
    const { isLoading, islogin } = this.state;
    let Data = data;
    this.setState({
      editCustomerInitValues: Data,
      isLoading: false,
      islogin: true,
    });
  };

  setKey = (k) => {
    const {cnic,userName,account,rangeDate} = this.state.editInitValues;
    const [startingDate,endingDate]=rangeDate;
    if(k === "2"){
      
      this.setState({
        MobileActivityValues: {
          rangeDate: [startingDate, endingDate],
          cnic: cnic,
          userName: userName,
          account: account,
        }
      });
    }
    else if(k === "3"){
      this.setState({
        virtualInitValues:{
          cnic: cnic,
          username: userName,
        }
      });
    }
    this.setState({
      key: k,
    });
  };
  handleTab = (e) => {
    e.preventDefault();
    const { cnic, userName, rangeDate, account } = this.state.editInitValues;
    const [startingDate, endingDate] = rangeDate;


    this.setState({
      isLoading: true,
      islogin: false,
      key: "1",
    });
    getDataAgainstCnicAndUsername(
      cnic,
      userName,
      startingDate,
      endingDate,
      account,
      this.onFetchSuccess,
      this.onFetchFailure
    );
  };

  columns = [
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
                // console.log(moment(date).format("DD-MM-YYYY"), "hellow wordl");
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
      Header: "username",
      id: "username",
      accessor: "username",
      width: 150,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "MobileNumber",
      id: "customer",
      accessor: "mobileNo",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Amount(PKR)",
      id: "amount",
      accessor: "amount",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Company Name",
      id: "companyName",
      accessor: "companyName",
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
      Header: "STAN",
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
      Header: "Status",
      id: "status",
      accessor: "status",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "Account Number",
      id: "fromAccount",
      accessor: "fromAccount",
      width: 150,
      Filter: CustomInputElement(),
    },
    {
      Header: "To Account/Consumer NO",
      id: "consumerNo",
      accessor: "consumerNo",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Activity",
      id: "activity",
      accessor: "activity",
      width: 150,
      filterable: false,
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
      Header: "Channel",
      id: "channel",
      accessor: "channel",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
  ];

  // handleChange = (event) => {
  //   const { target } = event;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const { name } = target;

  //   this.setState({
  //     [name]: value,
  //   });
  // };
  handleEvent = (event, picker) => {
    const { rangeDate } = this.state.editInitValues;

    const target = event.target;
    const name = event.target.name;

    const val = event.target.value;

    var startDate = "";
    var endDate = "";
    if (target.name === "date") {
      startDate = val.slice(0, 10);
      endDate = val.slice(13);

      let startingDate = moment(startDate).format("YYYY-MM-DD");
      let endingDate = moment(endDate).format("YYYY-MM-DD");

      this.setState({
        editInitValues: {
          ...this.state.editInitValues,
          rangeDate: [startingDate, endingDate],
        },
      });
    } else {
      this.setState({
        editInitValues: {
          ...this.state.editInitValues,
          [name]: val,
        },
      });
    }

  };

  render() {

    const { name, value, className, selected, match } = this.props;

    const {
      editCustomerInitValues,
      virtualInitValues,
      MobileActivityValues,
      editInitValues,
      key
    } = this.state;
    const { rangeDate, cnic, userName, account } = editInitValues;
    const { isvirtualAccepted } = this.state.virtualInitValues;
    const [startDate, endDate] = rangeDate;

    // const tabs = [
    //   {
    //     label: "Customer Demographic",
    //     Component: (
    //       <CustomerDemoGraphicForm
    //         editCustomerInitValues={editCustomerInitValues}
    //       />
    //     ),
    //   },
    //   {
    //     label: "Mobile Application Activity",
    //     Component: (
    //       <MobileApplicationActivity editInitValues={editInitValues} />
    //     ),
    //   },
    //   {
    //     label: "Virtual Card",
    //     Component: <VirtualCardForm virtualInitValues={virtualInitValues} />,
    //   },
    // ];

    return (
      <>
        <Colxx xxs="12">
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <h1
              >
                <IntlMessages id="menu.callcenter" />
              </h1>
              <Breadcrumb match={match} />
            </div>
          </div>
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12" xl="12" className="mb-4">
                  <Form onSubmit={this.handleTab}>
                    <Row className="container">
                      <Colxx sm="6">
                        <FormGroup>
                          <Label
                            style={{ fontWeight: "bolder" }}
                            for="dateRange"
                          >
                            DateRange [dd/mm/yyyy - dd/mm/yyyy]
                          </Label>
                          <DateRangePicker
                            onEvent={this.handleEvent}
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
                              style={{ borderRadius: "50px" }}
                            />
                          </DateRangePicker>
                        </FormGroup>
                        
                      </Colxx>
                      <Colxx sm="6">
                        <FormGroup>
                         
                          <CNICField
                            label="Cnic *"
                            name="cnic"
                            handleChange={this.handleEvent}
                            value={cnic}
                            id="cnic"
                            className="rounded-sm"
                            style={{ borderRadius: "50px" }}
                           
                            required={true}
                           
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm="6">
                        <FormGroup>
                         
                          <InputField
                            value={userName}
                            label="Username"
                            type="text"
                            id="username"
                            style={{ borderRadius: "50px" }}
                            // required={true}
                            name="userName"
                            placeholder="Enter Username"
                            onChange={this.handleEvent}
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx sm="6">
                        <FormGroup>
                          
                          <InputField
                            value={account}
                            label="Account Number"
                            type="text"
                            id="account"
                            style={{ borderRadius: "50px" }}
                            name="account"
                            placeholder="Enter Account Number"
                            onChange={this.handleEvent}
                          />
                        </FormGroup>
                      </Colxx>
                      <Colxx>
                        <Button
                          style={{ float: "right" }}
                          color="primary"
                          type="submit"
                          className={`btn-shadow btn-multiple-state 
                          ${this.state.isLoading ? "show-spinner" : ""}`}
                          size="lg"
                          disabled={this.state.isLoading}
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

        {this.state.islogin ? (
          // xs="6" lg="12"
          <Colxx xxs="12" className="mt-4">
            <Row>
              {/* xs="6" lg="12" */}
              <Colxx xxs="12">
                <Card className="mb-4">
                  <CardTitle
                    style={{
                      // color: "#23527c",
                      // cursor: "pointer",
                      fontSize: "1.75rem",
                      // fontWeight: "bold",
                    }}
                    className="m-3"
                  >
                    <IntlMessages id="cards.details" />
                  </CardTitle>
                  <Separator className="mx-4" />

                  {/* Navigation [START] */}

                  {/* <Tabs tabs={tabs} /> */}

                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => this.setKey(k)}
                    defaultActiveKey="1"
                    className="mb-3"
                  >
                    <Tab
                      eventKey="1"
                      title="Customer Demographic"
                      mountOnEnter // <<<
                      unmountOnExit={false} // <<<
                    >
                      <CustomerDemoGraphicForm
                        editCustomerInitValues={editCustomerInitValues}
                      />
                    </Tab>

                    <Tab
                      eventKey="2"
                      title="Mobile Application Activity"
                      mountOnEnter // <<<
                      unmountOnExit={false} // <<<
                    >
                      <MobileApplicationActivity
                        editInitValues={MobileActivityValues}
                      />
                    </Tab>

                    <Tab
                      eventKey="3"
                      title="Virtual card"
                      mountOnEnter // <<<
                      unmountOnExit={false} // <<<
                    >
                      <VirtualCardForm
                        virtualInitValues={virtualInitValues}
                      />
                    </Tab>
                  </Tabs>
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        ) : null}
      </>
    );
  }
}
