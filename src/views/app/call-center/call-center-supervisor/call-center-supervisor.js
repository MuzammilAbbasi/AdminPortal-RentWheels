import React, { useState, useEffect } from "react";
import ReactTable from "react-table";

import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";

import CustomTBodyComponent from "components/custom/customtablebody";

import { Colxx } from "components/common/CustomBootstrap";
import DataTablePagination from "../../../../components/DatatablePagination";
import { Tab, Tabs } from "react-bootstrap";

import { transformToObject } from "helpers/Utils";
import {
  getMakerTransactionDetails,
  IndexApi,
  approveStatus,
  rejectStatus,
  RejectTransactionStatus,
  ApproveTransactionStatus,
} from "./apiCalls";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import InputField from "../../inputFields/InputField";
import SelectInput from "../../inputFields/selectInput";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { set } from "react-hook-form";

// export default class CallCenterSupervisor extends Component {
//   constructor(props) {
//     super(props);

//     this.mouseTrap = require("mousetrap");

//     // this.state = {
//     //   isTabOn: false,
//     //   tableLoading: false,
//     //   isLoading: false,
//     //   activeFirstTab: "1",
//     //   activeSecondTab: "1",
//     //   // MobileBankingUserDetail Modal
//     //   isMobileBankingUserDetails:false,

//     //   rejectModalOpen: false,
//     //   approveModalOpen: false,
//     //   rejectInternationalModalOpen: false,
//     //   approveInternationalModalOpen: false,
//     //   internationalDetailModalOpen: false,
//     //   notAvilableModalOpen: false,
//     //   collapse: false,
//     //   validateError: "",
//     //   key: "1",
//     //   searchCriteria: {
//     //     cnic: "",
//     //     accountNumber: "",
//     //   },
//     //   transactionSearchCriteria: {
//     //     cnic: "",
//     //     accountNumber: "",
//     //   },
//     //   internationalTransactionStatus:"Maker",
//     //   editModalInitValues: {
//     //     id: "",
//     //     customerCnic: "",
//     //     customerUsername: "",
//     //     customerAccountNumber: "",
//     //     userDeactivateDatetime: "",
//     //     cli: "",
//     //     userActivity: "",
//     //     blockRequest: "",
//     //     reasonUserDeactivate: "",
//     //     outboundCall: "N/A",
//     //   },
//     //   setInternationalTransactionValues: {
//     //     id: "",
//     //     cnic: "",
//     //     username: "",
//     //     accountNumber: "",
//     //     reasonTransChange: "",
//     //     cli: "",
//     //     durationTime: "",
//     //     toDateDurationTime: "",
//     //     blockRequest: "",
//     //     outboundCall: "N/A",
//     //   },
//     //   setencryptedPan: {
//     //     encryptedPan: "",
//     //   },
//     //   setInitRejectApprove: {
//     //     Comment: "",
//     //   },
//     //   Items: [],
//     //   internationalTransactionitems: [],
//     //   pagination: {
//     //     totalPages: 10,
//     //     currentPage: 1,
//     //     TotalSize: 0,
//     //     selectedPageSize: 10,
//     //     orderBy: { column: "cnic", asec: "true" },
//     //   },
//     //   editModalOpen: false,
//     // };
//   }

//   selectedOptions = [
//     { value: "N/A", label: "N/A" },
//     { value: "YES", label: "YES" },
//   ];

//   componentDidMount() {
//     const { pagination, searchCriteria } = this.state;
//     const isAsc = pagination.orderBy?.asec;

//     const orderBy = pagination.orderBy?.column;
//     this.setState({
//       tableLoading: true,
//       key: "1",
//     });
//     // setTableLoading(true);
//     IndexApi(
//       searchCriteria,
//       pagination.selectedPageSize,
//       pagination.currentPage,
//       orderBy,
//       isAsc,
//       this.onFetchSuccess,
//       this.onFetchFailure
//     );
//   }

//   setKey = (k) => {
//     const { pagination, searchCriteria, key, transactionSearchCriteria ,internationalTransactionStatus } =
//       this.state;
//     const isAsc = pagination.orderBy?.asec;

//     const orderBy = pagination.orderBy?.column;

//     this.setState({
//       tableLoading: true,
//       key: k,
//     });

//     if (k === "1") {
//       IndexApi(
//         searchCriteria,
//         pagination.selectedPageSize,
//         pagination.currentPage,
//         orderBy,
//         isAsc,
//         this.onFetchSuccess,
//         this.onFetchFailure
//       );
//     } else if (k === "2") {
//       getMakerTransactionDetails(
//         transactionSearchCriteria,
//         pagination.selectedPageSize,
//         pagination.currentPage,
//         orderBy,
//         isAsc,
//         internationalTransactionStatus,
//         this.onFetchInternationTransactionSuccess,
//         this.onFetchFailure
//       );
//       // setTableLoading(true);
//     }
//   };

//   handleOnPageChange = (selectedPage) => {
//     const selectedPage1 = Number(selectedPage);

//     const order = orderBy;
//     const { pagination, searchCriteria } = this.state;
//     const { selectedPageSize, currentPage, orderBy } = pagination;
//     const isAsc = orderBy?.asec;
//     const newState = {
//       tableLoading: true,
//       pagination: { ...pagination, currentPage: selectedPage1 },
//     };
//     this.setState({
//       tableLoading: newState.tableLoading,
//       pagination: newState.pagination,
//     });
//     IndexApi(
//       searchCriteria,
//       selectedPageSize,
//       newState.pagination.currentPage,
//       order,
//       isAsc,
//       this.onFetchSuccess,
//       this.onFetchFailure
//     );
//   };

//   handleOnSearch = (searching) => {
//     const { currentPage, selectedPageSize, orderBy } = this.state.pagination;
//     const isAsc = orderBy?.asec;
//     const order = orderBy?.column;
//     this.setState({
//       tableLoading: true,
//     });
//     IndexApi(
//       searching,
//       selectedPageSize,
//       currentPage,
//       order,
//       isAsc,
//       this.onFetchSuccess,
//       this.onFetchFailure
//     );
//   };

//   handleTransactionOnSearch = (searching) => {
//     const { currentPage, selectedPageSize, orderBy } = this.state.pagination;
//     const isAsc = orderBy?.asec;
//     const order = orderBy?.column;
//     this.setState({
//       tableLoading: true,
//     });
//     getMakerTransactionDetails(
//       searching,
//       selectedPageSize,
//       currentPage,
//       order,
//       isAsc,
//       this.onFetchInternationTransactionSuccess,
//       this.onFetchFailure
//     );
//   };

//   onFetchFailure = () => {
//     const { isLoading, islogin, isactiveTab } = this.state;
//     this.setState({
//       tableLoading: false,
//       isLoading: false,
//       rejectModalOpen: false,
//       approveModalOpen: false,
//       editModalOpen: false,
//     });
//     // const {rangeDate,
//     //   cnic,
//     //   userName,
//     //   account} = this.state.editInitValues;
//   };

//   onFetchInternationTransactionSuccess = (Res) => {
//     const {
//       isLoading,
//       islogin,
//       isactiveTab,
//       pagination,
//       internationalTransactionitems,
//       editModalInitValues,
//     } = this.state;
//     const Data = Res?.data;

//     this.setState({
//       internationalTransactionitems: Data?.response,
//       pagination: {
//         ...pagination,
//         currentPage: Data?.currentPage ? Data?.currentPage + 1 : 1,
//         totalPages: Data?.totalPages ? Data?.totalPages : 1,
//       },
//       tableLoading: false,
//       isLoading: false,
//       rejectModalOpen: false,
//       approveModalOpen: false,
//     });
//   };

//   onFetchSuccess = (Res) => {
//     const {
//       isLoading,
//       islogin,
//       isactiveTab,
//       pagination,
//       Items,
//       editModalInitValues,
//     } = this.state;
//     const {response,currentPage,totalItem,totalPages} = Res?.data;
//     console.log(Res,"<== Data")
//     const payload = response?.map((obj) => {
//       return {
//         ...obj,
//         accountNumber: obj?.customerAccountNumber,
//         cnic: obj?.customerCnic,
//       };
//     });

//     this.setState({
//       Items: payload,
//       pagination: {
//         ...pagination,
//         currentPage: currentPage ? currentPage + 1 : 1,
//         totalPages: totalPages ? totalPages : 1,
//       },
//       tableLoading: false,
//       isLoading: false,
//       rejectModalOpen: false,
//       approveModalOpen: false,
//     });
//   };

//  const  toggleEditModel = (rowItem) => {

//     setIsMobileBankingDetails(!isMobileBankingDetails)
//     this.setState({
//       isMobileBankingUserDetails: !isMobileBankingUserDetails,
//       editModalInitValues: rowItem,
//       setInternationalTransactionValues: rowItem,
//     });
//   };

//   // internationalDetailModalOpenClose

//   toggleInternationalDetailModal = (rowItem) => {
//     const { internationalDetailModalOpen } = this.state;

