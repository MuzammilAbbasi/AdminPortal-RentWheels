import React, { useEffect, useState , useLayoutEffect } from "react";

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
import { fetchIps, fetchSelfRegistration } from "./apiCalls";
import { transformToObject } from "helpers/Utils";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import CustomModal from "containers/modals/CustomModal";  
import XLSX from "xlsx";
import {
  formFields,
  validationSchema,
} from "./form/formmeta";
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
import CNICField from "../../inputFields/cnicField";
import InputField from "../../inputFields/InputField";
import SelectInput from "../selectInput";
const BulkFundTransferFilesList = (props) => {
  console.log(props, "PROPS");
  const { match } = props;
  console.log(match,"MATCH")
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tableLoading, settableLoading] = useState(false);
  const [Items,setItems] = useState([]);
  const [sheetData,setSheetData] = useState(null);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: "StampDate",
  });
  const[modalInitValue,editModalInitValues] = useState(
    {
      userName:"",
      reasontransactions: "",
      cli: "",
      dateandtime: "",
      todateandtime: "",
      blockreq: "",
      outboundcall:"" ,
      isaccepted: false,
      // iscallcenterAccepted: true
    }
  )
  
  const { totalPages, selectedPageSize } = pagination;
  const [modalOpen,editModalOpen] = useState(false)
  

  const onFetchFailure = () => {
    // const { isLoading, islogin, isactiveTab } = this.state;
    // const {rangeDate,
    //   cnic,
    //   userName,
    //   account} = this.state.editInitValues;
    console.log("Errrrrrr Notify.... in Registration");
    settableLoading(false);
    // if (this.state.isPagination) {
    //   this.setState({
    //     pagination: {
    //       ...this.state.pagination,
    //       currentPage: 0,
    //     },
    //     Items: [],
    //     tableLoading: false,
    //     // tableLoading: false,
    //     isLoading: false,
    //     islogin: true,
    //     showLoadingOverlay: false,
    //   });
    // } else {
    //   this.setState({
    //     // tableData: [],
    //     editCustomerInitValues: "",
    //     editInitValues: {
    //       rangeDate: [new Date(),new Date()],
    //       cnic: "",
    //       userName: "",
    //       account: "",
    //     },
    //     islogin: false,
    //     isLoading: false,
    //     isactiveTab: !isactiveTab,
    //   });
    // }
  };
  const handleonExport = () => {
    // const header = fileHeaders.map((c) => c.exportValue);
    // console.log("HEADERS =>>",header)
    var today = new Date()
    let time = today.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    let date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
    console.log("DATE =>> ",date)
    console.log("TIME =>> ",time)
    var wb = XLSX.utils.book_new();
    var wscols = [
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15},
      {wch:15}
  ];
  
  // var ws = XLSX.utils.json_to_sheet(sheetData, {header});
  var ws = XLSX.utils.json_to_sheet(sheetData);
  ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb , ws, "Self Registration")

    XLSX.writeFile(wb, `${date}_${time}_Self_Registered_users.xlsx`)
  }

  // const onFetchSuccess = (data) => {
  //   debugger
  //   console.log("onFetchSuccess: ", data);
  //   setItems(data);
  //   setSheetData(data)
  //   // setLoading(false);
  //   settableLoading(false)
  //   // const { isLoading, islogin, isactiveTab, isPagination } = this.state;
  //   // console.log(isPagination, "isPagination");
  //   // if (isPagination) {
  //   //   const { response, totalPages, currentPage } = data;
  //   //   this.setState({
  //   //     Items: response,
  //   //     tableLoading: false,
  //   //     pagination: {
  //   //       ...this.state.pagination,
  //   //       currentPage: currentPage + 1,
  //   //       totalPages,
  //   //     },
  //   //     isLoading: false,
  //   //     islogin: true,
  //   //     showLoadingOverlay: false,
  //   //   });
  //   // } else {
  //   //   let accountNo = data?.data.account;
  //   //   let Data = data?.data;
  //   //   this.setState({
  //   //     editCustomerInitValues: Data,
  //   //     isLoading: false,
  //   //     islogin: true,
  //   //     isactiveTab: !isactiveTab,
  //   //   });
  //   // }
  // };

  // useLayoutEffect(() => {
  //   console.log("USEEFFECT!")
  //   settableLoading(true);
  //   fetchSelfRegistration(
  //     onFetchSuccess,
  //     onFetchFailure
  //   )

  // }, [])

  // const fileHeaders = React.useMemo(
  //   () => [
  //     {
  //       columns: [
  //         {
  //           Header: "ID",
  //           accessor: "id",
  //         },
  //         {
  //           Header: "From Account",
  //           accessor: "fromaccount",
  //         },
  //         {
  //           Header: "From Bank IMD",
  //           accessor: "frombankimd",
  //         },
  //         {
  //           Header: "To Account",
  //           accessor: "toaccount",
  //         },
  //         {
  //           Header: "ToBankName",
  //           accessor: "toBankname",
  //         },
  //         {
  //           Header: "To Bank IMD",
  //           accessor: "tobankimd",
  //         },
  //         {
  //           Header: "Amount",
  //           accessor: "amount",
  //         },
  //         {
  //           Header: "Payment Mode",
  //           accessor: "paymentmode",
  //         },
  //         {
  //           Header: "Cheque Number",
  //           accessor: "chequenumber",
  //         },
  //         {
  //           Header: "Date Time",
  //           accessor: "date",
  //         },
  //         {
  //           Header: "To Account Title",
  //           accessor: "toaccounttitle",
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  const toggle = () => {
    console.log("Toggle!");
    
  };

  const handleTab = (e) => {
    e.preventDefault();
    console.log("handleTab!",e);
  };
  // const handleEvent = (event, picker) => {

  //   // const { rangeDate } = this.state.editInitValues;
  //   console.log("this.props: ", props);
  //   console.log("Event : ", event);
  //   console.log("Event : ", picker);
  //   const target = event.target;
  //   const name = event.target.name;
  //   console.log(target, "TargetType");
  //   const val = event.target.value;
  //   console.log(val, "Value");

  //   console.log(val, "Cnic");
  //   setInitialValue(prevState => ({
  //     ...prevState,
  //     [name]: val,

  //   }));
  // };
  const columns = [
    {
      Header: "Batch ID	",
      id: "batch id",
      accessor: "batch id",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "	Total Number of data",
      id: "numberofdata",
      accessor: "numberofdata",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Upload file name",
      id: "Uploadfilename",
      accessor: "Uploadfilename",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    // 

    {
      Header: "File Status",
      id: "FileStatus",
      accessor: "FileStatus",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Date Time Upload file	",
      id: "datetime",
      accessor: "datetime",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Details",
      id: "Details",
      accessor: "Details",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
  ]
    
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
              <IntlMessages id="menu.listOfUploadedFiles" />
            </h1>
            {/* <Breadcrumb match={match.url} /> */}
          </div>
        </div>
        {/* // style={{ overflow: "hidden" }} for upper of ForM */}
        <Card>
          <CardBody>
              <Row>
                <Colxx xxs="12" xl="12">
                <ReactTable
                      data={Items}
                      columns={columns}
                      filterable={true}
                      // className="-highlight react-table-fixed-height"
                      // style={{ cursor: "pointer" }}
                      TbodyComponent={CustomTBodyComponent}
                      noDataText="Data Not Found"
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
                      // defaultFilterMethod={(filter, row, column) => {
                      //   return true;
                      // }}
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
                </Colxx>
              </Row>
            
          </CardBody>
        </Card>
      </Colxx>
    </>
  );
};

export default BulkFundTransferFilesList;
