import React, { Component } from "react";
import ReactTable from "react-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
// import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
// import DataTablePagination from "../../../../components/DatatablePagination";
import { formFields, validationSchema, cardData } from "./form-data";
// import { buttonFields } from "./buttons/buttonmeta";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  ModalBody,
  Modal,
  ModalHeader,
} from "reactstrap";
import IconCard from "components/cards/IconCard";
import OtpInput from "react-otp-input";

export default class Merchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      collapse: true,
      editInitValues: {
        cnic: "",
      },
      otp: "",
      items: [],
      merchantInfo: {},
      enterOtp: false,
    };
  }

  buttonFields = [
    {
      label: "search-button",
      className: "m-1 text-right",
      color: "primary",
      outline: false,
      field: {
        fieldName: "isTabon",
        value: true,
      },
    },
  ];

  handleChange = (otp) => {
    console.log("otp  : ", otp);
    this.setState({ otp });
  };

  onFetchFailure = () => {
    this.setState({
      tableData: [],
      items: [],
    });
  };

  onFetchSuccess = (data) => {
    console.log("data: ", data);
    const cardInfo = data?.beneficiaryData;
    console.log("cardInfo", cardInfo);
    // const keys = Object.keys(cardData);
    for (let i of cardData) {
      console.log("iiii", i);
      console.log("i", i?.["text"]);
      i["value"] = cardInfo?.[i?.text];
    }
    console.log("cardData", cardData);
    this.setState({
      tableData: data?.merchantDetailResponse,
      items: cardData,
    });
  };

  handleSubmit = (updatedItem) => {
    // const {cnic} = updatedItem;
    // this.setState({ collapse: true });
    // console.log("updated item: ", updatedItem.cnic);
    // getDataAgainstCnic(cnic,this.onFetchSuccess,this.onFetchFailure)
  };

  render() {
    const { match } = this.props;
    const { editInitValues, enterOtp, otp } = this.state;

    //   <CardTitle
    //     className="mb-1"
    //     style={{
    //       color: "#23527c",
    //       cursor: "pointer",
    //       fontWeight: "bold",
    //     }}
    //   >
    return (
      <>
        <Colxx xxs="12">
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <h1
              // style={{
              //   color: "#23527c",
              //   cursor: "pointer",
              //   fontWeight: "bold",
              // }}
              >
                <IntlMessages id="menu.merchantInfo" />
              </h1>
              <Breadcrumb match={match} />
            </div>
          </div>
          {/* style={{ overflow: "hidden" }} for upper of ForM */}
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12">
                  <FormikCustomComponents
                    formFields={formFields}
                    buttonFields={this.buttonFields}
                    validationSchema={validationSchema}
                    initialValues={this.state.editInitValues}
                    handleSubmit={this.handleSubmit}
                    call={true}
                    key={"merchant-form"}
                    formName={"Merchant Info Form"}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        {/* to show merchant data */}
        <>
          <Colxx xxs="12" className="mt-4">
            <Card>
              <Row>
                <Colxx xxs="12">
                  <Row className="icon-cards-row mt-4 mx-2 d-flex justify-content-around">
                    {cardData.map((item, index) => {
                      return (
                        <Colxx
                          xxs="6"
                          sm="4"
                          md="3"
                          lg="2"
                          key={`icon_card_${index}`}
                          // className="mr-"
                        >
                          <IconCard {...item} className="mb-4" />
                        </Colxx>
                      );
                    })}
                  </Row>
                </Colxx>
              </Row>
            </Card>
          </Colxx>
          {enterOtp && (
            <Modal
              isOpen={modalOpen}
              toggle={toggleModal}
              wrapClassName={position}
              size="lg"
              // style={{maxWidth: '80vw', width: '100%'}}
              backdrop="static"
            >
              <ModalHeader toggle={toggleModal}>
                <IntlMessages id={modalName} />
              </ModalHeader>
              <ModalBody>
                <OtpInput
                  value={otp}
                  onChange={this.handleChange}
                  numInputs={6}
                  separator={<span>-</span>}
                />
              </ModalBody>
            </Modal>
          )}
          {/* <Colxx xxs="12" className="mt-4">
              <Row>
                <Colxx xxs="12" xs="6" lg="12">
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
                    <Row>
                      <Colxx sm="12">
                      </Colxx>
                    </Row>
                  </Card>
                </Colxx>
              </Row>
            </Colxx> */}
        </>
        {/* ) : null} */}
      </>
    );
  }
}