//     this.setState({
//       internationalDetailModalOpen: !internationalDetailModalOpen,
//       setInternationalTransactionValues: rowItem,
//     });
//   };

//   toggleFirstTab(tab) {
//     if (this.props.activeTab !== tab) {
//       this.setState({
//         activeFirstTab: tab,
//       });
//     }
//   }
//   toggleSecondTab(tab) {
//     if (this.props.activeTab !== tab) {
//       this.setState({
//         activeSecondTab: tab,
//       });
//     }
//   }

//   handleEvent = (event) => {
//     // let obj = modalInitValues;
//     const { editModalInitValues, setInternationalTransactionValues } =
//       this.state;
//     const tempObj = {
//       ...editModalInitValues,
//       [event.target.name]: event.target.value,
//     };

//     this.setState({
//       editModalInitValues: tempObj,
//     });
//   };

//   handleTransactionEvent = (event) => {
//     // let obj = modalInitValues;
//     const { setInternationalTransactionValues } = this.state;
//     const tempObj = {
//       ...setInternationalTransactionValues,
//       [event.target.name]: event.target.value,
//     };

//     this.setState({
//       setInternationalTransactionValues: tempObj,
//       setencryptedPan: tempObj,
//     });
//   };

//   // Mobile Banking Details Modal

//   rejecttogglebuttonModel = () => {
//     this.setState({
//       rejectModalOpen: !this.state.rejectModalOpen,
//     });
//   };

//   approvetogglebuttonModel = () => {
//     this.setState({
//       approveModalOpen: !this.state.approveModalOpen,
//     });
//   };

//   // Mobile Banking  Approve / Reject

//   rejectMobileBanking = () => {
//     const {
//       rejectModalOpen,
//       notavilableModalOpen,
//       editModalInitValues: { outboundCall },
//     } = this.state;

//     if (outboundCall === "YES") {
//       this.setState({
//         rejectModalOpen: !rejectModalOpen,
//       });
//     } else {
//       this.setState({
//         notavilableModalOpen: !notavilableModalOpen,
//       });
//     }
//   };

//   approveMobileBanking = () => {
//     const {
//       approveModalOpen,
//       notavilableModalOpen,
//       editModalInitValues: { outboundCall },
//     } = this.state;
//     outboundCall === "YES"
//       ? this.setState({
//           approveModalOpen: !approveModalOpen,
//         })
//       : this.setState({
//           notavilableModalOpen: !notavilableModalOpen,
//         });
//   };

//   // internationalDetailModalOpen

//   rejectInternationalToggleModel = () => {
//     this.setState({
//       rejectInternationalModalOpen: !this.state.rejectInternationalModalOpen,
//     });
//   };

//   approveInternationalToggleModel = () => {
//     this.setState({
//       approveInternationalModalOpen: !this.state.approveInternationalModalOpen,
//     });
//   };

//   // international Transaction Approve / Reject

//   rejectInternationalTransaction = () => {
//     const {
//       notavilableModalOpen,
//       rejectInternationalModalOpen,
//       setInternationalTransactionValues: { outboundCall },
//     } = this.state;

//     if (outboundCall === "YES") {
//       this.setState({
//         rejectInternationalModalOpen: !rejectInternationalModalOpen,
//       });
//     } else {
//       this.setState({
//         notavilableModalOpen: !notavilableModalOpen,
//       });
//     }
//   };

//   approveInternationalTransaction = () => {
//     const {
//       approveInternationalModalOpen,
//       notavilableModalOpen,
//       setInternationalTransactionValues: { outboundCall },
//     } = this.state;
//     outboundCall === "YES"
//       ? this.setState({
//           approveInternationalModalOpen: !approveInternationalModalOpen,
//         })
//       : this.setState({
//           notavilableModalOpen: !notavilableModalOpen,
//         });
//   };

//   //  internationalTransactionApi's

//   approveTransactionStatus = (e) => {
//     e.preventDefault();

//     const { editModalInitValues, setInitRejectApprove,setInternationalTransactionValues } = this.state;
//     const { Comment } = setInitRejectApprove;
//     const {
//       id,
//       username,
//       cnic,
//       accountNumber,
//       userDeactivateDatetime,
//       reasonTransChange,
//       cli,
//       blockRequest,
//       reasonUserDeactivate,
//       outboundCall,
//     } = setInternationalTransactionValues;

//     if (Comment.length <= 5) {
//       this.setState({
//         validateError: "Approve reason should not be less than 5 character",
//       });
//     } else {
//       const payload = {
//         customerId: id,
//         username: username,
//         cnic: cnic,
//         accountNumber: accountNumber,
//         deactivateReason: Comment,
//         cli: cli,
//         blockingRequest: blockRequest,
//       };
//       console.log(payload);
//       ApproveTransactionStatus(payload, this.onFetchApproveSuccess, this.onFetchFailure);
//       this.setState({
//         validateError: "",
//         isLoading: true,
//       });
//     }
//   };

//   rejectTransactionStatus = (e) => {
//     e.preventDefault();
//     debugger;
//     const {
//       setInternationalTransactionValues,
//       setInitRejectApprove,
//       internationalTransactionitems,
//     } = this.state;
//     const { Comment } = setInitRejectApprove;
//     const {
//       id,
//       username,
//       durationTime,
//       cli,
//       blockRequest,
//       toDateDurationTime,
//     } = setInternationalTransactionValues;
//     const { encryptedPan } = this.state.setencryptedPan;

//     if (Comment.length <= 5) {
//       this.setState({
//         validateError: "Approve reason should not be less than 5 character",
//       });
//     } else {
//       const payload = {
//         customerId: id,
//         username: username,
//         encryptedPan: encryptedPan,
//         cli: cli,
//         deactivateReason: Comment,
//         blockingRequest: blockRequest,
//         duration: durationTime,
//         toDateDuration: toDateDurationTime,
//       };

//       this.setState({
//         validateError: "",
//         isLoading: true,
//         setInitRejectApprove: {
//           Comment: "",
//         },
//       });
//       RejectTransactionStatus(
//         payload,
//         this.onFetchRejectSuccess,
//         this.onFetchFailure
//       );
//     }
//   };

//   //  MobileBankingApi's

//   approveUserStatus = (e) => {
//     e.preventDefault();

//     const { editModalInitValues, setInitRejectApprove } = this.state;
//     const { Comment } = setInitRejectApprove;
//     const {
//       id,
//       customerUsername,
//       customerCnic,
//       userActivity,
//       customerAccountNumber,
//       userDeactivateDatetime,
//       cli,
//       blockRequest,
//       reasonUserDeactivate,
//       outboundCall,
//     } = editModalInitValues;

//     if (Comment.length <= 5) {
//       this.setState({
//         validateError: "Approve reason should not be less than 5 character",
//       });
//     } else {
//       const payload = {
//         customerId: id,
//         userName: customerUsername,
//         cnic: customerCnic,
//         accountNumber: customerAccountNumber,
//         deactivateReason: Comment,
//         userActivity: userActivity,
//         cli: cli,
//         blockingRequest: blockRequest,
//       };
//       console.log(payload);
//       approveStatus(payload, this.onFetchApproveSuccess, this.onFetchFailure);
//       this.setState({
//         validateError: "",
//         isLoading: true,
//       });
//     }
//   };

//   rejectUserStatus = (e) => {
//     e.preventDefault();
//     const { editModalInitValues, setInitRejectApprove } = this.state;
//     const { Comment } = setInitRejectApprove;
//     const {
//       id,
//       customerUsername,
//       customerCnic,
//       userActivity,
//       customerAccountNumber,
//       userDeactivateDatetime,
//       cli,
//       blockRequest,
//       reasonUserDeactivate,
//       outboundCall,
//     } = editModalInitValues;

//     if (Comment.length <= 5) {
//       this.setState({
//         validateError: "Approve reason should not be less than 5 character",
//       });
//     } else {
//       const payload = {
//         customerId: id,
//         userName: customerUsername,
//         cnic: customerCnic,
//         accountNumber: customerAccountNumber,
//         deactivateReason: Comment,
//         userActivity: userActivity,
//         cli: cli,
//         blockingRequest: blockRequest,
//       };

//       this.setState({
//         validateError: "",
//         isLoading: true,
//         setInitRejectApprove: {
//           Comment: "",
//         },
//       });
//       rejectStatus(payload, this.onFetchRejectSuccess, this.onFetchFailure);
//     }
//   };

//   notAvilabletogglebuttonModel = () => {
//     this.setState({
//       notavilableModalOpen: !this.state.notavilableModalOpen,
//     });
//   };
// setInitRejectApprove
//   handleRejectApprove = (event) => {
//     const { setInitRejectApprove } = this.state;
//     const tempObj = {
//       ...setInitRejectApprove,
//       [event.target.name]: event.target.value,
//     };

//     this.setState({
//       setInitRejectApprove: tempObj,
//     });
//   };

//   getTrProps = (state, rowInfo, instance) => {
//     if (rowInfo) {
//       return {
//         onDoubleClick: () => this.toggleEditModel(rowInfo?.original),
//       };
//     }
//     return {};
//   };

