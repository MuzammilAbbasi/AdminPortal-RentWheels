import React, { useEffect, useState, useLayoutEffect } from "react";

import ReactTable from "react-table";
import moment from "moment";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { CustomInputElement } from "components/custom/customInput";
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from "components/custom/LoadingOverlay";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import FormikCustomComponents from "containers/forms/FormikCustomComponents";
import MobileNumberField from "../../inputFields/mobileNumberField";
import DataTablePagination from "../../../../components/DatatablePagination";
// import { DateRangePicker } from 'rsuite';
import {
  fetchIps,
  fetchSafTransaction,
  fetchSelfRegistrationSuperVisor,
} from "./apiCalls";
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
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Tab, Tabs } from "react-bootstrap";
import CustomModal from "containers/modals/CustomModal";
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
import { formFields, validationSchema } from "./form/formmeta";
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
const SelfRegistrationSupervisor = (props) => {
  const { match } = props;
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tableLoading, settableLoading] = useState(false);
  const [date, setDate] = useState("");
  const [modalOpen, editModalOpen] = useState(false);
  const [Items, setItems] = useState([]);
  const [customerInitValue, editCustomerInitValues] = useState({
    username: "",
    cnic: "",
    mobileNo: "",
    email: "",
    customerStatus: "",
  });

  const [accountInitValue, editAccountInitValues] = useState({
    accountNumber: "",
    accountTitle: "",
    accountType: "",
    accountNature: "",
    ibanNo: "",
  });

  const [searchCriteria, setSearchCriteria] = useState({
    accountNumber: "",
    status: "",
    accountTitle: "",
    cnic: "",
    mobileNo: "",
    email: "",
    registrationDate: "",
    reason: "",
    customerLevel: "",
  });

  const [remarks, setRemarks] = useState("Not Attended");
  const [pagination, setPagination] = useState({
    totalPages: "",
    currentPage: 0,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: {
      column: "id",
      asec: "true",
    },
  });
  const { totalPages, selectedPageSize } = pagination;
  const [detailModalOpen, editDetailModalOpen] = useState(false);

  const [searchDate,setSearchDate] = useState("");

  const onFetchSuccess = (data) => {
    // console.log("searchcriteria: ", searchCriteria);
    // debugger
    const { currentPage, pageSize, totalPages, response } = data;

    debugger
    const payload = response?.map((obj) => {
      return {
        ...obj,
        accountNumber: obj?.accountNumber,
        accountTitle: obj?.accountTitle,
        cnic: obj?.cnic,
        lastActivity: obj?.lastActivity
          ? obj?.lastActivity
          : "N/A",
        registrationDate: obj?.registrationDate,
        mobileNo: obj?.mobileNo,
        email: obj?.email,
        status: obj?.customerStatus,
        customerLevel: obj?.customerLevel,
      };
    });

    setPagination({
      ...pagination,
      currentPage: currentPage ? currentPage : 0,
      totalPages: totalPages ? totalPages : 0,
    });
    setItems(payload);
    settableLoading(false);
  };

  const onFetchFailure = () => {
    setPagination({
      ...pagination,
      currentPage: 0,
      totalPages: 1,
    });
    settableLoading(false);
    setItems([]);
  };

  useLayoutEffect(() => {
    const { selectedPageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const orderby = orderBy?.column;
    settableLoading(true);

    fetchSelfRegistrationSuperVisor(
      searchCriteria,
      selectedPageSize,
      currentPage,
      orderby,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  }, []);

  const toggleEditModel = (rowItem) => {
    editModalOpen(!modalOpen);
  };

  const handleOnPageChange = (selectedPage) => {
    const selectedPage1 = Number(selectedPage) - 1;
    // debugger;
    // const order = orderBy;
    const { selectedPageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    const newState = {
      pagination: { ...pagination, currentPage: selectedPage1 },
    };
    setPagination(newState.pagination);
    settableLoading(true);
    fetchSelfRegistrationSuperVisor(
      searchCriteria,
      selectedPageSize,
      newState.pagination.currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const detailtogglebuttonModel = (rowItem) => {
    const { original } = rowItem;
    editDetailModalOpen(!detailModalOpen);

    const accountDetails = {
      accountNature: original?.accountNature,
      accountNumber: original?.accountNumber,
      accountTitle: original?.accountTitle,
      accountType: original?.accountType,
      accountNumber: original?.accountNumber,
      ibanNo: original?.ibanNo,
    };
    const customerDetails = {
      cnic: original?.cnic,
      username: original?.userName,
      email: original?.email,
      customerStatus: original?.customerStatus,
      mobileNo: original?.mobileNo,
    };
    editAccountInitValues(accountDetails);
    editCustomerInitValues(customerDetails);
  };

  const selectedOptions = [
    { value: "Not Attended", label: "N/A" },
    { value: "Approved", label: "YES" },
    { value: "Reject", label: "YES" },
    { value: "Route To Branch", label: "YES" },
  ];

  const handleEvent = (event) => {
    // let obj = modalInitValues;
    // const { editModalInitValues,setInternationalTransactionValues } = this.state;
    const tempObj = {
      // ...editModalInitValues,
      [event.target.name]: event.target.value,
    };
    setRemarks(tempObj);
    // this.setState({
    //   editModalInitValues: tempObj,
    // });
  };

  const handleOnSearch = (searching) => {
    const { currentPage, selectedPageSize, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    settableLoading(true);
    fetchSelfRegistrationSuperVisor(
      searching,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSort = (orderBy) => {
    // console.log(orderBy);
    const { currentPage } = pagination;
    const order = orderBy.column;
    const isAsc = orderBy.asec;
    settableLoading(true);
    fetchSelfRegistrationSuperVisor(
      searchCriteria,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const columns = [
    {
      Header: "Account Number",
      id: "accountNumber",
      accessor: "accountNumber",
      className: "text-center",
      headerClassName: "text-center",
      width: 150,
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
      Header: "Account Title",
      id: "accountTitle",
      accessor: "accountTitle",
      className: "text-center",
      headerClassName: "text-center",
      width: 200,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.accountTitle}
            name="accountTitle"
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
      Header: "Cnic",
      id: "cnic",
      accessor: "cnic",
      className: "text-center",
      headerClassName: "text-center",
      width: 150,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <CNICField
            // autoFocus
            defaultValue={searchCriteria?.cnic}
            // value={searchCriteria?.cnic}
            placeholder={"Enter CNIC"}
            // required={true}
            name="cnic"
            maxLength={14}
            style={{
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 13 ||
                event.which === 13
              ) {
                const { value } = event.target;
                let Cnic = value;
                if (value.includes("-") || value.includes("_")) {
                  Cnic = value.split("-").join("").split("_").join("");
                }
                console.log(Cnic);
                onChange(Cnic);
              }
            }}
            handleChange={(event) => {
              const { value } = event.target;
              let Cnic = value;
              if (value.includes("-") || value.includes("_")) {
                Cnic = value.split("-").join("").split("_").join("");
              }
              if (value.length <= 0) onChange(Cnic); // Trigger the onSearch event.
            }}
          />
        );
      },
    },

    {
      Header: "Mobile Number",
      id: "mobileNo",
      accessor: "mobileNo",
      className: "text-center",
      headerClassName: "text-center",
      width: 150,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <MobileNumberField
            // value={searchCriteria?.mobileNo}
            defaultValue={searchCriteria?.mobileNo}
            name="mobileNo"
            // type='number'
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 13 ||
                event.which === 13
              ) {
                onChange(event.target.value);
              }
            }}
            handleChange={(event) => {
              const { value } = event.target;
              console.log("value: ", value);
              if (value.length <= 0) onChange(value); // Trigger the onSearch event.
            }}
          />
        );
      },
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      width: 150,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.email}
            name="email"
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
              if (value.length <= 0) onChange(value); // Trigger the onSearch event.
            }}
          />
        );
      },
    },
    {
      Header: () => <div>Registration Date</div>,
      id: "registrationDate",
      accessor: "registrationDate",
      className: "text-center",
      headerClassName: "text-center",
      width: 200,
      Filter: ({ filter, onChange }) => {
        return (
          <div>
            <DatePicker
              selected={searchDate}
              dateFormat="dd-MM-yyyy"
              isClearable
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              style={{ height: "20px" }}
              placeholderText={`${moment(new Date()).format("DD-MM-YYYY")}`}
              onChange={(date) => {
                setSearchDate(date)
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
      className: "text-center",
      headerClassName: "text-center",
      width: 150,
      Filter: ({ filter, onChange }) => {
        const tranStatus = [
          { name: "Show All", value: "Show All" },
          { name: "Pending", value: "Pending" },
          { name: "makerApproved", value: "makerApproved" },
          { name: "makerReject", value: "makerReject" },
        ];
        return (
          <SelectInput
            options={tranStatus}
            value={searchCriteria?.status}
            name="status"
            handleChange={(event) => {
              let selectedOptions = [].slice
                .call(event.target.selectedOptions)
                .map((o) => {
                  return o.value;
                });
              setSearchCriteria({ [event.target.name]: event.target.value });
              onChange(event.target.value);
            }}
            style={{
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
          />
        );
      },
    },
    {
      Header: "Reason",
      id: "lastActivity",
      accessor: "lastActivity",
      className: "text-center",
      headerClassName: "text-center",
      width: 250,
      filterable: false,
    },
    {
      Header: "Customer Level",
      id: "customerLevel",
      accessor: "customerLevel",
      className: "text-center",
      headerClassName: "text-center",
      width: 120,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.customerLevel}
            name="customerLevel"
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
      Header: "Details",
      id: "details",
      accessor: "details",
      className: "text-center",
      headerClassName: "text-center",
      width: 250,
      filterable: false,
      Cell: (original) => {
        return (
          <div className="text-center">
            {Items ? (
              <Button
                color="primary"
                size="xs"
                onClick={() => detailtogglebuttonModel(original)}
              >
                <i className="glyph-icon simple-icon-eye mr-1"></i> View
              </Button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        onDoubleClick: () => detailtogglebuttonModel(rowInfo),
      };
    }
    return {};
  };
  return (
    <>
      <Colxx xxs="12">
        <div>
          <div className="d-flex align-items-center">
            <h1
              style={{
                color: "#23527c",
                cursor: "pointer",
                // fontWeight:   "bold",
              }}
            >
              <IntlMessages id="menu.SelfRegistrationSupervisor" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        {/* style={{ overflow: "hidden" }} for upper of ForM */}
        <Card>
          <CardBody>
            <Row>
              <Colxx xxs="12" xl="12">
                <ReactTable
                  data={Items != null ? Items : null}
                  columns={columns}
                  filterable={true}
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
                  // defaultPageSize={selectedPageSize}
                  PaginationComponent={DataTablePagination}
                  manual
                  getTrProps={getTrProps}
                  onPageChange={(selectedPage) =>
                    handleOnPageChange(selectedPage + 1)
                  }
                  defaultFilterMethod={(filter, row, column) => {
                    return true;
                  }}
                  onSortedChange={(sortProperties, columns, additive) => {
                    const [item] = sortProperties;
                    console.log("Item ==>", item);
                    const { id, desc } = item;
                    const orderBy = {
                      column: id,
                      asec: !desc,
                    };
                    setPagination({
                      orderBy:orderBy
                    });
                    settableLoading(true);
                    

                    handleOnSort(orderBy); // Trigger handle onsort.
                  }}
                  onFilteredChange={(filtered, column, value) => {
                    const searching = transformToObject(filtered);
                    console.log("SEarching", searching);
                    if (searching?.registrationDate) {
                      console.log(searching);
                    }
                    setSearchCriteria(searching);
                    handleOnSearch(searching); // Trigger handle search
                  }}
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
        <Modal
          size="lg"
          isOpen={detailModalOpen}
          toggle={detailtogglebuttonModel}
        >
          <ModalHeader toggle={detailtogglebuttonModel} closebutton={"true"}>
            <IntlMessages id="label.selfRegistration" />
          </ModalHeader>
          <ModalBody>
            <div>
              <h3>Customer Details</h3>
            </div>
            <Card>
              <CardBody>
                <Row className="container">
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={customerInitValue?.username}
                        label="User Name"
                        type="text"
                        id="username"
                        disabled={true}
                        name="username"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={customerInitValue?.cnic}
                        label="CNIC"
                        type="text"
                        disabled
                        id="cnic"
                        name="cnic"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={customerInitValue?.mobileNo}
                        label="Mobile No"
                        type="text"
                        disabled
                        id="mobileNo"
                        name="mobileNo"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={customerInitValue?.email}
                        label="Email"
                        type="text"
                        disabled
                        id="email"
                        name="email"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={customerInitValue?.customerStatus}
                        label="Status"
                        type="text"
                        disabled
                        id="customerStatus"
                        name="customerStatus"
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
            <div className="mt-3">
              <h3>Account Details</h3>
            </div>
            <Card>
              <CardBody>
                <Row className="container">
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={accountInitValue?.accountNumber}
                        label="Account Number"
                        type="text"
                        id="accountNumber"
                        disabled={true}
                        name="accountNumber"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={accountInitValue?.accountTitle}
                        label="Account Title"
                        type="text"
                        disabled
                        id="accountTitle"
                        name="accountTitle"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={accountInitValue?.accountType}
                        label="Account Type"
                        type="text"
                        disabled
                        id="accountType"
                        name="accountType"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={accountInitValue?.accountNature}
                        label="Account Nature"
                        type="text"
                        disabled
                        id="accountNature"
                        name="accountNature"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm="6">
                    <FormGroup>
                      <InputField
                        value={accountInitValue?.ibanNo}
                        label="Iban No"
                        type="text"
                        disabled
                        id="ibanNo"
                        name="ibanNo"
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
            <div className="mt-3">
              <h3>Remarks</h3>
            </div>
            <Card className="p-0 m-0">
              <CardBody>
                <Row className="container">
                  <Colxx sm="6">
                    <FormGroup>
                      <SelectInput
                        options={selectedOptions}
                        value={remarks}
                        label="Remarks"
                        // type="select"
                        // id="blockingrequest"
                        // style={{ borderRadius: "50px" }}
                        name="remarks"
                        handleChange={handleEvent}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
            <Colxx sm="12" className="d-flex justify-content-end mt-3">
              <Button
                // style={{ float: "right", marginLeft: "4px" }}
                color="secondary"
                size="lg"
                className="m-1"
                // disabled={isLoading}
                // onClick={temporaryBlockCancel}
              >
                <span className="label">Submit</span>
              </Button>
              <Button
                // style={{ float: "right", marginLeft: "4px" }}
                color="primary"
                size="lg"
                className="m-1"
                // disabled={isLoading}
                // onClick={temporaryBlockCancel}
              >
                <span className="label">Approve</span>
              </Button>
              <Button
                // style={{ float: "right" }}
                color="danger"
                className="m-1"
                size="lg"
                disabled={isLoading}
              >
                <span className="label">
                  {/* <IntlMessages id="user.login-button" />  */}
                  Reject
                </span>
              </Button>
            </Colxx>
          </ModalBody>
        </Modal>
      </Colxx>
    </>
  );
};

export default SelfRegistrationSupervisor;
