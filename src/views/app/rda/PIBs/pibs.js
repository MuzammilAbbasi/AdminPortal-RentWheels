import React, { Component } from 'react';
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";
import moment from "moment"
import DatePicker from "react-datepicker";

import Breadcrumb from "containers/navs/Breadcrumb";
import Pagination from "containers/dataLists/Pagination";
import IntlMessages from "helpers/IntlMessages";
import CustomModal from "containers/modals/CustomModal"
import { CustomInputElement } from "components/custom/customInput"
import CustomSelect from "components/custom/customSelect"
import CustomTBodyComponent from "components/custom/customtablebody";
import LoadingOverlay from 'components/custom/LoadingOverlay'
import { Colxx } from "components/common/CustomBootstrap";

import { formFields, validationSchema } from "./form/formmeta"
import { transformToObject, amountFotmatter } from "helpers/Utils"
import { fetchPIBs, updatePIBs } from "./apiCalls"

import "react-datepicker/dist/react-datepicker.css";
import "assets/css/common/datepoper.inject.css"
import "assets/css/common/selectpadding.override.css"

let mountInterval = -1;

class PIBs extends Component {
  constructor(props) {
    super(props);

    this.mouseTrap = require("mousetrap");

    this.state = {
      isLoading: true,
      showLoadingOverlay: false,
      tableLoading: true,

      pagination: {
        totalPages: 1,
        currentPage: 1,
        selectedPageSize: 10
      },
      items: [],
      orderBy: {
        column: "stampDate",
        asec: false,
      },
      searchCriteria: {
        account: "",
        tenor: "",
        stampDate: "",
        status: "",
        username: "",
        cnic: "",
        accountTitle: "",
      },
      editModalOpen: false,
      editModalInitValues: {}
    };
  }

  componentDidMount() {
    const { orderBy, searchCriteria } = this.state
    const { currentPage, selectedPageSize } = this.state.pagination

    fetchPIBs(selectedPageSize, currentPage, orderBy, searchCriteria, this.onFetchSuccess, this.onFetchFailure);

    this.setState({
      isLoading: false,
    })
  }