//   getTransactionProps = (state, rowInfo, instance) => {
//     if (rowInfo) {
//       return {
//         onDoubleClick: () => this.toggleInternationalDetailModal(rowInfo?.original),
//       };
//     }
//     return {};
//   };

//   columns = [
//     {
//       Header: "Customer CNIC",
//       id: "cnic",
//       accessor: "cnic",
//       width: 280,
//       Filter: ({ filter, onChange }) => {
//         return (
//           <Input
//             placeholder="XXXXX-XXXXXXX-X"
//             name="cnic"
//             defaultValue={this.state.searchCriteria?.cnic}
//             // maxLength={14}
//             onKeyPress={(event) => {
//               if (
//                 event.key === "Enter" ||
//                 event.keyCode === 14 ||
//                 event.which === 14
//               ) {
//                 const { value } = event.target;
//                 let Cnic = value;
//                 if (value?.includes("-")) {
//                   Cnic = value?.split("-").join("");
//                 }
//                 onChange(Cnic); // Trigger the onSearch event
//               }
//             }}
//             onChange={(event) => {
//               const { value } = event.target;
//               let Cnic = value;
//               if (value?.includes("-")) {
//                 Cnic = value?.split("-").join("");
//               }

//               if (value.length <= 0) onChange(Cnic);
//             }}
//           />
//         );
//       },
//     },
//     {
//       Header: "Customer Account Number",
//       id: "accountNumber",
//       accessor: "accountNumber",
//       width: 280,
//       Filter: ({ filter, onChange }) => {
//         return (
//           <Input
//             // autoFocus
//             defaultValue={this.state.searchCriteria?.accountNumber}
//             name="accountNumber"
//             onKeyPress={(event) => {
//               if (
//                 event.key === "Enter" ||
//                 event.keyCode === 13 ||
//                 event.which === 13
//               ) {
//                 onChange(event.target.value);
//               }
//             }}
//             onChange={(event) => {
//               const { value } = event.target;
//               // setSearchCriteria({[event.target.name]: event.target.value})
//               if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
//             }}
//           />
//         );
//       },
//     },
//     {
//       Header: "Request Type",
//       id: "userActivity",
//       accessor: "userActivity",
//       filterable: false,
//       width: 280,

//       //   Filter: CustomInputElement(),
//     },
//     {
//       Header: "Details",
//       id: "details",
//       accessor: "details",
//       width: 250,
//       filterable: false,
//       Cell: (cell) => {
//         return (
//           <div className="text-center">
//             {this.state.Items && (
//               <Button
//                 color="primary"
//                 size="xs"
//                 onClick={() => this.toggleEditModel(cell?.original)}
//               >
//                 <i className="glyph-icon simple-icon-eye mr-1"></i> View
//               </Button>
//             )}
//           </div>
//         );
//       },
//       //   Filter: CustomInputElement(),
//     },
//   ];

//   internationalTransactionColumns = [
//     {
//       Header: "Customer CNIC",
//       id: "cnic",
//       accessor: "cnic",
//       width: 280,
//       Filter: ({ filter, onChange }) => {
//         return (
//           <Input
//             placeholder="XXXXX-XXXXXXX-X"
//             name="cnic"
//             defaultValue={this.state.searchCriteria?.cnic || ""}
//             // maxLength={14}
//             onKeyPress={(event) => {
//               if (
//                 event.key === "Enter" ||
//                 event.keyCode === 14 ||
//                 event.which === 14
//               ) {
//                 const { value } = event.target;
//                 let Cnic = value;
//                 if (value?.includes("-")) {
//                   Cnic = value?.split("-").join("");
//                 }
//                 onChange(Cnic); // Trigger the onSearch event
//               }
//             }}
//             onChange={(event) => {
//               const { value } = event.target;
//               let Cnic = value;
//               if (value?.includes("-")) {
//                 Cnic = value?.split("-").join("");
//               }

//               if (value.length <= 0) onChange(Cnic);
//             }}
//           />
//         );
//       },
//     },
//     {
//       Header: "Customer Account Number",
//       id: "accountNumber",
//       accessor: "accountNumber",
//       width: 280,
//       Filter: ({ filter, onChange }) => {
//         return (
//           <Input
//             // autoFocus
//             defaultValue={
//               this.state.searchCriteria.accountNumber || ""
//             }
//             name="accountNumber"
//             onKeyPress={(event) => {
//               if (
//                 event.key === "Enter" ||
//                 event.keyCode === 13 ||
//                 event.which === 13
//               ) {
//                 onChange(event.target.value);
//               }
//             }}
//             onChange={(event) => {
//               const { value } = event.target;
//               // setSearchCriteria({[event.target.name]: event.target.value})
//               if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
//             }}
//           />
//         );
//       },
//     },
//     {
//       Header: "Request Type",
//       id: "activity",
//       accessor: "activity",
//       filterable: false,
//       width: 280,

//       //   Filter: CustomInputElement(),
//     },
//     {
//       Header: "Details",
//       id: "details",
//       accessor: "details",
//       width: 250,
//       filterable: false,
//       Cell: (cell) => {
//         return (
//           <div className="text-center">
//             {this.state.Items && (
//               <Button
//                 color="primary"
//                 size="xs"
//                 onClick={() =>
//                   this.toggleInternationalDetailModal(cell?.original)
//                 }
//               >
//                 <i className="glyph-icon simple-icon-eye mr-1"></i> View
//               </Button>
//             )}
//           </div>
//         );
//       },
//       //   Filter: CustomInputElement(),
//     },
//   ];

//   render() {
//     const { match } = this.props;
//     const { totalPages, selectedPageSize } = this.state.pagination;
//     const {
//       Items,
//       isMobileBankingUserDetails,
//       editModalOpen,
//       editModalInitValues,
//       showLoadingOverlay,
//       tableLoading,
//       approveModalOpen,
//       rejectModalOpen,
//       notavilableModalOpen,
//       setInitRejectApprove,
//       isLoading,
//       internationalTransactionitems,
//       internationalDetailModalOpen,
//       setInternationalTransactionValues,
//     } = this.state;

//     const {
//       customerCnic,
//       customerAccountNumber,
//       userDeactivateDatetime,
//       cli,
//       reasonUserDeactivate,
//       blockRequest,
//       outboundCall,
//     } = editModalInitValues;

//     return (
//       <>
//         <Colxx xxs="12">
//           <div className="mb-3">
//             <div className="d-flex align-items-center">
//               <h1
//               // style={{
//               //   color: "#23527c",
//               //   cursor: "pointer",
//               //   fontWeight: "bold",
//               // }}
//               >
//                 <IntlMessages id="menu.CallCenterSupervisor" />
//               </h1>
//               <Breadcrumb match={match} />
//             </div>
//           </div>
//           <Colxx xxs="12" className="mt-4">
//             <Row>
//               <Colxx xxs="12" xs="6" lg="12">
//                 <Card className="mb-4">
//                   <CardTitle
//                     style={{
//                       // color: "#23527c",
//                       fontSize: "1.75rem",
//                       // fontWeight: "bold",
//                     }}
//                     className="m-3"
//                   >
//                     <IntlMessages id="cards.details" />
//                   </CardTitle>

//                   {/* Navigation [START] */}

//                   <Tabs
//                     id="controlled-tab-example"
//                     activeKey={this.state.key}
//                     onSelect={(k) => this.setKey(k)}
//                     defaultActiveKey="1"
//                     className="mb-3"
//                   >
//                     <Tab eventKey="1" title="Mobile Banking Block Request">
//                       <Row>
//                         <Colxx sm="12">
//                           <CardBody>
//                             <ReactTable
//                               data={Items}
//                               columns={this.columns}
//                               filterable={true}
//                               // className="-highlight react-table-fixed-height"
//                               // style={{ cursor: "pointer" }}
//                               TbodyComponent={CustomTBodyComponent}
//                               pages={totalPages}
//                               showPagination={true}
//                               showPageJump={true}
//                               showPageSizeOptions={false}
//                               showPaginationTop={true}
//                               showPaginationBottom={false}
//                               loading={tableLoading}
//                               getTrProps={this.getTrProps}
//                               defaultPageSize={selectedPageSize}
//                               PaginationComponent={DataTablePagination}
//                               manual
//                               onPageChange={(selectedPage) =>
//                                 this.handleOnPageChange(selectedPage + 1)
//                               }
//                               defaultFilterMethod={(filter, row, column) => {
//                                 return true;
//                               }}
//                               // onSortedChange={(sortProperties, columns, additive) => {
//                               //   const [item] = sortProperties;
//                               //   const { id, desc } = item;
//                               //   const orderBy = {
//                               //     column: id,
//                               //     asec: !desc,
//                               //   };
//                               //   this.setState({
//                               //     orderBy,
//                               //     tableLoading: true,
//                               //   });

