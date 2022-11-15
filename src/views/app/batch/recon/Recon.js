import React, { Component } from "react";
import ReactTable from "react-table";
import { Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import CustomModal from "containers/modals/CustomModal";
import { CustomInputElement } from "components/custom/customInput";
import CustomSelect from "components/custom/customSelect";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx } from "components/common/CustomBootstrap";
// import { transformToObject } from "helpers/Utils";
// import { fetchIps, updateIps } from "./apiCalls";
import DemoData from './DummyData'
import DataTablePagination from "../../../../components/DatatablePagination";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
// import Pagination from "reactstrap/lib/Pagination";

let mountInterval = -1;

class Recon extends Component {
  constructor(props) {
    super(props);

    this.mouseTrap = require("mousetrap");

    this.state = {
      isLoading: true,
      showLoadingOverlay: false,
      tableLoading: true,

      pagination: {
        totalPages: 10,
        currentPage: 1,
        selectedPageSize: 10,
      },
      items: [{
          batchId: "NBPBPKKA1611200000000020",
          type: "Payment",
          sender: "CGAPKKAA",
          receiver: "NBPBPKKA",
          date: "14-12-2020",
          total: 20,
          success:10,
          fail:5,
          timeout:5,
          processing:0
      },
      {
        batchId: "NBPBPKKA1611200000000020",
        type: "Payment",
        sender: "CGAPKKAA",
        receiver: "NBPBPKKA",
        date: "16-11-2020",
        total: 1,
        success:0,
        fail:0,
        timeout:1,
        processing:0
    }
    ],
    //   TopTenItems:[],
      orderBy: {
        column: "stampDate",
        asec: false,
      },
      searchCriteria: {
        email: "",
        name: "",
        id: "",
        body: "",
      },
      editModalOpen: false,
      editModalInitValues: {},
    };
  }

//   componentDidMount() {
//     // const { orderBy, searchCriteria } = this.state;
//     const { currentPage, selectedPageSize } = this.state.pagination;

//     fetchIps(
//         selectedPageSize,
//         currentPage,
//         // orderBy,
//         // searchCriteria,
//         this.onFetchSuccess,
//         this.onFetchFailure
//     );

//     this.setState({
//       isLoading: false,
//       tableLoading: true,
//     });
//   }

  handleOnPageChange = (selectedPage) => {
      console.log(selectedPage);
    // selectedPage = Number(selectedPage);
    const {pagination } = this.state;
    const {items} = this.state;
    const { selectedPageSize ,currentPage } = pagination;

    console.log( items,"<<=ITems")
    const nextpageItems = items.slice((selectedPage-1)*selectedPageSize,selectedPageSize*selectedPage);
    console.log(nextpageItems)
    console.log((selectedPage-1)*10,"SelectedPage");
    console.log(selectedPageSize*selectedPage);
    this.setState({
    //   tableLoading: true,
    //   items: [...items, nextpageItems],
    TopTenItems: nextpageItems,
  
      pagination: { ...pagination, currentPage: selectedPage },
    });
}

//   onFetchFailure = (error) => {
//     console.log(error + "<<=Error");
//     this.setState({
//       items: [],
//       tableLoading: false,
//       isLoading: false,
//       showLoadingOverlay: false,
//     });
//   };


//   onFetchSuccess = (data) => {
//     console.log("data: ", data);
//     const { currentPage,selectedPageSize} = this.state.pagination
//     // const { resp, totalPages, currentPage } = data;
//     const TenItems = data.slice(currentPage-1,selectedPageSize)
//     console.log(TenItems , "<<=abc")
//     const totalPages = Math.ceil(data.length/selectedPageSize)

//     console.log(totalPages, "<<=PageCalculate")
//     this.setState({
//       items: data,
//       TopTenItems: TenItems,
//       pagination: {
//         ...this.state.pagination,
//         totalPages,
//       },
//       tableLoading: false,
//       isLoading: false,
//       showLoadingOverlay: false,
//     });
//   };
  

//   handleOnSearch = (searchCriteria) => {
//     console.log("search criteria: ", searchCriteria);

//     const {  items} = this.state;
//     const { currentPage, selectedPageSize } = this.state.pagination;
//     console.log(items,"Items");
//     let filteredItems = items;
//     for(let i in searchCriteria){
//       console.log(i);
//       console.log(searchCriteria[i]);
//       filteredItems = filteredItems.filter(value => {
//         console.log(typeof value[i]);
//         // console.log(value[i].startsWith(searchCriteria[i]),"hello");
//         return  ( typeof value[i] == "number") ? value[i] == searchCriteria[i]:
//         value[i].startsWith(searchCriteria[i]) ? value[i] : null;
//       });
//       console.log(filteredItems);
//     }
//     console.log(filteredItems);
//     // const filteredItems = items.filter(value => );
//     // console.log("filteredItems",filteredItems);
//     // const FilteredData = Object.key(items).filter((item,index) => {
//     //   return searchCriteria.id === item.id
//     // })

//     // console.log(FilteredData,"Filtexredobject");

//     this.setState({
//       ...items,
//       ...TopTenItems,
//       TopTenItems: filteredItems,
//       // tableLoading: true,
//     });

    

//     // fetchIps(
//     //   selectedPageSize,
//     //   1,
//     //   orderBy,
//     //   searchCriteria,
//     //   this.onFetchSuccess,
//     //   this.onFetchFailure
//     // );
//   };

  

//   getStatusCell = ({ status }) => {
//     const upperStatus = status.toUpperCase();
//     switch (upperStatus) {
//       case "PRE_VALIDATION":
//         return (
//           <span className="badge badge-pill badge-info text-capitalize">
//             {upperStatus}
//           </span>
//         );
//       case "PRE_VALIDATION_REPLY":
//         return (
//           <span className="badge badge-pill badge-warning text-capitalize">
//             {upperStatus}
//           </span>
//         );
//       case "PAYMENT":
//         return (
//           <span className="badge badge-pill badge-success text-capitalize">
//             {upperStatus}
//           </span>
//         );
//       case "PAYMENT_REPLY":
//         return (
//           <span className="badge badge-pill badge-danger text-capitalize">
//             {upperStatus}
//           </span>
//         );
//       default:
//         return (
//           <span className="badge badge-pill badge-primary text-capitalize">
//             {upperStatus}
//           </span>
//         );
//     }
//   };

