import React, { Component } from "react";
import ReactTable from "react-table";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import DataTablePagination from "../../../../components/DatatablePagination";
import { formFields, validationSchema, cardData } from "./form/formmeta";
import { buttonFields } from "./buttons/buttonmeta";
import { fetchIps, updateIps } from "./apiCalls";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import { Row, Card, CardBody, CardTitle, Label } from "reactstrap";
import IconCard from "components/cards/IconCard";
import {getDataAgainstCnic} from './apiCalls'
export default class CnicTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editInitValues: {
        cnic: "",
        // isTabon: "",
      },
      tableData: [],
      collapse: true,
      items: [],
      pagination: {
        totalPages: 10,
        currentPage: 1,
        TotalSize: 0,
        selectedPageSize: 10,
      },
    };
  }

  // componentDidMount() {
  //   const { orderBy, searchCriteria } = this.state;
  //   const { currentPage, selectedPageSize } = this.state.pagination;

  //   fetchIps(
  //     selectedPageSize,
  //     currentPage,
  //     orderBy,
  //     searchCriteria,
  //     this.onFetchSuccess,
  //     this.onFetchFailure
  //   );

  //   this.setState({
  //     isLoading: false,
  //     tableLoading: true,
  //   });
  // }

  // componentWillUnmount() {
  //   clearInterval(mountInterval);
  //   this.mouseTrap.unbind("ctrl+a");
  //   this.mouseTrap.unbind("command+a");
  //   this.mouseTrap.unbind("ctrl+d");
  //   this.mouseTrap.unbind("command+d");
  // }

  onFetchFailure = () => {
    this.setState({
      tableData: [],
      items: [],
    })
  }
  onFetchSuccess = (data) => {
    console.log("data: ", data);
    // const { resp, totalPages, currentPage } = data;
    // this.setState({
    //   items: resp,
    //   pagination: {
    //     ...this.state.pagination,
    //     currentPage: currentPage + 1,
    //     totalPages,
    //   },
    //   tableLoading: false,
    //   isLoading: false,
    //   showLoadingOverlay: false,
    // });
    const cardInfo = data?.beneficiaryData;
    console.log("cardInfo",cardInfo)
    // const keys = Object.keys(cardData);
    for(let i of cardData){
      console.log("iiii",i);
      console.log("i",i?.["text"]);
      i["value"] = cardInfo?.[i?.text]
      
    }
    console.log("cardData",cardData)
    this.setState({
      tableData: data?.merchantDetailResponse,
      items:cardData
    })
  };

  // onFetchFailure = (error) => {
  //   console.log(error + "<<=Error");
  //   this.setState({
  //     items: [],
  //     tableLoading: false,
  //     isLoading: false,
  //     showLoadingOverlay: false,
  //   });
  // };

  // onUpdateSuccess = (data) => {
  //   const { orderBy, searchCriteria } = this.state;
  //   const { currentPage, selectedPageSize } = this.state.pagination;

  //   // re-fetch data from server.
  //   fetchIps(
  //     selectedPageSize,
  //     currentPage,
  //     orderBy,
  //     searchCriteria,
  //     this.onFetchSuccess,
  //     this.onFetchFailure
  //   );
  // };

  // onUpdateError = (error) => {
  //   this.setState({ showLoadingOverlay: false });
  // };

  // handleOnPageChange = (selectedPage) => {
  //   selectedPage = Number(selectedPage);
  //   const { orderBy, searchCriteria, pagination } = this.state;
  //   const { selectedPageSize } = pagination;

  //   this.setState({
  //     tableLoading: true,
  //     pagination: { ...pagination, currentPage: selectedPage },
  //   });

  //   fetchIps(
  //     selectedPageSize,
  //     selectedPage,
  //     orderBy,
  //     searchCriteria,
  //     this.onFetchSuccess,
  //     this.onFetchFailure
  //   );
  // };

  // handleOnSort = (orderBy) => {
  //   const { searchCriteria, pagination } = this.state;
  //   const { currentPage, selectedPageSize } = pagination;

  //   this.setState({
  //     tableLoading: true,
  //   });

  //   fetchIps(
  //     selectedPageSize,
  //     1,
  //     orderBy,
  //     searchCriteria,
  //     this.onFetchSuccess,
  //     this.onFetchFailure
  //   );
  // };

  // handleOnSearch = (searchCriteria) => {
  //   console.log("search criteria: ", searchCriteria);

  //   const { orderBy } = this.state;
  //   const { currentPage, selectedPageSize } = this.state.pagination;

  //   this.setState({
  //     searchCriteria,
  //     tableLoading: true,
  //   });

  //   fetchIps(
  //     selectedPageSize,
  //     1,
  //     orderBy,
  //     searchCriteria,
  //     this.onFetchSuccess,
  //     this.onFetchFailure
  //   );
  // };

  toggle = (updatedItem) => {
    const {cnic} = updatedItem;
    this.setState({ collapse: true });
    console.log("updated item: ", updatedItem.cnic);
    getDataAgainstCnic(cnic,this.onFetchSuccess,this.onFetchFailure)
  };

  columns = [
    {
      Header: () => (
        <div>
          Date/Time <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "stampDate",
      accessor: "transactionDateTime",
      width: 200,
      filterable: false,
    },
    {
      Header: "Bill Number",
      id: "billnumber",
      accessor: "billNumber",
      width: 250,
      filterable: false,
    },
    {
      Header: "Merchant ID",
      id: "marchantid",
      accessor: "mid",
      width: 250,
      filterable: false,
    },
    {
      Header: "Merchant Name",
      id: "marchantname",
      accessor: "merchantDBA",
      width: 250,
      filterable: false,
    },
    {
      Header: "TotalAmount",
      id: "totalamount",
      accessor: "totalAmount",
      width: 250,
      filterable: false,
    },
    {
      Header: "Subsidy",
      id: "totalsubsidy",
      accessor: "totalSubsidy",
      width: 250,
      filterable: false,
    },
    {
      Header: "Payment Status",
      id: "paymentstatus",
      accessor: "paymentStatus",
      width: 250,
      filterable: false,
    },
    {
      Header: "Net Amount",
      id: "netamount",
      accessor: "netAmount",
      width: 250,
      filterable: false,
    },
    
    // {
    //   Header: "Quantity",
    //   id: "qty",
    //   accessor: "qty",
    //   width: 250,
    //   filterable: false,
    // },

    // {
    //   Header: "Rate",
    //   id: "rate",
    //   accessor: "rate",
    //   width: 250,
    //   filterable: false,
    // },
    // {
    //   Header: "TransactionId",
    //   id: "transactionid",
    //   accessor: "transactionId",
    //   width: 250,
    //   filterable: false,
    // },
    // {
    //   Header: "Subsidy",
    //   id: "subsidygiven",
    //   accessor: "subsidy",
    //   width: 250,
    //   filterable: false,
    // },
    // {
    //   Header: "Stan",
    //   id: "stan",
    //   accessor: "stan",
    //   width: 250,
    //   filterable: false,
    // },
    // {
    //   Header: "Rrn",
    //   id: "rrn",
    //   accessor: "rrn",
    //   width: 250,
    //   filterable: false,
    // },
    
  ];
  render() {
    const { match } = this.props;
    {
      console.log(this.props, "<<+Props");
    }
    const { selectedPageSize, totalPages, currentPage } = this.state.pagination;
    console.log({ totalPages, currentPage });
    const { tableData } = this.state;
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
                <IntlMessages id="menu.CnicTransaction" />
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
                    buttonFields={buttonFields}
                    validationSchema={validationSchema}
                    initialValues={this.state.editInitValues}
                    handleSubmit={this.toggle}
                    call={true}
                    // key = {"knowYourUserForm"}
                    // formName = {"knowYourUserForm"}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        {(this.state.collapse && tableData.length > 0) ? (
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
                            data={tableData.slice(0,9)}
                            columns={this.columns}
                            filterable={true}
                            // className="-highlight react-table-fixed-height"
                            // style={{ cursor: "pointer" }}
                            TbodyComponent={CustomTBodyComponent}
                            pages={totalPages}
                            showPagination={false}
                            showPageJump={true}
                            showPageSizeOptions={false}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            // loading={tableLoading}
                            defaultPageSize={10}
                            // PaginationComponent={DataTablePagination}
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
          </>
        ) : null}
      </>
    );
  }
}