//                               //   this.handleOnSort(orderBy); // Trigger handle onsort.
//                               // }}
//                               onFilteredChange={(filtered, column, value) => {
//                                 console.log("hello world....", filtered);
//                                 const searchCriteria =
//                                   transformToObject(filtered);
//                                 this.setState({
//                                   searchCriteria: searchCriteria,
//                                 });
//                                 console.log(searchCriteria, "<<=Searching");
//                                 this.handleOnSearch(searchCriteria); // Trigger handle search
//                               }}
//                             />
//                           </CardBody>
//                         </Colxx>
//                       </Row>
//                     </Tab>
//                     {/* {
//                       this.state.isactiveTab ?  */}
//                     <Tab
//                       eventKey="2"
//                       title="International Transaction Enable Request"
//                     >
//                       <Row>
//                         <Colxx sm="12">
//                           <CardBody>
//                             <ReactTable
//                               data={internationalTransactionitems}
//                               columns={this.internationalTransactionColumns}
//                               filterable={true}
//                               TbodyComponent={CustomTBodyComponent}
//                               pages={totalPages}
//                               showPagination={true}
//                               showPageJump={true}
//                               showPageSizeOptions={false}
//                               showPaginationTop={true}
//                               showPaginationBottom={false}
//                               loading={tableLoading}
//                               defaultPageSize={selectedPageSize}
//                               PaginationComponent={DataTablePagination}
//                               manual
//                               getTrProps={this.getTransactionProps}
//                               // onPageChange={(selectedPage) => this.handleOnPageChange(selectedPage+1) }
//                               // defaultFilterMethod={(filter, row, column) => {
//                               //   return true;
//                               // }}
//                               // onSortedChange={(sortProperties, columns, additive) => {
//                               //   const [item] = sortProperties;
//                               //   const { id, desc } = item;
//                               //   const orderBy = {
//                               //     column: id,
//                               //     asec: !desc,
//                               //   };
//                               //   this.setState({
//                               //     orderBy,
//                               //     tableLoading: true,
//                               //   });

//                               //   this.handleOnSort(orderBy); // Trigger handle onsort.
//                               // }}
//                               onFilteredChange={(filtered, column, value) => {
//                                 console.log("hello world....", filtered);
//                                 const searchCriteria =
//                                   transformToObject(filtered);
//                                 this.setState({
//                                   transactionSearchCriteria: searchCriteria,
//                                 });
//                                 console.log(searchCriteria, "<<=Searching");
//                                 this.handleTransactionOnSearch(searchCriteria); // Trigger handle search
//                               }}
//                             />
//                           </CardBody>
//                         </Colxx>
//                       </Row>
//                     </Tab>
//                   </Tabs>
//                 </Card>
//               </Colxx>
//             </Row>
//           </Colxx>

//           {/* Mobile Banking UserDetail Modal [START] */}

//           <Modal size="lg" isOpen={isMobileBankingUserDetails} toggle={this.toggleEditModel}>
//             <ModalHeader toggle={this.toggleEditModel}>
//               User Details
//             </ModalHeader>
//             <ModalBody>
//               <Form>
//                 <Row className="container">
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={customerCnic || ""}
//                         label="Customer CNIC"
//                         type="text"
//                         id="customerCnic"
//                         disabled={true}
//                         name="customerCnic"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={customerAccountNumber || ""}
//                         label="Account Number"
//                         type="text"
//                         id="customerAccountNumber"
//                         disabled={true}
//                         name="customerAccountNumber"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={userDeactivateDatetime || ""}
//                         label="User Deactivate Date/Time"
//                         type="text"
//                         id="userDeactivateDatetime"
//                         disabled={true}
//                         name="userDeactivateDatetime"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={cli || ""}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled={true}
//                         required={true}
//                         // style={{ borderRadius: "50px" }}
//                         name="cli"
//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={reasonUserDeactivate || ""}
//                         label="Reason of User Activate / Deactivate"
//                         type="textarea"
//                         id="reasonUserDeactivate"
//                         // maxLength={50}

//                         disabled={true}
//                         // style={{ borderRadius: "50px" }}
//                         name="reasonUserDeactivate"

//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={blockRequest || ""}
//                         label="Blocking Request"
//                         type="text"
//                         id="blockRequest"
//                         // maxLength={50}
//                         disabled
//                         // style={{ borderRadius: "50px" }}
//                         name="blockRequest"

//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <SelectInput
//                         options={this.selectedOptions}
//                         value={outboundCall || ""}
//                         label="Outbound Call"
//                         // type="select"
//                         // id="blockingrequest"
//                         // style={{ borderRadius: "50px" }}
//                         name="outboundCall"
//                         handleChange={this.handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="12">
//                     <Button
//                       style={{ float: "right", marginLeft: "4px" }}
//                       color="secondary"
//                       outline
//                       onClick={this.rejectMobileBanking}
//                     >
//                       <span className="label">Reject</span>
//                     </Button>
//                     <Button
//                       style={{ float: "right" }}
//                       color="primary"
//                       onClick={this.approveMobileBanking}
//                     >
//                       <span className="label">
//                         {/* <IntlMessages id="user.login-button" />   */}
//                         Approve
//                       </span>
//                     </Button>
//                   </Colxx>
//                 </Row>
//               </Form>
//             </ModalBody>
//           </Modal>

//           {/* Modal Mobile Banking Reject/Approve [START] */}

//           <Modal
//             size="lg"
//             isOpen={rejectModalOpen}
//             toggle={this.rejecttogglebuttonModel}
//           >
//             <ModalHeader
//               toggle={this.rejecttogglebuttonModel}
//               closebutton={"true"}
//             >
//               <IntlMessages id="label.rejectModal" />
//             </ModalHeader>
//             <ModalBody>
//               <Form onSubmit={this.rejectUserStatus}>
//                 <Row className="container">
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={editModalInitValues?.cli}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled={true}
//                         name="cli"
//                         placeholder="Enter CLI"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={setInitRejectApprove.Comment}
//                         label="Comment"
//                         type="textarea"
//                         required
//                         id="Comment"
//                         name="Comment"
//                         placeholder="Enter Comment"
//                         errors={this.state.validateError}
//                         onChange={this.handleRejectApprove}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                 </Row>
//                 <Colxx xxs="12" className="d-flex justify-content-end">
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className={`btn-shadow btn-multiple-state mr-1
//               ${isLoading ? "show-spinner" : ""}`}
//                     disabled={isLoading}
//                   >
//                     <span className="spinner d-inline-block">
//                       <span className="bounce1" />
//                       <span className="bounce2" />
//                       <span className="bounce3" />
//                     </span>
//                     <span className="label">Submit</span>
//                   </Button>{" "}
//                   <Button
//                     color="secondary"
//                     onClick={this.rejecttogglebuttonModel}
//                   >
//                     Cancel
//                   </Button>
//                 </Colxx>
//               </Form>
//             </ModalBody>
//           </Modal>

//           <Modal
//             size="lg"
//             isOpen={approveModalOpen}
//             toggle={this.approvetogglebuttonModel}
//           >
//             <ModalHeader toggle={this.approvetogglebuttonModel}>
//               <IntlMessages id="label.approveModal" />
//             </ModalHeader>
//             <ModalBody>
//               {/* <Form onSubmit={handleTab}> */}
//               <Form onSubmit={this.approveUserStatus}>
//                 <Row className="container">
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={editModalInitValues?.cli}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled
//                         name="cli"
//                         placeholder="Enter CLI"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         // value={modalInitValues.cli}
//                         label="Comment"
//                         type="textarea"
//                         id="Comment"
//                         name="Comment"
//                         required
//                         placeholder="Enter Comment"
//                         errors={this.state.validateError}
//                         onChange={this.handleRejectApprove}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="12" className="d-flex justify-content-end">
//                     <Button
//                       color="primary"
//                       className={`btn-shadow btn-multiple-state mr-1
//                     ${isLoading ? "show-spinner" : ""}`}
//                       disabled={isLoading}
//                       type="submit"
//                     >
//                       <span className="spinner d-inline-block">
//                         <span className="bounce1" />
//                         <span className="bounce2" />
//                         <span className="bounce3" />
//                       </span>
//                       <span className="label">Submit</span>
//                     </Button>{" "}
//                     <Button
//                       color="secondary"
//                       onClick={this.approvetogglebuttonModel}
//                     >
//                       Cancel
//                     </Button>
//                   </Colxx>
//                 </Row>
//               </Form>
//             </ModalBody>
//           </Modal>

//           {/* international Transaction UserDetail Modal */}
//           <Modal
//             size="lg"
//             isOpen={internationalDetailModalOpen}
//             toggle={this.toggleInternationalDetailModal}
//           >
//             <ModalHeader toggle={this.toggleInternationalDetailModal}>
//               User Details
//             </ModalHeader>
//             <ModalBody>
//               <Form>
//                 <Row className="container">
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.username}
//                         label="Username"
//                         type="text"
//                         id="username"
//                         disabled={true}
//                         name="username"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={
//                           setInternationalTransactionValues?.reasonTransChange
//                         }
//                         label="Reason to enable international transactions"
//                         type="text"
//                         id="reason_trans_change"
//                         disabled={true}
//                         name="reason_trans_change"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.cli}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled={true}
//                         name="cli"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.durationTime}
//                         label="From Date/Time"
//                         type="text"
//                         id="durationTime"
//                         disabled={true}
//                         required={true}
//                         // style={{ borderRadius: "50px" }}
//                         name="durationTime"
//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={
//                           setInternationalTransactionValues?.toDateDurationTime
//                         }
//                         label="To Date/Time"
//                         type="textarea"
//                         id="toDateDurationTime"
//                         disabled={true}
//                         // style={{ borderRadius: "50px" }}
//                         name="toDateDurationTime"

