import React, { useState } from "react";
import moment from "moment";
import MaskedInput from "react-text-mask";
import MobileNumberField from "../../inputFields/mobileNumberField";
import DatePicker from "react-datepicker";
import SelectInput from "../selectInput";
import { fetchMobileRegistrationAgainstCnic } from "./apiCalls";
import ReactTable from "react-table";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Collapse,
} from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
// import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css";
import "assets/css/common/selectpadding.override.css";
import CNICField from "../../inputFields/cnicField";
import CustomTBodyComponent from "components/custom/customtablebody";
import DataTablePagination from "../../../../components/DatatablePagination";
import { transformToObject } from "helpers/Utils";
import { Description } from "@mui/icons-material";

const MobileAppResgistration = (props) => {
  const { match } = props;
  const [collapse, setCollapse] = useState(false);
  const [cnic, setCnic] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchDate,setSearchDate] = useState("");
  const [Items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: "",
    currentPage: 0,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: {
      column: "ID",
      asec: "true",
    },
  });
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const { pageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const orderby = orderBy?.column;

    setCollapse(false);
    setLoading(true);
    setTableLoading(true);
    let payload = {
      reqCnic: cnic,
    };

    fetchMobileRegistrationAgainstCnic(
      payload,
      pageSize,
      currentPage,
      orderby,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSearch = (searching) => {
    const { currentPage, selectedPageSize, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    console.log("currentPage =>> ",currentPage);
    const reqCnic = cnic
    const payload = {
      ...searching,
      reqCnic
    }
    // const Searching = Object.assign(searchCriteria, searching);
    console.log("payload =>> ",payload);
    setTableLoading(true);
    fetchMobileRegistrationAgainstCnic(
      payload,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnPageChange = (selectedPage) => {
    debugger;
    // const selectedPage1 = Number(selectedPage) - 1;

    const { selectedPageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const order = orderBy?.column;
    const newState = {
      pagination: { ...pagination, currentPage: selectedPage },
    };
    setPagination(newState.pagination);
    setTableLoading(true);
    const reqCnic = cnic
    const payload = {
      ...searchCriteria,
      reqCnic
    }
    fetchMobileRegistrationAgainstCnic(
      payload,
      selectedPageSize,
      newState.pagination.currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSort = (orderBy) => {
    // console.log(orderBy);
    const { currentPage,selectedPageSize } = pagination;
    const order = orderBy.column;
    const isAsc = orderBy.asec;
    console.log(order , isAsc);
    console.log("searchCriteria =>> ",searchCriteria);
    setTableLoading(true);
    const reqCnic = cnic
    const payload = {
      ...searchCriteria,
      reqCnic
    }
    console.log("HAndleSort =>> ",payload)
    fetchMobileRegistrationAgainstCnic(
      payload,
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const onFetchSuccess = (data) => {
    const { totalItem, currentPage, pageSize, totalPages, response } = data;

    console.log("ONSUCCESS ", data);
    
    setPagination({
      ...pagination,
      currentPage: currentPage ? currentPage : 0,
      totalPages: totalPages ? totalPages : 0,
    });
    setItems(response);
    setCollapse(true);
    setTableLoading(false);
    setLoading(false);
  };

  const onFetchFailure = () => {
    console.log("ONFAILURE ");
    setPagination({
      ...pagination,
      currentPage: 0,
      totalPages: 1,
    });
    setTableLoading(false);
    setLoading(false);
    setItems([]);
  };

  const handleEvent = (e) => {
    const { value, name } = e.target;
    let Cnic;
    Cnic = value.split("-").join("");
    setCnic(Cnic);
  };

  // const toggle = () => {
  //   setCollapse(!collapse);
  // };

  const columns = [
    {
      Header: "Date/Time",
      id: "stampDate",
      accessor: "stampDate",
      className: "text-center",
      headerClassName: "text-center",
      width: 200,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <div>
            <DatePicker
              selected={searchDate}
              dateFormat="dd-MM-yyyy"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              style={{ height: "20px" }}
              placeholderText={`${moment(new Date()).format("DD-MM-YYYY")}`}
              isClearable
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
      Header: "Cnic",
      id: "reqCnic",
      accessor: "reqCnic",
      className: "text-center",
      headerClassName: "text-center",
      width: 120,
      filterable:false
    },
    {
      Header: "Account Number",
      id: "reqAccountNo",
      accessor: "reqAccountNo",
      className: "text-center",
      headerClassName: "text-center",
      width: 200,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            name="reqAccountNo"
            defaultValue={searchCriteria?.reqAccountNo}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" ||
                event.keyCode === 14 ||
                event.which === 14
              ) {
                onChange(event.target.value); // Trigger the onSearch event
              }
            }}
            onChange={(event) => {
              const { value } = event.target;
              if (value.length <= 0) onChange(value);
            }}
          />
        );
      },
    },
    {
      Header: "Activity",
      id: "activity",
      accessor: "activity",
      className: "text-center",
      headerClassName: "text-center",
      width: 250,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
          defaultValue={searchCriteria?.activity}
          name="activity"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
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
      Header: "Debit Card	",
      id: "reqDebitCard",
      accessor: "reqDebitCard",
      className: "text-center",
      headerClassName: "text-center",
      width: 200,
      
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            defaultValue={searchCriteria?.reqDebitCard}
            name="reqDebitCard"
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
              if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
            }}
          />
        );
      },
    },
    {
      Header: "Mobile Number",
      id: "reqMobileNo",
      accessor: "reqMobileNo",
      className: "text-center",
      headerClassName: "text-center",
      width: 150,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.reqMobileNo}
            name="reqMobileNo"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
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
      Header: "Date of Birth",
      id: "reqDOB",
      className: "text-center",
      headerClassName: "text-center",
      accessor: "reqDOB",
      width: 150,
      // filterable:false,
      Filter: ({ filter, onChange }) => {
        return (
          <div>
            <DatePicker
              selected={searchDate}
              placeholderText={`${moment(new Date()).format("DD-MM-YYYY")}`}
              dateFormat="dd-MM-yyyy"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              style={{ height: "20px" }}
              isClearable
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
      Header: "RRN",
      id: "tranRef",
      className: "text-center",
      headerClassName: "text-center",
      accessor: "tranRef",
      width: 120,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.tranRef}
            name="tranRef"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
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
      Header: "Reponse Description",
      id: "responseDesc",
      className: "text-center",
      headerClassName: "text-center",
      accessor: "responseDesc",
      width: 250,
      filterable: false,
      // Filter: ({ filter, onChange }) => {
      //   return (
      //     <Input
      //       // autoFocus
      //       defaultValue={searchCriteria?.responseDesc}
      //       name="responseDesc"
      //       onKeyPress={(event) => {
      //         if (
      //           event.key === "Enter" ||
      //           event.keyCode === 13 ||
      //           event.which === 13
      //         ) {
      //           onChange(event.target.value);
      //         }
      //       }}
      //       onChange={(event) => {
      //         const { value } = event.target;
      //         // setSearchCriteria({[event.target.name]: event.target.value})
      //         if (value.length <= 0) onChange(event.target.value); // Trigger the onSearch event.
      //       }}
      //     />
      //   );
      // },
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
              <IntlMessages id="collapse.mobile-app-registration" />
            </h1>
            <Breadcrumb match={match} />
          </div>
        </div>
        <Row>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Colxx sm={4}>
                      <FormGroup>
                        <CNICField
                          label="Cnic"
                          name="cnic"
                          handleChange={handleEvent}
                          value={cnic}
                          id="cnic"
                          className="rounded-sm"
                          style={{ borderRadius: "10px" }}
                          required={true}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      color="primary"
                      // style={{ float: "right" }}
                      className={`mt-2 btn-shadow btn-multiple-state 
                          ${isLoading ? "show-spinner" : ""}`}
                      size="lg"
                      disabled={isLoading}
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
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {collapse && (
          <Card className="mt-4">
            <CardBody>
              <Row>
                <Colxx xxs="12" xl="12">
                  <ReactTable
                    data={Items != null ? Items : null}
                    columns={columns}
                    filterable={true}
                    className="-highlight react-table-fixed-height"
                    TbodyComponent={CustomTBodyComponent}
                    noDataText="Data Not Found"
                    pages={pagination?.totalPages}
                    showPagination={true}
                    showPageJump={true}
                    showPageSizeOptions={false}
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    loading={tableLoading}
                    pageSize={Items?.length}
                    // defaultPageSize={selectedPageSize}
                    PaginationComponent={DataTablePagination}
                    manual
                    // getTrProps={getTrProps}
                    onPageChange={(selectedPage) =>
                      handleOnPageChange(selectedPage)
                    }
                    // defaultFilterMethod={(filter, row, column) => {
                    //   return true;
                    // }}

                    onSortedChange={(sortProperties, columns, additive) => {
                      const [item] = sortProperties;
                      console.log("Item ==>", item);
                      const { id, desc } = item;
                      const orderBy = {
                        column: id,
                        asec: !desc,
                      };
                      setTableLoading(false);
                      setPagination({ ...pagination, orderBy: orderBy });
                      handleOnSort(orderBy); // Trigger handle onsort.
                    }}
                    
                    onFilteredChange={(filtered, column, value) => {
                      const searching = transformToObject(filtered);
                      
                      setSearchCriteria(searching);
                      handleOnSearch(searching); // Trigger handle search
                    }}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        )}
      </Colxx>
    </>
  );
};
export default MobileAppResgistration;
