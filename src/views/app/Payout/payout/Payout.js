import React, { Component } from "react";
import ReactTable from "react-table";
import moment from "moment";
import { CustomInputElement } from "components/custom/customInput";
import CheckDownloadable from "../CheckDownloadable.txt";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import DataTablePagination from "../../../../components/DatatablePagination";
import { formFields, validationSchema, data } from "./form/formmeta";
import { buttonFields } from "./buttons/buttonmeta";
// import { fetchIps, updateIps } from "./apiCalls";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import { Row, Card, CardBody, CardTitle, Label, Button } from "reactstrap";
import IconCard from "components/cards/IconCard";
export class Payout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editInitValues: {
        cnic: "",
        // isTabon: "",
      },
      collapse: false,
      Items: [],
      startDate: new Date(),
      pagination: {
        totalPages: 10,
        currentPage: 1,
        TotalSize: 0,
        selectedPageSize: 10,
      },
    };
  }

  toggle = () => {
    this.setState({ collapse: true });
  };

  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  columns = [
    {
      Header: "Merchant ID",
      id: "merchantid",
      accessor: "merchantid",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Merchant Name",
      id: "Merchantname",
      accessor: "Merchantname",
      width: 200,
      Filter: CustomInputElement(),
      filterable: false,
    },
    {
      Header: "Merchant Status",
      id: "status",
      accessor: "status",
      width: 200,
      filterable: false,
    },
    {
      Header: "Total number of transactions",
      id: "nooftransaction",
      accessor: "nooftransaction",
      width: 200,
      filterable: false,
    },
    {
      Header: "Bank ID",
      id: "bandid",
      accessor: "bankid",
      width: 200,
      Filter: CustomInputElement(),
      filterable: false,
    },
    {
      Header: "Bank Name",
      id: "bankname",
      accessor: "bankname",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "IBAN",
      id: "iban",
      accessor: "iban",
      width: 200,
      filterable: false,
    },

    {
      Header: "Amount",
      id: "amount",
      accessor: "amount",
      width: 200,
      filterable: false,
    },
  ];
  render() {
    const { match, name, value, className } = this.props;

    console.log(this.props, "<<+Props");
    const { selectedPageSize, totalPages, currentPage } = this.state.pagination;
    console.log({ totalPages, currentPage });
    const { Items } = this.state;

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
                <IntlMessages id="menu.Payout" />
              </h1>
              <Breadcrumb match={match} />
            </div>
          </div>
          {/* style={{ overflow: "hidden" }} for upper of ForM */}
          <Card>
            <CardBody>
              <Colxx xxs="4">
                <div>
                  <label>
                    <IntlMessages id="form-components.date" />
                  </label>
                  <DatePicker
                    selected={this.state.startDate}
                    dateFormat="dd-MM-yyyy"
                    style={{ height: "46px !important" }}
                    onChange={(date) => {
                      this.setState({ startDate: date });
                      const isValid = moment(date, ["DD-MM-YYYY"]).isValid();
                      let formatedDate = "";
                      if (isValid)
                        formatedDate = moment(date).format("DD-MM-YYYY");
                      // onChange(formatedDate);
                    }}
                  />
                </div>
              </Colxx>
              <Colxx className="d-flex align-items-end justify-content-end">
                <div className="mt-1">
                  {/* <span
                        onClick={this.toggle}
                        // className="m-1"
                        style={{
                          //   color: "#23527c",
                          cursor: "pointer",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      > */}

                  <Link
                    to={CheckDownloadable}
                    target="_blank"
                    download
                    className="mt-3"
                  >
                    <Button
                      color="primary"
                      // className={`btn-shadow btn-multiple-state ${
                      //   this.state.loading ? "show-spinner" : ""
                      // }`} // For
                      size="md"
                      onClick={this.toggle}
                    >
                      {/* <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span> */}
                      <span className="label">
                        <IntlMessages id="Generate-button" />
                      </span>
                    </Button>
                    {/* Generate Payout File */}
                  </Link>
                  {/* </span> */}
                </div>
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>
        {this.state.collapse ? (
          <Colxx xxs="12" className="mt-4">
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
                      <CardBody>
                        <ReactTable
                          data={Items}
                          columns={this.columns}
                          filterable={true}
                          // className="-highlight react-table-fixed-height"
                          // style={{ cursor: "pointer" }}
                          TbodyComponent={CustomTBodyComponent}
                          pages={totalPages}
                          showPagination={true}
                          showPageJump={true}
                          showPageSizeOptions={false}
                          showPaginationTop={true}
                          showPaginationBottom={false}
                          // loading={tableLoading}
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
                          //   console.log("hello world....",filtered);
                          //   const searchCriteria = transformToObject(filtered);
                          //   console.log(searchCriteria,"<<=Searching")
                          //   this.handleOnSearch(searchCriteria); // Trigger handle search
                          // }}
                        />
                      </CardBody>
                    </Colxx>
                  </Row>
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        ) : null}
      </>
    );
  }
}

export default Payout;