//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.blockRequest}
//                         label="Blocking Request"
//                         type="text"
//                         id="blockRequest"
//                         // maxLength={50}
//                         disabled
//                         // style={{ borderRadius: "50px" }}
//                         name="blockRequest"

//                         // onChange={handleEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="6">
//                     <FormGroup>
//                       <SelectInput
//                         options={this.selectedOptions}
//                         value={
//                           !setInternationalTransactionValues?.outboundCall
//                             ? "N/A"
//                             : setInternationalTransactionValues?.outboundCall
//                         }
//                         label="Outbound Call"
//                         // type="select"
//                         // id="blockingrequest"
//                         // style={{ borderRadius: "50px" }}
//                         name="outboundCall"
//                         handleChange={this.handleTransactionEvent}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="12">
//                     <Button
//                       style={{ float: "right", marginLeft: "4px" }}
//                       color="secondary"
//                       outline
//                       onClick={this.rejectInternationalTransaction}
//                     >
//                       <span className="label">Reject</span>
//                     </Button>
//                     <Button
//                       style={{ float: "right" }}
//                       color="primary"
//                       onClick={this.approveInternationalTransaction}
//                     >
//                       <span className="label">
//                         {/* <IntlMessages id="user.login-button" />   */}
//                         Approve
//                       </span>
//                     </Button>
//                   </Colxx>
//                 </Row>
//               </Form>
//             </ModalBody>
//           </Modal>

//           {/* Modal InternationTransaction Reject/Approve [START] */}

//           <Modal
//             size="lg"
//             isOpen={this.state.rejectInternationalModalOpen}
//             toggle={this.rejectInternationalToggleModel}
//           >
//             <ModalHeader
//               toggle={this.rejectInternationalToggleModel}
//               closebutton={"true"}
//             >
//               <IntlMessages id="label.transactionReason" />
//             </ModalHeader>
//             <ModalBody>
//               <Form onSubmit={this.rejectTransactionStatus}>
//                 <Row className="container">
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.cli}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled={true}
//                         name="cli"
//                         placeholder="Enter CLI"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={setInitRejectApprove.Comment}
//                         label="Comment"
//                         type="textarea"
//                         required
//                         id="Comment"
//                         name="Comment"
//                         placeholder="Enter Comment"
//                         errors={this.state.validateError}
//                         onChange={this.handleRejectApprove}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                 </Row>
//                 <Colxx xxs="12" className="d-flex justify-content-end">
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className={`btn-shadow btn-multiple-state mr-1
//               ${isLoading ? "show-spinner" : ""}`}
//                     disabled={isLoading}
//                   >
//                     <span className="spinner d-inline-block">
//                       <span className="bounce1" />
//                       <span className="bounce2" />
//                       <span className="bounce3" />
//                     </span>
//                     <span className="label">Submit</span>
//                   </Button>{" "}
//                   <Button
//                     color="secondary"
//                     onClick={this.rejectInternationalToggleModel}
//                   >
//                     Cancel
//                   </Button>
//                 </Colxx>
//               </Form>
//             </ModalBody>
//           </Modal>

//           <Modal
//             size="lg"
//             isOpen={this.state.approveInternationalModalOpen}
//             toggle={this.approveInternationalToggleModel}
//           >
//             <ModalHeader toggle={this.approveInternationalToggleModel}>
//               <IntlMessages id="label.transactionReason" />
//             </ModalHeader>
//             <ModalBody>
//               <Form onSubmit={this.approveTransactionStatus}>
//                 <Row className="container">
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={setInternationalTransactionValues?.cli}
//                         label="CLI"
//                         type="text"
//                         id="cli"
//                         disabled
//                         name="cli"
//                         placeholder="Enter CLI"
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx sm="12">
//                     <FormGroup>
//                       <InputField
//                         value={setInitRejectApprove?.Comment}
//                         label="Comment"
//                         type="textarea"
//                         id="Comment"
//                         name="Comment"
//                         required
//                         placeholder="Enter Comment"
//                         errors={this.state.validateError}
//                         onChange={this.handleRejectApprove}
//                       />
//                     </FormGroup>
//                   </Colxx>
//                   <Colxx xxs="12" className="d-flex justify-content-end">
//                     <Button
//                       color="primary"
//                       className={`btn-shadow btn-multiple-state mr-1
//                     ${isLoading ? "show-spinner" : ""}`}
//                       disabled={isLoading}
//                       type="submit"
//                     >
//                       <span className="spinner d-inline-block">
//                         <span className="bounce1" />
//                         <span className="bounce2" />
//                         <span className="bounce3" />
//                       </span>
//                       <span className="label">Submit</span>
//                     </Button>{" "}
//                     <Button
//                       color="secondary"
//                       onClick={this.approvetogglebuttonModel}
//                     >
//                       Cancel
//                     </Button>
//                   </Colxx>
//                 </Row>
//               </Form>
//             </ModalBody>
//           </Modal>

//           {/* Modal N/A Reject/Approve [START] */}

//           <Modal
//             size="lg"
//             isOpen={notavilableModalOpen}
//             toggle={this.notAvilabletogglebuttonModel}
//           >
//             <ModalHeader toggle={this.notAvilabletogglebuttonModel}>
//               {/* <IntlMessages id="label.approveModal" /> */}
//               Call Center SuperVisor
//             </ModalHeader>
//             <ModalBody>
//               {/* <Form onSubmit={handleTab}> */}
//               Cannot approve request. Please update status for outbound call to
//               YES.
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 color="secondary"
//                 onClick={this.notAvilabletogglebuttonModel}
//               >
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </Modal>
//         </Colxx>
//       </>
//     );
//   }
// }

