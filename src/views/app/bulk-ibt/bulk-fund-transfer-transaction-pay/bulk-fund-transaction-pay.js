import React, { Component } from "react";
import ReactTable from "react-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import { CustomInputElement } from "components/custom/customInput";

import CustomTBodyComponent from "components/custom/customtablebody";
import { Colxx  } from "components/common/CustomBootstrap";
import DataTablePagination from "../../../../components/DatatablePagination";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import {
  Row,
  Card,
  CardBody,
} from "reactstrap";


export default class fundTransferTransactionPay extends Component {
    constructor(props) {
        super(props);
    
        this.mouseTrap = require("mousetrap");
    
        this.state = {
          Items: [],
          pagination: {
            totalPages: 10,
            currentPage: 1,
            TotalSize: 0,
            selectedPageSize: 10,
          },
        };
      }

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
          Cell: ({ original }) => this.getDateCell(original),
          Filter: ({ filter, onChange }) => {
            return (
              <div>
                <DatePicker
                  selected={this.state.selectedDate}
                  dateFormat="dd-MM-yyyy"
                  style={{ height: "20px" }}
                  onChange={(date) => {
                    this.setState({ selectedDate: date });
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
          id: "mobilenumber",
          accessor: "mobilenumber",
          width: 150,
          Filter: CustomInputElement(),
        },
        {
          Header: "Account(PKR)",
          id: "account",
          accessor: "account",
          width: 150,
          Filter: CustomInputElement(),
        },
        {
          Header: "Company Name",
          id: "companyname",
          accessor: "companyname",
          width: 120,
          Filter: CustomInputElement(),
        },
    
        {
          Header: "BankName",
          id: "bannamne",
          accessor: "bankname",
          width: 150,
          filterable: false,
        },
    
        {
          Header: "STAN",
          id: "stan",
          accessor: "stan",
          width: 150,
          filterable: false,
        },
        {
          Header: "Auth ID",
          id: "authid",
          accessor: "authid",
          width: 150,
          filterable: false,
        },
        {
          Header: "Status",
          id: "status",
          accessor: "status",
          width: 150,
          filterable: false,
        },
        {
          Header: "To Account/Consumer NO",
          id: "accountorConsumer",
          accessor: "accountorConsumer",
          width: 150,
          filterable: false,
        },
        {
          Header: "Activity",
          id: "activity",
          accessor: "activity",
          width: 150,
          filterable: false,
        },
    
        {
          Header: "Txn Ref no",
          id: "txnRef",
          accessor: "txnRef",
          width: 150,
          filterable: false,
        },
        {
          Header: "Chanel",
          id: "chanel",
          accessor: "chanel",
          width: 150,
          filterable: false,
        },
      ];
    render() {
        const { match } = this.props;
    {
      console.log(this.props, "<<+Props");
    }

    const { selectedPageSize, totalPages, currentPage } = this.state.pagination;
    console.log({ totalPages, currentPage });
    const {Items} = this.state
    // var [startDate, endDate] = this.state.dateRange;
    // console.log("startDate: ", startDate, " endDate: ", endDate);

        return (
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
                <IntlMessages id="menu.SupervisorPayment" />
              </h1>
              <Breadcrumb match={match} />
            </div>
          </div>
          {/* style={{ overflow: "hidden" }} for upper of ForM */}
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12">
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
                              onPageChange={(selectedPage) => this.handleOnPageChange(selectedPage+1) }
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
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        )
    }
}
