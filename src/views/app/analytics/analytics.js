import React, { useState, useLayoutEffect } from "react";

import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx } from "components/common/CustomBootstrap";
import "./analytics.css";
import { getHeaders } from "constants/requestHeaders";
import axios from "axios";
import config from "../../../config";
import { NotificationManager } from "components/common/react-notifications";

import AnimatedNumbers from "react-animated-numbers";
import SelectInput from "../inputFields/selectInput";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import { Row, CardBody, Form, FormGroup, Button, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

import { CardComponent } from "./CardComponent";

import "bootstrap-daterangepicker/daterangepicker.css";
import "dropzone/dist/min/dropzone.min.css";

import "react-tagsinput/react-tagsinput.css";

import "rc-switch/assets/index.css";

import "react-datepicker/dist/react-datepicker.css";

const Analytics = (props) => {
  const { match } = props;

  const [overlayLoading, setOverlayLoading] = useState(true);
  const [cardData, setCardData] = useState("");
  const [TransactionData, setTransactionData] = useState("");

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [transactionTitle, setTransactionTitle] = useState([
    "Inter Bank Funds transfer",
    "Funds transfer",
    "Mobile Top-up",
    "Bill Payment",
    "Pay to CNIC",
    "Merchant Payment",
  ]);

  const thousandSeparator = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [days, setDays] = useState([
    { name: "0", value: "Today" },
    { name: "1", value: "Yesterday" },
    { name: "2", value: "Month till date" },
    { name: "3", value: "Year till date" },
    { name: "4", value: "Launch till date" },
    { name: "5", value: "Selected Date" },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
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

  useLayoutEffect(() => {
    const val = selectedValue;

    if (val !== "5") {
      setStartingDate("");
      setEndingDate("");
      getAnalyticsData(val);
    }

    // console.log("dashboardTime",config.values.dashboardTime);
    //   config.dashboardTime
    const interval = setInterval(
      () => 
      getAnalyticsData(val),
      config.values.dashboardTime
    );
    return () => clearInterval(interval);
  }, [selectedValue]);

  const getAnalyticsData = async (value) => {
    setOverlayLoading(true);
    const payload = {
      day: value ? value : 0,
      fromDate: startingDate ? moment(startingDate).format("YYYY-MM-DD") : "",
      toDate: endingDate ? moment(endingDate).format("YYYY-MM-DD") : "",
    };
    const url = `${config.url.ib_backoffice}${config.endpoint.nbpdigital.analytics}`;
    await axios
      .post(url, payload, getHeaders())
      .then((res) => {
        const { data } = res;
        const cards = data.data.cards;
        const transaction = data.data.transaction;
        if (data.status == "200") {
          // NotificationContainer.error("Unknown Error", "");
          setOverlayLoading(false);
          setCardData(cards);
          setTransactionData(transaction);
          // gettransactionData(transaction);

          // setData(parsedData);
        }
      })
      .catch((err) => {
        // NotificationContainer.error("ERR_CONNECTION_REFUSED", "");

        setOverlayLoading(false);
        onFailure(err);
      });
  };
  const gettransactionData = (transaction) => {
    let transactionTable = [];

    // Object.values(transaction).map((t) => {
    //   transactionTable.push(t);
    // })

    // data.forEach((element) => {
    //   console.log("ELEMENT =>> ", element);
    //   // element.append()
    // });
    // for (const [i, transactionTitle] of transactionTitle.entries()) {
    //   transactionTable.push(transactionTitle)
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = selectedValue;
    getAnalyticsData(val);
  };

  const handleChange = async (e) => {
    // // console.log(e.target.name);
    // if (e.target.name === "usc") {
    //   setUsc(e.target.checked);
    // } else if (e.target.name === "mpos") {
    //   setMpos(e.target.checked);
    // } else {
    const name = await days.find(
      (o, index) => o.value === e.target.value && days[index].name
    );

    if (name.name === "5") {
      setCardData("");
      setTransactionData("");
      setIsDateSelected(true);
    } else {
      setIsDateSelected(false);
    }
    setSelectedValue(name.name);
    // }
  };

  const handleChangeStart = (date) => {
    setStartingDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndingDate(date);
  };

  const onFailure = (error) => {
    if (error.data) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("error.response: ", error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.data.message);
      console.log(error.response.headers);

      NotificationManager.error(
        error.response.data.message,
        error.response.status,
        3000,
        null,
        null,
        "filled"
      );
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log("getDataAgainstCnic error.request: ", error.request);
      NotificationManager.error(
        "ERR_CONNECTION_REFUSED",
        "",
        3000,
        null,
        null,
        "filled"
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("getDataAgainstCnic else error: ", error.message);
      NotificationManager.error(
        "ERR_CONNECTION_REFUSED",
        "",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  const dataTableColumns = [
    {
      Header: "Transactions",
      accessor: "title",
      filterable: false,

      Cell: (props) => <p className="list-item-heading">{props.value}</p>,
    },
    {
      Header: "Count",
      accessor: "payment_c",
      filterable: false,
      Cell: (props) => (
        <p className="font-weight-bold">{thousandSeparator(props.value)}</p>
      ),
    },
    {
      Header: "Volume",
      accessor: "payment",
      filterable: false,

      Cell: (props) => (
        <p className="text-muted">{thousandSeparator(props.value)}</p>
      ),
    },
  ];

  return (
    <>
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
              <IntlMessages id="menu.Analytics" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        {overlayLoading && <LoadingOverlay style={{ zIndex: 2000 }} />}
        <Row className={"container-fluid"}>
          <Colxx xxs="12" xl="12">
            {/* {overlayLoading && <LoadingOverlay style={{ zIndex: 2000 }} />} */}
            {/* <form onSubmit={(e) => handleSubmit(e)}> */}
            <Row>
              <Colxx xxs="12">
                <div>
                  <SelectInput
                    // label={"Select Action"}
                    placeholder={"Select Action"}
                    options={days}
                    required={true}
                    handleChange={(e) => handleChange(e)}
                    isFrom="analytics"
                    style={{ borderRadius: "12px" }}
                    // value={!selectedValue && days[0].value}
                    // name="selectDate"
                  />
                </div>
              </Colxx>
            </Row>
            {isDateSelected && (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-1">
                  <Colxx xxs="12">
                    <Label className="font-weight-bold">DateRange :</Label>
                  </Colxx>
                  <Colxx xxs="6">
                    <FormGroup>
                      <div>
                        <DatePicker
                          selected={startingDate}
                          selectsStart
                          required
                          dateFormat="yyyy-MM-dd"
                          startDate={startingDate}
                          endDate={endingDate}
                          onChange={handleChangeStart}
                          placeholderText={`${moment(new Date()).format(
                            "YYYY-MM-DD"
                          )}`}
                        />
                      </div>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6">
                    <FormGroup>
                      <div>
                        <DatePicker
                          selected={endingDate}
                          selectsEnd
                          required
                          dateFormat="yyyy-MM-dd"
                          startDate={startingDate}
                          endDate={endingDate}
                          onChange={handleChangeEnd}
                          placeholderText={`${moment(new Date()).format(
                            "YYYY-MM-DD"
                          )}`}
                        />
                      </div>
                    </FormGroup>
                  </Colxx>

                  <Colxx className="mb-2" xxs="12">
                    <div>
                      <Button
                        style={{ float: "right" }}
                        color="primary"
                        type="submit"
                        size="lg"
                      >
                        <i className="fa fa-search" />{" "}
                        <span className="label">Submit</span>
                      </Button>
                    </div>
                  </Colxx>
                </Row>
              </Form>
            )}
            <Row>
              <Colxx xxs="12">
                <div>
                  {/* <div className="d-flex align-items-center mt-3">
                    <h1
                      style={{
                        color: "#23527c",
                        cursor: "pointer",
                        // fontWeight: "bold",
                      }}
                    >
                      <IntlMessages id="title.analytics.Transaction" />
                    </h1>
                  </div> */}
                  <div>
                    <Row className={"Container"}>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBody p-3 m-1 round"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>Registered Customers</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                              // className="m-0 text-center"
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totRegCustomerAll
                                    ? 0
                                    : cardData?.totRegCustomerAll
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBody p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 12 }}>
                                <strong>Level 0</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totRegCustomerL0
                                    ? 0
                                    : cardData?.totRegCustomerL0
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBody p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 12 }}>
                                <strong>Level 1</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totRegCustomerL1
                                    ? 0
                                    : cardData?.totRegCustomerL1
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
              <strong>123456</strong>
            </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBody p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 12 }}>
                                <strong>Level 2</strong>
                                {/* <strong>Total active merchants</strong> */}
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totRegCustomerL2
                                    ? 0
                                    : cardData?.totRegCustomerL2
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>

                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyothers p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>
                                  Unique customers who successfully login
                                </strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totActiveUsers
                                    ? 0
                                    : cardData?.totActiveUsers
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyothers p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>Androids</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.activeAndroidUsers
                                    ? 0
                                    : cardData?.activeAndroidUsers
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyothers p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>IOS</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.activeIosUsers
                                    ? 0
                                    : cardData?.activeIosUsers
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>
                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyothers p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>Internet Banking</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.activeIbUsers
                                    ? 0
                                    : cardData?.activeIbUsers
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>

                      {/* Referal Code  */}

                      <Row style={{ width: "100%", marginLeft: "0.2rem" }}>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyFourthRow p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  {/* <strong>Total Issuance Referals</strong> */}
                                  <strong>Total Activation Referrals</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.dcIssuanceReferalCode
                                      ? 0
                                      : cardData?.dcIssuanceReferalCode
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyFourthRow p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  {/* <strong>Total Registration Referals</strong> */}
                                  <strong>Total Issuance Referrals</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.registrationReferalCode
                                      ? 0
                                      : cardData?.registrationReferalCode
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyFourthRow p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  {/* <strong>Total Activation Referals</strong> */}
                                  <strong>Total Registration Referrals</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.dcActivationReferalCode
                                      ? 0
                                      : cardData?.dcActivationReferalCode
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyFourthRow p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  {/* <strong>Total Activation Referals</strong> */}
                                  <strong>Unique Referrals Employee</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.uniqueReferalCode
                                      ? 0
                                      : cardData?.uniqueReferalCode
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                      </Row>

                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyThirdRow p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>Total Transacting Customer</strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totalTxnCustomer
                                    ? 0
                                    : cardData?.totalTxnCustomer
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>

                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyThirdRow p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>
                                  Total Transacting Customer Mobile
                                </strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totalTxnCustomerMobile
                                    ? 0
                                    : cardData?.totalTxnCustomerMobile
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>

                      <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                        <CardBody className={"cardBodyThirdRow p-3 m-1"}>
                          <div>
                            <div style={{ color: "#303030" }}>
                              <p fontStyle={{ fontSize: 15 }}>
                                <strong>
                                  Total Transacting Customer Browser
                                </strong>
                              </p>
                            </div>
                            <div
                              style={{
                                // width: "25%",
                                // height: "20%",
                                color: "#303030",
                              }}
                            >
                              <AnimatedNumbers
                                includeComma={true}
                                animateToNumber={
                                  !cardData?.totalTxnCustomerBrowser
                                    ? 0
                                    : cardData?.totalTxnCustomerBrowser
                                }
                                fontStyle={{
                                  fontSize: 23,
                                  fontWeight: "bold",
                                }}
                                configs={(number, index) => {
                                  return {
                                    mass: 1,
                                    tension: 230 * (index + 1),
                                    friction: 150,
                                  };
                                }}
                              ></AnimatedNumbers>
                              {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                            </div>
                          </div>
                        </CardBody>
                      </Colxx>

                      

                      {/* Debit Card */}
                      <Row style={{ width: "100%", marginLeft: "0.2rem" }}>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyUsc p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  <strong>Debit Card Activate</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.totDebitCardActivate
                                      ? 0
                                      : cardData?.totDebitCardActivate
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                        <Colxx xxs="12" xs="12" sm="6" md="6" lg="4" xl="3">
                          <CardBody className={"cardBodyUsc p-3 m-1"}>
                            <div>
                              <div style={{ color: "#303030" }}>
                                <p fontStyle={{ fontSize: 15 }}>
                                  <strong>Debit Card Request</strong>
                                </p>
                              </div>
                              <div
                                style={{
                                  // width: "25%",
                                  // height: "20%",
                                  color: "#303030",
                                }}
                              >
                                <AnimatedNumbers
                                  includeComma={true}
                                  animateToNumber={
                                    !cardData?.totDebitCardRequest
                                      ? 0
                                      : cardData?.totDebitCardRequest
                                  }
                                  fontStyle={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                  }}
                                  configs={(number, index) => {
                                    return {
                                      mass: 1,
                                      tension: 230 * (index + 1),
                                      friction: 150,
                                    };
                                  }}
                                ></AnimatedNumbers>
                                {/* <h1 >
                  <strong>123456</strong>
                </h1> */}
                              </div>
                            </div>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </Row>
                  </div>
                  <div>
                    <Row className={"mt-2 Container"}>
                      <Colxx xxs="12">
                        <Row>
                          <Colxx
                            id="card-title"
                            xxs="12"
                            xs="12"
                            sm="12"
                            md="12"
                            lg="6"
                            xl="6"
                          >
                            <div className="pl-2 d-flex flex-grow-1">
                              <div className="card-body align-self-center d-flex flex-column flex-lg-row flex-sm-row flex-md-row justify-content-between min-width-zero align-items-lg-center">
                                <p className="list-item-heading font-weight-bold mb-1 truncate w-40 w-sm-100">
                                  Payment Type
                                </p>
                                <p className="mb-1 text-heading font-weight-bold w-25 w-sm-100">
                                  Count
                                </p>
                                <p className="mb-1 text-heading font-weight-bold w-25 w-sm-100">
                                  Volume
                                </p>
                              </div>
                            </div>
                          </Colxx>
                          <Colxx xxs="12" xs="12" sm="12" md="12" lg="6" xl="6">
                            <div className="pl-2 d-flex flex-grow-1">
                              <div className="card-body align-self-center d-flex flex-column flex-lg-row flex-sm-row flex-md-row justify-content-between min-width-zero align-items-lg-center">
                                <p className="list-item-heading font-weight-bold mb-1 truncate w-40 w-sm-100">
                                  Payment Type
                                </p>
                                <p className="mb-1 text-heading font-weight-bold w-25 w-sm-100">
                                  Count
                                </p>
                                <p className="mb-1 text-heading font-weight-bold w-25 w-sm-100">
                                  Volume
                                </p>
                              </div>
                            </div>
                          </Colxx>
                          <CardComponent
                            title={transactionTitle[0]}
                            count={TransactionData.ibftC}
                            volume={TransactionData.ibft}
                          />
                          <CardComponent
                            title={transactionTitle[1]}
                            count={TransactionData.threepft_c}
                            volume={TransactionData.threepft}
                          />
                          <CardComponent
                            title={transactionTitle[2]}
                            count={TransactionData.telcoC}
                            volume={TransactionData.telco}
                          />
                          <CardComponent
                            title={transactionTitle[3]}
                            count={TransactionData.billPaymentC}
                            volume={TransactionData.billPayment}
                          />
                          <CardComponent
                            title={transactionTitle[4]}
                            count={TransactionData.payToCNIC_c}
                            volume={TransactionData.payToCNIC}
                          />
                          <CardComponent
                            title={transactionTitle[5]}
                            count={TransactionData.merchantPayment_c}
                            volume={TransactionData.merchantPayment}
                          />
                        </Row>
                      </Colxx>

                      {/* <Colxx xxs="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <Card>
                    <CardBody className={"p-3 m-1 round"}>
                      <div>
                        
                        <ReactTable
                          data={data}
                          columns={dataTableColumns}
                          // defaultPageSize={5}
                          defaultPageSize={data.length}
                          filterable={true}
                          showPageJump={true}
                          PaginationComponent={DataTablePagination}
                          // showPageSizeOptions={true}
                          showPagination={false}
                          
                        />
                      
                      </div>
                    </CardBody>
                  </Card>
                      </Colxx> */}
                    </Row>
                  </div>
                </div>
              </Colxx>
            </Row>

            {/* </form> */}
          </Colxx>
        </Row>
      </Colxx>
    </>
  );
};

export default Analytics;