const CallCenterSupervisor = (props) => {
  const { match } = props;

  const [searchCriteria, setSearchCriteria] = useState({
    cnic: "",
    accountNumber: "",
  });

  const [key, setKey] = useState("1");
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalPages: 10,
    currentPage: 1,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: { column: "cnic", asec: "true" },
  });

  const [isTabOn, setIsTabOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFirstTab, setActiveFirstTab] = useState("1");
  const [activeSecondTab, setActiveSecondTab] = useState("1");

  const [validateError, setValidateError] = useState("");

  // MobileBankingUserDetail Modal
  const [isMobileBankingDetails, setIsMobileBankingDetails] = useState(false);

  const [isMobileRejectModal, setISMobileRejectModal] = useState(false);
  const [isMobileApproveModal, setISMobileApproveModal] = useState(false);

  const [notAvilableModalOpen, setNotAvailableModal] = useState(false);
  // InternationalTransactionUserDetail Modal
  const [isInternationalDetail, setIsInternationalDetail] = useState(false);

  const [isInternationalRejectModal, setISInternationalRejectModal] =
    useState(false);
  const [isInternationalApproveModal, setIsInternationalApproveModal] =
    useState(false);

  const [Items, setItems] = useState([]);
  const [transactionItems, setTransactionitems] = useState([]);
  const [transactionSearchCriteria, setTransactionSearchCriteria] = useState({
    cnic: "",
    accountNumber: "",
  });
  //     //   internationalTransactionStatus:"Maker",
  const [transactionStatus, setTransactionStatus] = useState("Maker");
  const [modalInitValues, editModalInitValues] = useState({
    id: "",
    customerCnic: "",
    customerUsername: "",
    customerAccountNumber: "",
    userDeactivateDatetime: "",
    cli: "",
    userActivity: "",
    blockRequest: "",
    reasonUserDeactivate: "",
    outboundCall: "N/A",
    encryptedPan: "",
  });
  const [internationalTransactionValues, setInternationalTransactionValues] =
    useState({
      id: "",
      cnic: "",
      username: "",
      accountNumber: "",
      reasonTransChange: "",
      cli: "",
      durationTime: "",
      toDateDurationTime: "",
      blockRequest: "",
      outboundCall: "N/A",
    });
  const [encryptedPan, setencryptedPan] = useState({
    encryptedPan: "",
  });
  const [commentApprove, setCommentApprove] = useState("");
  const [commentReject, setCommentReject] = useState("");

  const { selectedPageSize, totalPages, TotalSize, currentPage, orderBy } =
    pagination;

  const {
    id,
    customerUsername,
    customerCnic,
    userActivity,
    customerAccountNumber,
    userDeactivateDatetime,
    cli,
    blockRequest,
    reasonUserDeactivate,
    outboundCall,
  } = modalInitValues;
  //     //   editModalOpen: false,

  //     //   rejectModalOpen: false,
  //     //   approveModalOpen: false,
  //     //   rejectInternationalModalOpen: false,
  //     //   approveInternationalModalOpen: false,
  //     //   internationalDetailModalOpen: false,
  //     //   collapse: false,

  const selectedOptions = [
    { value: "N/A", label: "N/A" },
    { value: "YES", label: "YES" },
  ];

  useEffect(() => {
    const isAsc = pagination.orderBy?.asec;

    const orderBy = pagination.orderBy?.column;

    setTableLoading(true);
    setKey("1");

    IndexApi(
      searchCriteria,
      pagination.selectedPageSize,
      pagination.currentPage,
      orderBy,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  }, []);

  const onFetchRejectSuccess = () => {
    setIsLoading(false);
    setISMobileRejectModal(!isMobileRejectModal);
    setISMobileApproveModal(!isMobileApproveModal);
    setIsMobileBankingDetails(!isMobileBankingDetails);
    setIsInternationalApproveModal(!isInternationalApproveModal);
    setISInternationalRejectModal(!isInternationalRejectModal);

    // this.setState({
    //   isLoading: false,
    //   rejectModalOpen: false,
    //   approveModalOpen: false,
    //   editModalOpen: false,
    //   rejectInternationalModalOpen: false,

    //   approveInternationalModalOpen: false,
    // });
  };

  const onFetchApproveSuccess = () => {
    setIsLoading(false);
    setISMobileRejectModal(!isMobileRejectModal);
    setISMobileApproveModal(!isMobileApproveModal);
    setIsMobileBankingDetails(!isMobileBankingDetails);
    setIsInternationalApproveModal(!isInternationalApproveModal);
    setISInternationalRejectModal(!isInternationalRejectModal);

    // this.setState({
    //   isLoading: false,
    //   rejectModalOpen: false,
    //   approveModalOpen: false,
    //   editModalOpen: false,
    //   rejectInternationalModalOpen: false,

    //   approveInternationalModalOpen: false,
    // });
  };

  const handleKey = (k) => {
    setTableLoading(true);
    setKey(k);
    const newState = {
      pagination: { ...pagination, currentPage: 1,TotalSize: 0 },
    };

    setPagination(newState.pagination);

    const isAsc = pagination.orderBy?.asec;

    const orderBy = pagination.orderBy?.column;

    if (k === "1") {
      IndexApi(
        searchCriteria,
        newState.pagination.selectedPageSize,
        newState.pagination.currentPage,
        orderBy,
        isAsc,
        onFetchSuccess,
        onFetchFailure
      );
    } else if (k === "2") {
      getMakerTransactionDetails(
        transactionSearchCriteria,
        newState.pagination.selectedPageSize,
        newState.pagination.currentPage,
        orderBy,
        isAsc,
        transactionStatus,
        onFetchInternationTransactionSuccess,
        onFetchFailure
      );
    }
  };

  const handleOnPageChange = (selectedPage) => {
    const selectedPage1 = Number(selectedPage);

    const order = orderBy;
    const { selectedPageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const newState = {
      tableLoading: true,
      pagination: { ...pagination, currentPage: selectedPage1 },
    };
    setPagination(newState.pagination);
    setTableLoading(newState.tableLoading);

    IndexApi(
      searchCriteria,
      selectedPageSize,
      newState.pagination.currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSearch = (searching) => {
    const { currentPage, selectedPageSize, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    setTableLoading(true);

    debugger;
    IndexApi(
      searching,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleTransactionOnSearch = (searching) => {
    const { currentPage, selectedPageSize, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    setTableLoading(true);
    getMakerTransactionDetails(
      searching,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchInternationTransactionSuccess,
      onFetchFailure
    );
  };

  const onFetchSuccess = (Res) => {
    
    const { response, currentPage, totalItem, totalPages } = Res?.data;
    console.log(Res, "<== Data");
    const payload = response?.map((obj) => {
      return {
        ...obj,
        accountNumber: obj?.customerAccountNumber,
        cnic: obj?.customerCnic,
      };
    });

    setItems(payload);
    debugger;
    setPagination({
      ...pagination,
      currentPage: currentPage ? currentPage + 1 : 1,
      totalPages: totalPages ? totalPages : 1,
    });
    setTableLoading(false);
    setIsLoading(false);

  };

  const onFetchFailure = () => {
    setTableLoading(false);
    setIsLoading(false);
    setISMobileRejectModal(false);
    setISMobileApproveModal(false);

    // this.setState({
    //   // rejectModalOpen: false,
    //   // approveModalOpen: false,
    //   // editModalOpen: false,
    // });
    // const {rangeDate,
    //   cnic,
    //   userName,
    //   account} = this.state.editInitValues;
  };

  const onFetchInternationTransactionSuccess = (Res) => {
    const Data = Res?.data;

    setTransactionitems(Data?.response);
    setPagination({
      ...pagination,
      currentPage: Data?.currentPage ? Data?.currentPage + 1 : 1,
      totalPages: Data?.totalPages ? Data?.totalPages : 1,
    });
    setTableLoading(false);
    setIsLoading(false);
    // this.setState({
    //   rejectModalOpen: false,
    //   approveModalOpen: false,
    // });
  };

  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        onDoubleClick: () => toggleEditModel(rowInfo?.original),
      };
    }
    return {};
  };

  const getTransactionProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        onDoubleClick: () => toggleInternationalDetailModal(rowInfo?.original),
      };
    }
    return {};
  };

  // Mobile Banking

  // Mobile Banking UserDetail

  const toggleEditModel = (rowItem) => {
    setIsMobileBankingDetails(!isMobileBankingDetails);
    editModalInitValues(rowItem);
    // this.setState({
    //   setInternationalTransactionValues: rowItem,
    // });
  };

  // Mobile Banking UserDetail rejectMobileBanking
  const rejectMobileBanking = () => {
    const { outboundCall } = modalInitValues;
    if (outboundCall === "YES") {
      setValidateError("");
      setCommentReject("");
      setISMobileRejectModal(!isMobileRejectModal);
    } else {
      setValidateError("");
      setCommentReject("");
      setNotAvailableModal(!notAvilableModalOpen);
    }
  };
  // Mobile Banking UserDetail approveMobileBanking
  const approveMobileBanking = () => {
    const { outboundCall } = modalInitValues;
    if (outboundCall === "YES") {
      setValidateError("");
      setCommentApprove("");
      setISMobileApproveModal(!isMobileApproveModal);
    } else {
      setValidateError("");
      setCommentApprove("");
      setNotAvailableModal(!notAvilableModalOpen);
    }
  };

  const rejectUserStatus = (e) => {
    e.preventDefault();

    const {
      id,
      customerUsername,
      customerCnic,
      userActivity,
      customerAccountNumber,
      userDeactivateDatetime,
      cli,
      blockRequest,
      reasonUserDeactivate,
      outboundCall,
    } = modalInitValues;

    if (commentReject.length <= 5) {
      setValidateError("Approve reason should not be less than 5 character");
    } else {
      const payload = {
        customerId: id,
        userName: customerUsername,
        cnic: customerCnic,
        accountNumber: customerAccountNumber,
        deactivateReason: commentReject,
        userActivity: userActivity,
        cli: cli,
        blockingRequest: blockRequest,
      };
      setValidateError("");
      setIsLoading(true);
      setCommentReject("");
      rejectStatus(payload, onFetchRejectSuccess, onFetchFailure);
    }
  };

  const approveUserStatus = (e) => {
    e.preventDefault();

    const {
      id,
      customerUsername,
      customerCnic,
      userActivity,
      customerAccountNumber,
      userDeactivateDatetime,
      cli,
      blockRequest,
      reasonUserDeactivate,
      outboundCall,
    } = modalInitValues;

    if (commentApprove.length <= 5) {
      setValidateError("Approve reason should not be less than 5 character");
    } else {
      const payload = {
        customerId: id,
        userName: customerUsername,
        cnic: customerCnic,
        accountNumber: customerAccountNumber,
        deactivateReason: Comment,
        userActivity: userActivity,
        cli: cli,
        blockingRequest: blockRequest,
      };
      console.log(payload);
      setValidateError("");
      setIsLoading(true);
      setCommentApprove("");
      approveStatus(payload, onFetchApproveSuccess, onFetchFailure);
    }
  };

  //Mobile Banking UserDetail Update
  const handleEvent = (event) => {
    const tempObj = {
      ...modalInitValues,
      [event.target.name]: event.target.value,
    };
    editModalInitValues(tempObj);
  };

  //InternationalTransaction UserDetail Update
  const handleTransactionEvent = (event) => {
    const tempObj = {
      ...internationalTransactionValues,
      [event.target.name]: event.target.value,
    };
    console.log("TEMPOBJ =>> ", tempObj);
    setInternationalTransactionValues(tempObj);
    setencryptedPan(tempObj);
    // this.setState({
    //   setInternationalTransactionValues: tempObj,
    //   setencryptedPan: tempObj,
    // });
  };

  const toggleInternationalDetailModal = (rowItem) => {
    setIsInternationalDetail(!isInternationalDetail);
    setInternationalTransactionValues(rowItem);
  };

  // international Transaction Approve / Reject

  const rejectInternationalTransaction = () => {
    const { outboundCall } = internationalTransactionValues;
    console.log("HELLO");
    if (outboundCall === "YES") {
      setISInternationalRejectModal(!isInternationalRejectModal);
    } else {
      setNotAvailableModal(!notAvilableModalOpen);
    }
  };

  const approveInternationalTransaction = () => {
    const { outboundCall } = internationalTransactionValues;

    if (outboundCall === "YES") {
      setIsInternationalApproveModal(!isInternationalApproveModal);
    } else {
      setNotAvailableModal(!notAvilableModalOpen);
    }
  };

  const rejectTransactionStatus = (e) => {
    e.preventDefault();

    const {
      id,
      username,
      durationTime,
      cli,
      blockRequest,
      toDateDurationTime,
    } = internationalTransactionValues;
    const { encryptedPan } = encryptedPan;

    if (commentReject.length <= 5) {
      this.setState({
        validateError: "Approve reason should not be less than 5 character",
      });
    } else {
      const payload = {
        customerId: id,
        username: username,
        encryptedPan: encryptedPan,
        cli: cli,
        deactivateReason: commentReject,
        blockingRequest: blockRequest,
        duration: durationTime,
        toDateDuration: toDateDurationTime,
      };
      setValidateError("");
      setTableLoading(true);
      setCommentReject("");
      RejectTransactionStatus(payload, onFetchRejectSuccess, onFetchFailure);
    }
  };

  const approveTransactionStatus = (e) => {
    e.preventDefault();

    const {
      id,
      username,
      cnic,
      accountNumber,
      userDeactivateDatetime,
      reasonTransChange,
      cli,
      blockRequest,
      reasonUserDeactivate,
      outboundCall,
    } = setInternationalTransactionValues;

    if (commentApprove.length <= 5) {
      this.setState({
        validateError: "Approve reason should not be less than 5 character",
      });
    } else {
      const payload = {
        customerId: id,
        username: username,
        cnic: cnic,
        accountNumber: accountNumber,
        deactivateReason: commentApprove,
        cli: cli,
        blockingRequest: blockRequest,
      };
      console.log(payload);
      ApproveTransactionStatus(payload, onFetchApproveSuccess, onFetchFailure);

      setValidateError("");
      setTableLoading(true);
    }
  };

  const columns = [
    {
      Header: "Customer CNIC",
      id: "cnic",
      accessor: "cnic",
      width: 280,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            placeholder="XXXXX-XXXXXXX-X"
            name="cnic"
            defaultValue={searchCriteria?.cnic}
            // maxLength={14}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 14 ||
                event.which === 14
              ) {
                const { value } = event.target;
                let Cnic = value;
                if (value?.includes("-")) {
                  Cnic = value?.split("-").join("");
                }
                onChange(Cnic); // Trigger the onSearch event
              }
            }}
            onChange={(event) => {
              const { value } = event.target;
              let Cnic = value;
              if (value?.includes("-")) {
                Cnic = value?.split("-").join("");
              }

              if (value.length <= 0) onChange(Cnic);
            }}
          />
        );
      },
    },
    {
      Header: "Customer Account Number",
      id: "accountNumber",
      accessor: "accountNumber",
      width: 280,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.accountNumber}
            name="accountNumber"
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 13 ||
                event.which === 13
              ) {
                onChange(event.target.value.trim());
              }
            }}
            onChange={(event) => {
              const { value } = event.target;
              // setSearchCriteria({[event.target.name]: event.target.value})
              if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
            }}
          />
        );
      },
    },
    {
      Header: "Request Type",
      id: "userActivity",
      accessor: "userActivity",
      filterable: false,
      width: 280,

      //   Filter: CustomInputElement(),
    },
    {
      Header: "Details",
      id: "details",
      accessor: "details",
      width: 250,
      filterable: false,
      Cell: (cell) => {
        return (
          <div className="text-center">
            {Items && (
              <Button
                color="primary"
                size="xs"
                onClick={() => toggleEditModel(cell?.original)}
              >
                <i className="glyph-icon simple-icon-eye mr-1"></i> View
              </Button>
            )}
          </div>
        );
      },
      //   Filter: CustomInputElement(),
    },
  ];

  const internationalTransactionColumns = [
    {
      Header: "Customer CNIC",
      id: "cnic",
      accessor: "cnic",
      width: 280,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            placeholder="XXXXX-XXXXXXX-X"
            name="cnic"
            defaultValue={transactionSearchCriteria?.cnic || ""}
            // maxLength={14}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 14 ||
                event.which === 14
              ) {
                const { value } = event.target;
                let Cnic = value;
                if (value?.includes("-")) {
                  Cnic = value?.split("-").join("");
                }
                onChange(Cnic); // Trigger the onSearch event
              }
            }}
            onChange={(event) => {
              const { value } = event.target;
              let Cnic = value;
              if (value?.includes("-")) {
                Cnic = value?.split("-").join("");
              }

              if (value.length <= 0) onChange(Cnic);
            }}
          />
        );
      },
    },
    {
      Header: "Customer Account Number",
      id: "accountNumber",
      accessor: "accountNumber",
      width: 280,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={transactionSearchCriteria.accountNumber || ""}
            name="accountNumber"
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 13 ||
                event.which === 13
              ) {
                onChange(event.target.value);
              }
            }}
            onChange={(event) => {
              const { value } = event.target;
              // setSearchCriteria({[event.target.name]: event.target.value})
              if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
            }}
          />
        );
      },
    },
    {
      Header: "Request Type",
      id: "activity",
      accessor: "activity",
      filterable: false,
      width: 280,

      //   Filter: CustomInputElement(),
    },
    {
      Header: "Details",
      id: "details",
      accessor: "details",
      width: 250,
      filterable: false,
      Cell: (cell) => {
        return (
          <div className="text-center">
            {Items && (
              <Button
                color="primary"
                size="xs"
                onClick={() => toggleInternationalDetailModal(cell?.original)}
              >
                <i className="glyph-icon simple-icon-eye mr-1"></i> View
              </Button>
            )}
          </div>
        );
      },
      //   Filter: CustomInputElement(),
    },
  ];
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
              <IntlMessages id="menu.CallCenterSupervisor" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        <Colxx xxs="12" className="mt-4">
          <Row>
            <Colxx xxs="12" xs="6" lg="12">
              <Card className="mb-4">
                <CardTitle
                  style={{
                    // color: "#23527c",
                    fontSize: "1.75rem",
                    // fontWeight: "bold",
                  }}
                  className="m-3"
                >
                  <IntlMessages id="cards.details" />
                </CardTitle>

                {/* Navigation [START] */}

                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => handleKey(k)}
                  defaultActiveKey="1"
                  className="mb-3"
                >
                  <Tab eventKey="1" title="Mobile Banking Block Request">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <ReactTable
                            data={Items}
                            columns={columns}
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
                            loading={tableLoading}
                            getTrProps={getTrProps}
                            defaultPageSize={selectedPageSize}
                            PaginationComponent={DataTablePagination}
                            manual
                            onPageChange={(selectedPage) =>
                              handleOnPageChange(selectedPage + 1)
                            }
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
                            onFilteredChange={(filtered, column, value) => {
                              console.log("hello world....", filtered);
                              const searchCriteria =
                                transformToObject(filtered);
                              setSearchCriteria(searchCriteria);

                              console.log(searchCriteria, "<<=Searching");
                              handleOnSearch(searchCriteria); // Trigger handle search
                            }}
                          />
                        </CardBody>
                      </Colxx>
                    </Row>
                  </Tab>
                  {/* {
                    this.state.isactiveTab ?  */}
                  <Tab
                    eventKey="2"
                    title="International Transaction Enable Request"
                  >
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <ReactTable
                            data={transactionItems}
                            columns={internationalTransactionColumns}
                            filterable={true}
                            TbodyComponent={CustomTBodyComponent}
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
                            getTrProps={getTransactionProps}
                            // onPageChange={(selectedPage) => this.handleOnPageChange(selectedPage+1) }
                            // defaultFilterMethod={(filter, row, column) => {
                            //   return true;
                            // }}
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
                            onFilteredChange={(filtered, column, value) => {
                              console.log("hello world....", filtered);
                              const searchCriteria =
                                transformToObject(filtered);
                              setTransactionSearchCriteria(searchCriteria);
                              console.log(searchCriteria, "<<=Searching");
                              handleTransactionOnSearch(searchCriteria); // Trigger handle search
                            }}
                          />
                        </CardBody>
                      </Colxx>
                    </Row>
                  </Tab>
                </Tabs>
              </Card>
            </Colxx>
          </Row>
        </Colxx>

        {/* Mobile Banking UserDetail Modal [START] */}

        <Modal
          size="lg"
          isOpen={isMobileBankingDetails}
          toggle={toggleEditModel}
        >
          <ModalHeader toggle={toggleEditModel}>User Details</ModalHeader>
          <ModalBody>
            <Form>
              <Row className="container">
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={customerCnic || ""}
                      label="Customer CNIC"
                      type="text"
                      id="customerCnic"
                      disabled={true}
                      name="customerCnic"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={customerAccountNumber || ""}
                      label="Account Number"
                      type="text"
                      id="customerAccountNumber"
                      disabled={true}
                      name="customerAccountNumber"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={userDeactivateDatetime || ""}
                      label="User Deactivate Date/Time"
                      type="text"
                      id="userDeactivateDatetime"
                      disabled={true}
                      name="userDeactivateDatetime"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={cli || ""}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled={true}
                      required={true}
                      // style={{ borderRadius: "50px" }}
                      name="cli"
                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={reasonUserDeactivate || ""}
                      label="Reason of User Activate / Deactivate"
                      type="textarea"
                      id="reasonUserDeactivate"
                      // maxLength={50}

                      disabled={true}
                      // style={{ borderRadius: "50px" }}
                      name="reasonUserDeactivate"

                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={blockRequest || ""}
                      label="Blocking Request"
                      type="text"
                      id="blockRequest"
                      // maxLength={50}
                      disabled
                      // style={{ borderRadius: "50px" }}
                      name="blockRequest"

                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <SelectInput
                      options={selectedOptions}
                      value={outboundCall || ""}
                      label="Outbound Call"
                      // type="select"
                      // id="blockingrequest"
                      // style={{ borderRadius: "50px" }}
                      name="outboundCall"
                      handleChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <Button
                    style={{ float: "right", marginLeft: "4px" }}
                    color="secondary"
                    outline
                    onClick={rejectMobileBanking}
                  >
                    <span className="label">Reject</span>
                  </Button>
                  <Button
                    style={{ float: "right" }}
                    color="primary"
                    onClick={approveMobileBanking}
                  >
                    <span className="label">
                      {/* <IntlMessages id="user.login-button" />   */}
                      Approve
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        {/* Modal Mobile Banking Reject/Approve [START] */}

        <Modal
          size="lg"
          isOpen={isMobileRejectModal}
          toggle={rejectMobileBanking}
        >
          <ModalHeader toggle={rejectMobileBanking} closebutton={"true"}>
            <IntlMessages id="label.rejectModal" />
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={rejectUserStatus}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues?.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled={true}
                      name="cli"
                      placeholder="Enter CLI"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={commentReject}
                      label="Comment"
                      type="textarea"
                      required
                      id="Comment"
                      name="Comment"
                      placeholder="Enter Comment"
                      errors={validateError}
                      onChange={(e) => setCommentReject(e.target.value)}
                    />
                  </FormGroup>
                </Colxx>
              </Row>
              <Colxx xxs="12" className="d-flex justify-content-end">
                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow btn-multiple-state mr-1
            ${isLoading ? "show-spinner" : ""}`}
                  disabled={isLoading}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Submit</span>
                </Button>{" "}
                <Button color="secondary" onClick={rejectMobileBanking}>
                  Cancel
                </Button>
              </Colxx>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          size="lg"
          isOpen={isMobileApproveModal}
          toggle={approveMobileBanking}
        >
          <ModalHeader toggle={approveMobileBanking}>
            <IntlMessages id="label.approveModal" />
          </ModalHeader>
          <ModalBody>
            {/* // <Form onSubmit={handleTab}>  */}
            <Form onSubmit={approveUserStatus}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={modalInitValues?.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled
                      name="cli"
                      placeholder="Enter CLI"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={commentApprove}
                      label="Comment"
                      type="textarea"
                      id="Comment"
                      name="Comment"
                      required
                      placeholder="Enter Comment"
                      errors={validateError}
                      onChange={(e) => setCommentApprove(e.target.value)}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state mr-1
                  ${isLoading ? "show-spinner" : ""}`}
                    disabled={isLoading}
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Submit</span>
                  </Button>{" "}
                  <Button color="secondary" onClick={approveMobileBanking}>
                    Cancel
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        {/* international Transaction UserDetail Modal */}
        <Modal
          size="lg"
          isOpen={isInternationalDetail}
          toggle={toggleInternationalDetailModal}
        >
          <ModalHeader toggle={toggleInternationalDetailModal}>
            User Details
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row className="container">
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.username}
                      label="Username"
                      type="text"
                      id="username"
                      disabled={true}
                      name="username"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.reasonTransChange}
                      label="Reason to enable international transactions"
                      type="text"
                      id="reason_trans_change"
                      disabled={true}
                      name="reason_trans_change"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled={true}
                      name="cli"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.durationTime}
                      label="From Date/Time"
                      type="text"
                      id="durationTime"
                      disabled={true}
                      required={true}
                      // style={{ borderRadius: "50px" }}
                      name="durationTime"
                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.toDateDurationTime}
                      label="To Date/Time"
                      type="textarea"
                      id="toDateDurationTime"
                      disabled={true}
                      // style={{ borderRadius: "50px" }}
                      name="toDateDurationTime"

                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.blockRequest}
                      label="Blocking Request"
                      type="text"
                      id="blockRequest"
                      // maxLength={50}
                      disabled
                      // style={{ borderRadius: "50px" }}
                      name="blockRequest"

                      // onChange={handleEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="6">
                  <FormGroup>
                    <SelectInput
                      options={selectedOptions}
                      value={
                        !internationalTransactionValues?.outboundCall
                          ? "N/A"
                          : internationalTransactionValues?.outboundCall
                      }
                      label="Outbound Call"
                      // type="select"
                      // id="blockingrequest"
                      // style={{ borderRadius: "50px" }}
                      name="outboundCall"
                      handleChange={handleTransactionEvent}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12">
                  <Button
                    style={{ float: "right", marginLeft: "4px" }}
                    color="secondary"
                    outline
                    onClick={rejectInternationalTransaction}
                  >
                    <span className="label">Reject</span>
                  </Button>
                  <Button
                    style={{ float: "right" }}
                    color="primary"
                    onClick={approveInternationalTransaction}
                  >
                    <span className="label">Approve</span>
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        {/* Modal InternationTransaction Reject/Approve [START] */}

        <Modal
          size="lg"
          isOpen={isInternationalRejectModal}
          toggle={() =>
            setISInternationalRejectModal(!isInternationalRejectModal)
          }
        >
          <ModalHeader
            toggle={() =>
              setISInternationalRejectModal(!isInternationalRejectModal)
            }
            closebutton={"true"}
          >
            <IntlMessages id="label.transactionReason" />
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={rejectTransactionStatus}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled={true}
                      name="cli"
                      placeholder="Enter CLI"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={commentApprove}
                      label="Comment"
                      type="textarea"
                      required
                      id="Comment"
                      name="Comment"
                      placeholder="Enter Comment"
                      errors={validateError}
                      onChange={(e) => setCommentReject(e.target.value)}
                    />
                  </FormGroup>
                </Colxx>
              </Row>
              <Colxx xxs="12" className="d-flex justify-content-end">
                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow btn-multiple-state mr-1
            ${isLoading ? "show-spinner" : ""}`}
                  disabled={isLoading}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Submit</span>
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() =>
                    setISInternationalRejectModal(!isInternationalRejectModal)
                  }
                >
                  Cancel
                </Button>
              </Colxx>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          size="lg"
          isOpen={isInternationalApproveModal}
          toggle={() =>
            setIsInternationalApproveModal(!isInternationalApproveModal)
          }
        >
          <ModalHeader
            toggle={() =>
              setIsInternationalApproveModal(!isInternationalApproveModal)
            }
          >
            <IntlMessages id="label.transactionReason" />
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={approveTransactionStatus}>
              <Row className="container">
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={internationalTransactionValues?.cli}
                      label="CLI"
                      type="text"
                      id="cli"
                      disabled
                      name="cli"
                      placeholder="Enter CLI"
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm="12">
                  <FormGroup>
                    <InputField
                      value={commentApprove}
                      label="Comment"
                      type="textarea"
                      id="Comment"
                      name="Comment"
                      required
                      placeholder="Enter Comment"
                      errors={validateError}
                      onChange={(e) => setCommentApprove(e.target.value)}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state mr-1
                  ${isLoading ? "show-spinner" : ""}`}
                    disabled={isLoading}
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Submit</span>
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() =>
                      setIsInternationalApproveModal(
                        !isInternationalApproveModal
                      )
                    }
                  >
                    Cancel
                  </Button>
                </Colxx>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        {/* Modal N/A Reject/Approve [START] */}

        <Modal
          size="lg"
          isOpen={notAvilableModalOpen}
          toggle={() => setNotAvailableModal(!notAvilableModalOpen)}
        >
          <ModalHeader
            toggle={() => setNotAvailableModal(!notAvilableModalOpen)}
          >
            <IntlMessages id="label.approveModal" />
            Call Center SuperVisor
          </ModalHeader>
          <ModalBody>
            {/* //  <Form onSubmit={handleTab}>  */}
            Cannot approve request. Please update status for outbound call to
            YES.
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setNotAvailableModal(!notAvilableModalOpen)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Colxx>
    </>
  );
};

export default CallCenterSupervisor;