  componentWillUnmount() {
    clearInterval(mountInterval);
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  onFetchSuccess = (data) => {
    console.log('data: ', data)
    const { resp, totalPages, currentPage } = data;
    this.setState({
      items: resp,
      pagination: {
        ...this.state.pagination,
        currentPage: currentPage + 1,
        totalPages,
      },
      tableLoading: false,
      showLoadingOverlay: false,
      isLoading: false
    })
  }

  onFetchFailure = (error) => {
    console.log(error);
    this.setState({
      items: [],
      tableLoading: false,
      isLoading: false,
      showLoadingOverlay: false,
    })
  }

  onUpdateSuccess = (data) => {
    const { orderBy, searchCriteria } = this.state
    const { currentPage, selectedPageSize } = this.state.pagination

    // re-fetch data from server.
    fetchPIBs(selectedPageSize, currentPage, orderBy, searchCriteria, this.onFetchSuccess, this.onFetchFailure);
  }

  onUpdateError = (error) => {
    this.setState({ showLoadingOverlay: false })
  }

  handleOnPageChange = (selectedPage) => {
    selectedPage = Number(selectedPage);
    const { orderBy, searchCriteria, pagination } = this.state
    const { selectedPageSize } = pagination

    this.setState({
      tableLoading: true,
      pagination: { ...pagination, currentPage: selectedPage }
    })

    fetchPIBs(selectedPageSize, selectedPage, orderBy, searchCriteria, this.onFetchSuccess, this.onFetchFailure);
  };

  handleOnSort = (orderBy) => {
    const { searchCriteria, pagination } = this.state
    const { currentPage, selectedPageSize } = pagination

    this.setState({
      tableLoading: true
    })

    fetchPIBs(selectedPageSize, 1, orderBy, searchCriteria, this.onFetchSuccess, this.onFetchFailure);
  };

  handleOnSearch = (searchCriteria) => {
    console.log('search criteria: ', searchCriteria);

    const { orderBy } = this.state
    const { currentPage, selectedPageSize } = this.state.pagination

    this.setState({
      searchCriteria,
      tableLoading: true,
    });

    fetchPIBs(selectedPageSize, 1, orderBy, searchCriteria, this.onFetchSuccess, this.onFetchFailure);
  };

  toggleEditModel = (rowItem) => {
    const { editModalOpen } = this.state
    this.setState({ editModalOpen: !editModalOpen, editModalInitValues: rowItem })
  }

  editHandleSubmit = (updatedItem) => {
    const { editModalOpen } = this.state
    this.setState({ editModalOpen: !editModalOpen, showLoadingOverlay: true }) // re-render
    console.log('updated item: ', updatedItem)

    if (updatedItem) {
      const { status } = updatedItem

      const updatedRepatriation = {
        ...updatedItem,
        status: status.value,
      }
      // api-hit.
      updatePIBs(updatedRepatriation, this.onUpdateSuccess, this.onUpdateError)
    }

  }

  getStatusCell = ({ status }) => {
    const upperStatus = status.toUpperCase()
    switch (upperStatus) {
      case "PENDING": return <span className="badge badge-pill badge-info text-capitalize">{upperStatus}</span>
      case "INPROCESS": return <span className="badge badge-pill badge-warning text-capitalize">{upperStatus}</span>
      case "COMPLETED": return <span className="badge badge-pill badge-success text-capitalize">{upperStatus}</span>
      case "REJECTED": return <span className="badge badge-pill badge-danger text-capitalize">{upperStatus}</span>
      default: return <span className="badge badge-pill badge-primary text-capitalize">{upperStatus}</span>
    }
  }

  getDateCell = ({ stampDate }) => {
    const momentDate = moment(stampDate, "DD-MM-YYYY hh:mm:ss a")
    const formattedDate = momentDate.format('DD-MM-YYYY')
    return <span title={momentDate.fromNow()}>{formattedDate}</span>
  }

  columns = [
    {
      Header: "Actions",
      id: "detail",
      accessor: "detail",
      width: 100,
      Cell: ({ original }) => (
        <Button
          color="primary"
          size="xs"
          onClick={() => this.toggleEditModel(original)}
        ><i className="glyph-icon simple-icon-pencil mr-1"></i> Edit
        </Button>
      ),
      filterable: false,
      sortable: false,
    },
    {
      Header: "Account Title",
      id: "accountTitle",
      accessor: "accountTitle",
      width: 150,
      Filter: CustomInputElement()
    },
    {
      Header: "Account #",
      id: "account",
      accessor: "account",
      width: 150,
      Filter: CustomInputElement()
    },
    {
      Header: "Tenor (Years)",
      id: "tenor",
      accessor: "tenor",
      width: 150,
      filterable: true,
      Filter: CustomInputElement()
    },
    {
      Header: "Face Value",
      id: "faceValue",
      accessor: "faceValue",
      width: 150,
      className: "text-right",
      Cell: ({ original }) => amountFotmatter(original.faceValue),
      filterable: false,
    },
    {
      Header: "Email",
      id: "email",
      accessor: "email",
      width: 150,
      filterable: false,
      Filter: CustomInputElement()
    },
    {
      Header: () => (
        <div>
          Date <span className="text-muted">[dd-MM-yyyy]</span>
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
              style={{ height: '20px' }}
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
      Header: "Status",
      id: "status",
      accessor: "status",
      width: 120,
      Cell: ({ original }) => this.getStatusCell(original),
      Filter: CustomSelect({
        id: 'status',
        name: 'status',
        options: [
          { label: "All", value: "ALL", key: 0 },
          { label: "In Process", value: "INPROCESS", key: 1 },
          { label: "Pending", value: "PENDING", key: 2 },
        ]
      })
    },
    {
      Header: "Mobile No.",
      id: "mobileNo",
      accessor: "mobileNo",
      width: 150,
      filterable: false,
      Filter: CustomInputElement()
    },
    {
      Header: "CNIC",
      id: "cnic",
      accessor: "cnic",
      width: 150,
      Filter: CustomInputElement()
    },
    {
      Header: "Comment",
      id: "comment",
      accessor: "comment",
      width: 150,
      filterable: false,
    },
  ];

  render() {
    const { match } = this.props
    const { isLoading, items, tableLoading, pagination, editModalOpen, editModalInitValues, showLoadingOverlay } = this.state
    const { selectedPageSize, totalPages, currentPage } = pagination
    return isLoading ? <>
      <div className="loading"></div>
    </>
      :
      <>
        {showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} />}

        <Colxx xxs="12">
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <h1>
                <IntlMessages id="menu.pibs" />
              </h1>
              <Breadcrumb match={match} />
              <div className="ml-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPages}
                  onChangePage={(selectedPage) => this.handleOnPageChange(selectedPage)}
                  showPageJump={true}
                  position="between"
                />
              </div>
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
                showPagination={false}
                showPageJump={true}
                showPageSizeOptions={false}
                showPaginationTop={true}
                showPaginationBottom={false}
                loading={tableLoading}
                defaultPageSize={selectedPageSize}
                sortable
                defaultFilterMethod={(filter, row, column) => { return true }}
                onSortedChange={(sortProperties, columns, additive) => {
                  const [item] = sortProperties;
                  const { id, desc } = item;
                  const orderBy = {
                    column: id,
                    asec: !desc,
                  };
                  this.setState({
                    orderBy,
                    tableLoading: true,
                  });

                  this.handleOnSort(orderBy); // Trigger handle onsort.
                }}
                onFilteredChange={(filtered, column, value) => {
                  console.log('hello world....')
                  const searchCriteria = transformToObject(filtered);
                  this.handleOnSearch(searchCriteria); // Trigger handle search
                }}
              />
            </CardBody>
          </Card>

          <CustomModal
            modalOpen={editModalOpen}
            toggleModal={this.toggleEditModel}
            handleSubmit={this.editHandleSubmit}
            formFields={formFields}
            initialValues={editModalInitValues}
            validationSchema={validationSchema}
            formName="edit-pibs"
            modalName="edit-pibs-modal-title"
            position='modal-center'
            generic={true}
          />
        </Colxx>
      </>
  }
}

export default PIBs;