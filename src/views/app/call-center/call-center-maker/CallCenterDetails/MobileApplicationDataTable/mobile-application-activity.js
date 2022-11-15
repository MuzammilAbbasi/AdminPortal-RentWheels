import React, { useState, useEffect } from "react";

import { Row, CardBody ,Input} from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import { transformToObject } from "helpers/Utils";
import { CustomInputElement } from "components/custom/customInput";
import ReactTable from "react-table";
import CustomTBodyComponent from "components/custom/customtablebody";
import { Colxx } from "components/common/CustomBootstrap";
import { fetchIps } from "../../apiCalls";
import DataTablePagination from "components/DatatablePagination";
import SelectInput from "../../../../inputFields/selectInput";
import InputField from "../../../../inputFields/InputField";
const MobileApplicationActivity = (props) => {
  console.log("PROPS =>> ",props)
  const [Items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 10,
    currentPage: 0,
    TotalSize: 0,
    selectedPageSize: 10,
    orderBy: { column: "stampDate", asec: "true" },
  });
  const [date,setDate] = useState([]);
  const { totalPages, currentPage, TotalSize, selectedPageSize, orderBy } =
    pagination;
  const [tableLoading, setTableLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    username: "",
    cnic:"",
    status: "",
    fromAccount: "",
    stan: "",
    mobileNumber: "",
    toBank: "",
    rrn: "",
    companyName: "",
    amount:""
  });

  useEffect(() => {
    const isAsc = orderBy?.asec;

    const orderBy = orderBy?.column;
    const {rangeDate,cnic} = props.editInitValues;
    setTableLoading(true);
    setDate(props.editInitValues.rangeDate)
    const [startingDate, endingDate] = rangeDate;

    const Cnic = {
      cnic:cnic.split('-').join('')
    }
  
    const filterCriteria = { ...searchCriteria, ...Cnic }
    console.log("filterCriteria =>> ",filterCriteria)
    setSearchCriteria(filterCriteria)
    
    fetchIps(
      selectedPageSize,
      currentPage,
      orderBy,
      isAsc,
      filterCriteria,
      // newState.searchCriteria,
      startingDate,
      endingDate,
      onFetchSuccess,
      onFetchFailure
    );
  }, [props.editInitValues]);

  let onFetchFailure = () => {
    setItems([]);
    setPagination({
      ...pagination,
      currentPage: 0,
      totalPages: 1,
    });
    setTableLoading(false);
  };
  let onFetchSuccess = (data) => {
    const { response, totalPages, currentPage } = data;
    setItems(response);
    setTableLoading(false);
    setPagination({
      ...pagination,
      currentPage: currentPage ? currentPage : 0,
      totalPages: totalPages ? totalPages : 0,
    });
  };

  const handleOnPageChange = (selectedPage) => {
    const selectedPage1 = Number(selectedPage);
    const [startingDate, endingDate] = date;

    const order = orderBy;
    const { selectedPageSize, currentPage, orderBy } = pagination;
    const isAsc = orderBy?.asec;
    const newState = {
      tableLoading: true,
      pagination: { ...pagination, currentPage: selectedPage1 },
    };
    setTableLoading(newState.tableLoading);
    setPagination(newState.pagination);

    fetchIps(
      selectedPageSize,
      newState.pagination.currentPage,
      order,
      isAsc,
      searchCriteria,
      startingDate,
      endingDate,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSearch = (search) => {
    const { currentPage, selectedPageSize, orderBy } = pagination;
    // const { rangeDate } = props.editInitValues;

    const order = orderBy.column;
    const isAsc = orderBy.asec;

    const [startingDate, endingDate] = date;

    const Cnic={
      cnic:searchCriteria.cnic
    }

    const filterCriteria = { ...Cnic, ...search };

    setSearchCriteria(filterCriteria)
    setTableLoading(true);

    fetchIps(
      selectedPageSize,
      currentPage,
      order,
      isAsc,
      filterCriteria,
      startingDate,
      endingDate,
      onFetchSuccess,
      onFetchFailure
    );
  };

  const handleOnSort = (orderBy) => {
    const { currentPage, selectedPageSize } = pagination;
    const [startingDate, endingDate] = date;
    console.log("orderBy =>> ", orderBy);
    console.log("date =>> ", date);
    const order = orderBy.column;
    const isAsc = orderBy.asec;
    setTableLoading(true);
    
    debugger;
      fetchIps(
        selectedPageSize,
        currentPage,
        order,
        isAsc,
        searchCriteria,
        startingDate,
        endingDate,
        onFetchSuccess,
        onFetchFailure
      );
    // }
    // else{
    //   setTableLoading(false);
    // }
  };

  const columns = [
    {
      Header: () => (
        <div>
          Date/Time <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "stampDate",
      accessor: "stampDate",
      width: 150,
      filterable: false,
      // Cell: ({ original }) => this.getDateCell(original),
    },

    {
      Header: "username",
      id: "username",
      accessor: "username",
      width: 150,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.username}
            name="username"
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
      Header: "MobileNumber",
      id: "mobileNumber",
      accessor: "mobileNumber",
      width: 150,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.mobileNumber}
            name="mobileNumber"
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
      Header: "Amount(PKR)",
      id: "amount",
      accessor: "amount",
      width: 150,
      filterable: false,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.amount}
            name="amount"
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
      Header: "Company Name",
      id: "companyName",
      accessor: "companyName",
      width: 120,
      // filterable: false,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.companyName}
            name="companyName"
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
      Header: "BankName",
      id: "toBank",
      accessor: "toBank",
      width: 150,
      // filterable: false,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.toBank}
            name="toBank"
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
      Header: "STAN",
      id: "stan",
      accessor: "stan",
      width: 150,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.stan}
            name="stan"
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
      Header: "Auth ID",
      id: "authId",
      accessor: "authId",
      width: 150,
      filterable: false,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.authId}
            name="authId"
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
      // filterable: CustomInputElement(),
    },
    {
      Header: "Status",
      id: "status",
      accessor: "status",
      width: 150,
      Filter: ({ filter, onChange }) => {
        const tranStatus = [
          {name:"",value:""},
          { name: "Success", value: "Success" },
          { name: "Pending", value: "Pending" },
          { name: "Fail", value: "Fail" },
          // { name: "makerApproved", value: "makerApproved" },
          // { name: "makerReject", value: "makerReject" },
        ];
        return (
          <>  
            <SelectInput
            options={tranStatus}
            value={searchCriteria?.status || null}
            name="status"
            placeholder = "Select"
            handleChange={(event) => {
              let selectedOptions = [].slice
                .call(event.target.selectedOptions)
                .map((o) => {
                  return o.value;
                });
              setSearchCriteria({ [event.target.name]: event.target.value || null } );
              onChange(event.target.value);
            }}
            style={{
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
          />
           
          </>
          
        );
      },
    },
    {
      Header: "Account Number",
      id: "fromAccount",
      accessor: "fromAccount",
      width: 150,
      Filter: ({ filter, onChange, defaultValue }) => {
        return (
          <Input
            defaultValue={searchCriteria?.fromAccount}
            name="fromAccount"
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
      Header: "To Account/Consumer NO",
      id: "toAccount",
      accessor: "toAccount",
      width: 200,
      filterable: false,
      Filter: CustomInputElement(),
    },
    {
      Header: "Activity",
      id: "activity",
      accessor: "activity",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },

    {
      Header: "Txn Ref no",
      id: "rrn",
      accessor: "rrn",
      width: 150,
      // filterable: false,
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            // autoFocus
            defaultValue={searchCriteria?.rrn}
            name="rrn"
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
      Header: "Channel",
      id: "channel",
      accessor: "channel",
      width: 150,
      filterable: false,
      Filter: CustomInputElement(),
    },
  ];

  return (
    <Row>
      <Colxx xxs="12" sm="12">
        <CardBody>
          <ReactTable
            data={Items}
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
            PaginationComponent={DataTablePagination}
            manual
            onPageChange={(selectedPage) =>
              handleOnPageChange(selectedPage + 1)
            }
            defaultFilterMethod={(filter, row, column) => {
              return true;
            }}
            onSortedChange={(sortProperties, columns, additive) => {
              const [item] = sortProperties;

              const { id, desc } = item;
              const orderBy = {
                column: id,
                asec: !desc,
              };
              
              setTableLoading(id ? true : false);
              if (orderBy.column != 'mobileNo' && orderBy.column != 'username') {
                handleOnSort(orderBy); // Trigger handle onsort.
                setPagination({ ...pagination, orderBy: orderBy });
              } else {
                setTableLoading(false);
              }
            }}
            onFilteredChange={(filtered, column, value) => {
              const searching = transformToObject(filtered);
              console.log("SEarching", searching);
              
              handleOnSearch(searching); // Trigger handle search
            }}
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default MobileApplicationActivity;