  columns = [

    {
        Header: "Batch Id",
        id: "batchId",
        accessor: "batchId",
        width: 250,
      //   Cell: ({ original }) => (
      //     <Button
      //       color="primary"
      //       size="xs"
      //       onClick={() => this.toggleEditModel(original)}
      //     >
      //       <i className="glyph-icon simple-icon-pencil mr-1"></i> Edit
      //     </Button>
      //   ),
      //   filterable: false,
      //   sortable: false,
      Filter: CustomInputElement(),
      },
    {
      Header: "Type",
      id: "type",
      accessor: "type",
      width: 150,
      filterable: false,    
    //   Filter: CustomInputElement(),
    },
    {
      Header: "Sender",
      id: "sender",
      accessor: "sender",
      width: 100,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Receiver",
      id: "receiver",
      accessor: "receiver",
      width: 100,
      // filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: () => (
        <div>
          Date <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "date",
      accessor: "date",
      width: 180,
    //   Cell: ({ original }) => this.getDateCell(original),
    //   Filter: ({ filter, onChange }) => {
    //     return (
    //       <div>
    //         <DatePicker
    //           selected={this.state.selectedDate}
    //           dateFormat="dd-MM-yyyy"
    //           style={{ height: "20px" }}
    //           onChange={(date) => {
    //             this.setState({ selectedDate: date });
    //             const isValid = moment(date, ["DD-MM-YYYY"]).isValid();
    //             let formatedDate = "";
    //             if (isValid) formatedDate = moment(date).format("DD-MM-YYYY");
    //             onChange(formatedDate);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    },
    {
        Header: "Total",
        id: "total",
        accessor: "total",
        width: 100,
        filterable: false,
      },
    {
        Header: "Success",
        id: "success",
        accessor: "success",
        width: 100,
        filterable: false,
      },
    {
        Header: "Fail",
        id: "fail",
        accessor: "fail",
        width: 100,
        filterable: false,
      },
    {
        Header: "TimeOut",
        id: "timeout",
        accessor: "timeout",
        width: 100,
        filterable: false,
      },
    {
        Header: "Processing",
        id: "processing",
        accessor: "processing",
        width: 250,
        filterable: false,
      },
  ];

  render() {
    const { match } = this.props;
    {
      console.log(this.props, "<<+Props");
    }

    const {
      isLoading,
      items,
      TopTenItems,
      tableLoading,
      pagination,
      editModalOpen,
      editModalInitValues,
      showLoadingOverlay,
    } = this.state;

    const { selectedPageSize, totalPages, currentPage } = pagination;
    console.log({totalPages , currentPage})

    // return isLoading ? (
    //     <>
    //       <div className="loading"></div>
    //     </>
    //   ) : (
    //     <>
    //       {showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} />}
    return (
    // <>
      <Colxx xxs="12">
        <div className="mb-3">
          <div className="d-flex align-items-center">
            <h1>
              <IntlMessages id="menu.recon" />
              
            </h1>
            <Breadcrumb match={match} />
            {/* <div className="ml-auto">
              <Pagination
                currentPage={currentPage}
                totalPage={totalPages}
                onChangePage={(selectedPage) =>
                  this.handleOnPageChange(selectedPage)
                }
                showPageJump={true}
                position="between"
              />
            </div> */}
          </div>
        </div>

        <Card className="mb-4">
            <CardBody className="p-4">
              <ReactTable
                data={items}
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
                // onPageChange={(selectedPage) => this.handleOnPageChange(selectedPage+1) }
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
          </Card>
      </Colxx>
    //   </>
      )
  }
}
export default Recon;
