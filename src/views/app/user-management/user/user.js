import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { Input, Card, CardBody, CustomInput, Button } from "reactstrap";
import * as Yup from "yup";

import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import Pagination from "../../../../containers/dataLists/Pagination";
import CustomModal from "../../../../containers/modals/CustomModal";
import ColumnAction from "../../../../containers/dataLists/ColumnAction";

import { Colxx } from "../../../../components/common/CustomBootstrap";
import CustomTBodyComponent from "../../../../components/custom/customtablebody";

import { dropDownValue, transformToObject } from "../../../../helpers/Utils";
import IntlMessages from "../../../../helpers/IntlMessages";

import {
  getAll,
  getInstitutionsList,
  getRolesList,
  addUser,
  editUser,
  batchUpdateUserStatus,
} from "./apiCalls";

import LoadingOverlay from "components/custom/LoadingOverlay";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../assets/css/common/datepoper.inject.css";
import "../../../../assets/css/common/common.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      selectedPageSize: 10,
      showLoadingOverlay: false,

      // Search Criteria
      searchCriteria: {
        userId: "",
        name: "",
        cnic: "",
        mobileNo: "",
        email: "",
        role: "",
        userStatus: "",
      },

      actionOptions: [
        { column: "01", label: "Active" },
        { column: "03", label: "In-Active" },
        { column: "02", label: "Delete" },
      ],
      pageSizes: [10, 20, 30, 50, 100],

      // Default Order by
      orderBy: {
        column: "createdDateTime",
        asec: false,
      },

      addModalOpen: false,
      editModalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      selectedItems: [],
      lastChecked: null,
      tableLoading: true, // Table loading
      isLoading: false,
      editInitialValues: {},
      institutuionList: [],
      roleList: [],
    };

    this.addHandleSubmit = this.addHandleSubmit.bind(this);
    this.editHandleSubmit = this.editHandleSubmit.bind(this);
  }
  componentDidMount() {
    getAll(
      this.state.selectedPageSize,
      this.state.currentPage,
      this.state.orderBy,
      this.state.searchCriteria,
      this.onSuccess,
      this.onFailure
    );
    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      getInstitutionsList(this.setInstitutionsList);
    } else {
      getRolesList(this.setRolesList);
    }
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: [],
      });
      return false;
    });
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  setInstitutionsList = (data) => {
    this.setState({
      institutuionList: data,
    });
  };

  setRolesList = (data) => {
    this.setState({
      roleList: data,
    });
  };

  onSuccess = (data) => {
    this.setState({
      totalPage: data.totalPages,
      items: data.resp,
      currentPage: data.currentPage + 1, // because, backend starts page count from zero
      totalItemCount: data.totalItem,
      isLoading: false,
      tableLoading: false,
    });
  };

  onFailure = () => {
    this.setState({
      items: [],
      isLoading: false,
      tableLoading: false,
    });
  };

  onAddEditSuccess = (data) => {
    // this.setState({showLoadingOverlay: false});
  };

  onAddEditFailure = (error) => {
    this.setState({ showLoadingOverlay: false });
  };

  toggleAddModal = () => {
    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      this.setState({
        roleList: [],
      });
    }
    this.setState({
      addModalOpen: !this.state.addModalOpen,
    });
  };

  toggleEditModal = (userId) => {
    const initial = this.state.items.filter((x) => x.userId === userId)[0];
    console.log(initial);
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      editInitialValues: initial,
    });

    if (
      !this.state.editModalOpen &&
      JSON.parse(sessionStorage.getItem("user")).institution.value === "00"
    ) {
      getRolesList(this.setRolesList, initial.institution);
    }
  };

  handleOnSearch = (searchCriteria) => {
    getAll(
      this.state.selectedPageSize,
      this.state.currentPage,
      this.state.orderBy,
      searchCriteria,
      this.onSuccess,
      this.onFailure
    );
  };

  handleOnSort = (orderBy) => {
    getAll(
      this.state.selectedPageSize,
      this.state.currentPage,
      orderBy,
      this.state.searchCriteria,
      this.onSuccess,
      this.onFailure
    );
  };

  onPageChange = (currentPage) => {
    getAll(
      this.state.selectedPageSize,
      currentPage,
      this.state.orderBy,
      this.state.searchCriteria,
      this.onSuccess,
      this.onFailure
    );
  };

  // Toggling Model related Logic [START]

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const { userId } = rowInfo.original;
      return {
        onDoubleClick: () => this.toggleEditModal(userId),
      };
    }
    return {};
  };

  changeAction = (column) => {
    console.log("selectedItems: ", this.state.selectedItems);

    if (this.state.selectedItems.length > 0) {
      const payload = {
        userStatus: column,
        users: this.state.selectedItems,
        institution: JSON.parse(sessionStorage.getItem("user")).institution
          .value,
      };

      batchUpdateUserStatus(payload);
    }
  };

  onCheckItem = (event, userId) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: userId,
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(userId)) {
      selectedItems = selectedItems.filter((x) => x !== userId);
    } else {
      selectedItems.push(userId);
    }
    this.setState({
      selectedItems,
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(userId, items, "userId");
      var end = this.getIndex(this.state.lastChecked, items, "userId");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map((item) => {
          return item.userId;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems,
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  handleChangeSelectAll = (isToggle) => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: [],
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map((x) => x.userId),
      });
    }
    document.activeElement.blur();
    return false;
  };

  addHandleSubmit = (values, { setSubmitting }) => {
    // this.setState( { showLoadingOverlay: true } )
    // const { institution, userId } = JSON.parse(
    //   sessionStorage.getItem("user")
    // );
    console.log("In add handle submit method !!");
    console.log(values);
    this.setState({ showLoadingOverlay: true });
    const { institution, userId } = JSON.parse(sessionStorage.getItem("user"));
    const payload = {
      ...values,
      userStatus: values.userStatus.value,
      role: values.role.value,
      createdBy: userId,
      lastModifiedBy: null,
    };
    if (institution.value === "00") {
      payload.institution = values.institution.value;
    } else {
      payload.institution = institution.value;
    }
    addUser(payload, this.onAddEditSuccess, this.onAddEditFailure);
  };

  editHandleSubmit = (values, { setSubmitting }) => {
    // this.setState( { showLoadingOverlay: true } )
    console.log("Inside the editHandleSubmit of user");
    console.log(values);
    this.setState({ showLoadingOverlay: true });
    const payload = {
      ...values,
      userStatus: values.userStatus.value,
      role: values.role.value,
    };
    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      payload.institution = values.institution.value;
    } else {
      payload.institution = JSON.parse(
        sessionStorage.getItem("user")
      ).institution.value;
    }
    console.log(payload);
    editUser(payload, this.onAddEditSuccess, this.onAddEditFailure);
  };

  onAddEditSuccess = (data) => {
    this.setState({ showLoadingOverlay: false });
  };

  onAddEditFailure = (error) => {
    this.setState({ showLoadingOverlay: false });
  };

  onInstitutionChange = (name, value) => {
    console.log("onInstitutionChange name: ", name);
    console.log("onInstitutionChange value: ", value);
    getRolesList(this.setRolesList, value);
  };

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId],
      });
    }

    return true;
  };

  customInput = ({ value }) => {
    return (
      <CustomInput
        className="item-checkbox mb-0 d-inline-block"
        type="checkbox"
        id={`check_${value}`}
        checked={this.state.selectedItems.includes(value)}
        onChange={(event) => {
          this.onCheckItem(event, value);
        }}
        label=""
      />
    );
  };
  columns = [
    {
      Header: "User Id",
      id: "userId",
      accessor: "userId",
      Filter: ({ filter, onChange }) => {
        return (
          <Input
            autoFocus
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
      Header: "Name",
      id: "name",
      accessor: "name",
      Filter: ({ filter, onChange }) => {
        return (
          <Input
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
      Header: "CNIC",
      id: "cnic",
      accessor: "cnic",
      Filter: ({ filter, onChange }) => {
        return (
          <Input
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
      Header: "Mobile No",
      id: "mobileNo",
      accessor: "mobileNo",
      Filter: ({ filter, onChange }) => {
        return (
          <Input
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
      Header: "Email",
      id: "email",
      accessor: "email",
      Filter: ({ filter, onChange }) => {
        return (
          <Input
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
      Header: () => "Role",
      id: "role",
      accessor: "role.label",
      Filter: ({ filter, onChange }) => {
        return (
          <select
            onChange={(event) => {
              let selectedOptions = [].slice
                .call(event.target.selectedOptions)
                .map((o) => {
                  return o.value;
                });
              event.target.value = selectedOptions; // change the targated options value
              onChange(event.target.value);
            }}
          >
            <option value="">Show All</option>
            {this.state.roleList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      Header: () => "Status",
      id: "userStatus",
      accessor: "userStatus.label",
      Cell: dropDownValue,
      Filter: ({ filter, onChange }) => {
        return (
          <select
            onChange={(event) => {
              let selectedOptions = [].slice
                .call(event.target.selectedOptions)
                .map((o) => {
                  return o.value;
                });
              event.target.value = selectedOptions; // change the targated options value
              onChange(event.target.value);
            }}
          >
            <option value="">Show All</option>
            <option value="01">Active</option>
            <option value="03">In-Active</option>
          </select>
        );
      },
    },
    {
      Header: () => (
        <div>
          Date <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "createdDateTime",
      accessor: "createdDateTime",
      filterable: false,
      // Filter: ({ filter, onChange }) => {
      //   return (
      //     <div>
      //       <DatePicker
      //         selected={this.state.createdDateTime}
      //         dateFormat="dd-MM-yyy"
      //         onChange={(date) => {
      //           this.setState({ createdDateTime: date });
      //           const isValid = moment(date, ["DD-MM-YYYY"]).isValid();
      //           let formatedDate = "";
      //           if (isValid) formatedDate = moment(date).format("DD-MM-YYYY");
      //           onChange(formatedDate);
      //         }}
      //       />
      //     </div>
      //   );
      // },
    },
    // {
    //   Header: () => (
    //     <ColumnAction
    //       handleChangeSelectAll={this.handleChangeSelectAll}
    //       changeAction={this.changeAction}
    //       selectedItemsLength={this.state.selectedItems ? this.state.selectedItems.length : 0}
    //       itemsLength={this.state.items ? this.state.items.length : 0}
    //       actionOptions={this.state.actionOptions}
    //     />
    //   ),
    //   id: "userId",
    //   accessor: "userId",
    //   filterable: false,
    //   sortable: false,
    //   style: {overflow: "visible"},
    //   Cell: this.customInput,
    // },
  ];

  render() {
    const {
      items,
      currentPage,
      totalPage,
      tableLoading,
      isLoading,
      showLoadingOverlay,
      addModalOpen,
      editModalOpen,
      selectedPageSize,
    } = this.state;

    const { match } = this.props;

    const formFields = [
      {
        label: "label.userId",
        name: "userId",
        type: "textbox",
        maxLength: "50",
        disabled: this.state.editModalOpen,
        colxx: "6",
      },
      // {
      //   label: "label.empId",
      //   name: "empId",
      //   type: "textbox",
      //   maxLength: "22",
      //   disabled: false,
      //   colxx: "6",
      // },
      {
        label: "label.name",
        name: "name",
        type: "textbox",
        maxLength: "50",
        disabled: false,
        colxx: "6",
      },
      // {
      //   label: "label.surname",
      //   sublabel: "label.optional",
      //   name: "surname",
      //   type: "textbox",
      //   maxLength: "255",
      //   disabled: false,
      //   colxx: "6",
      // },
      // {
      //   label: "label.fatherName",
      //   sublabel: "label.optional",
      //   name: "fatherName",
      //   type: "textbox",
      //   maxLength: "255",
      //   disabled: false,
      //   colxx: "6",
      // },
      // {
      //   label: "label.dob",
      //   sublabel: "label.optional",
      //   name: "dob",
      //   type: "date",
      //   format: 'dd-MM-yyyy',
      //   disabled: false,
      //   colxx: "6",
      // },
      {
        label: "label.cnic",
        name: "cnic",
        type: "textbox",
        maxLength: "13",
        disabled: false,
        colxx: "6",
      },
      // {
      //   label: "label.gender",
      //   name: "gender",
      //   id: "gender",
      //   type: "select",
      //   options: [
      //     { value: "01", label: "Male" },
      //     { value: "02", label: "Female" },
      //     { value: "02", label: "Other" },
      //   ],
      //   disabled: false,
      //   colxx: "6",
      // },
      // {
      //   label: "label.phone",
      //   name: "phone",
      //   type: "textbox",
      //   maxLength: "10",
      //   disabled: false,
      //   colxx: "6",
      // },
      {
        label: "label.mobileNo",
        name: "mobileNo",
        type: "textbox",
        maxLength: "11",
        disabled: false,
        colxx: "6",
      },
      {
        label: "label.email",
        name: "email",
        type: "textbox",
        maxLength: "50",
        disabled: false,
        colxx: "6",
      },
      // {
      //     label: "label.zipcode",
      //   sublabel: "label.optional",
      //   name: "zipcode",
      //   type: "textbox",
      //   maxLength: "8",
      //    colxx: "6",
      // },
      {
        label: "label.empNumber",
        name: "empNumber",
        type: "textbox",
        maxLength: "100",
        disabled: false,
        colxx: "6",
      },
      {
        // label: "label.address",
        // sublabel: "label.optional",
        // name: "address",
        // type: "textbox",
        // maxLength: "255",
        // colxx: "6",
        label: "label.department",
        name: "department",
        type: "textbox",
        maxLength: "100",
        disabled: false,
        colxx: "6",
      },
      // {
      //   label: "label.role",
      //   name: "role",
      //   id: "role",
      //   type: "select",
      //   options: this.state.roleList,
      //    colxx: "6",
      // },
      {
        label: "label.designation",
        name: "designation",
        type: "textbox",
        maxLength: "100",
        disabled: false,
        colxx: "6",
      },
      {
        label: "label.status",
        name: "userStatus",
        id: "userStatus",
        type: "select",
        options: [
          { value: "01", label: "Active" },
          { value: "03", label: "In-Active" },
          { value: "04", label: "Locked" },
        ],
        disabled: false,
        colxx: "6",
      },
      {
        label: "label.remarks",
        name: "remarks",
        type: "textbox",
        maxLength: "100",
        disabled: false,
        colxx: "6",
      },
    ];

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      formFields.push({
        label: "label.institution",
        name: "institution",
        id: "institution",
        type: "select",
        options: this.state.institutuionList,
        disabled: false,
        onChange: this.onInstitutionChange,
        colxx: "6",
      });
    }

    formFields.push({
      label: "label.role",
      name: "role",
      id: "role",
      type: "select",
      options: this.state.roleList,
      colxx: "6",
    });

    const addInitialValues = {
      userId: "",
      // employeeId: "",
      name: "",
      cnic: "",
      mobileNo: "",
      email: "",
      userStatus: undefined,
      role: undefined,
      institution: undefined,
      // dob: new Date('1990-01-01'),
      empNumber: undefined,
      department: undefined,
      designation: undefined,
      remarks: undefined,
    };

    const shape = {
      userId: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z0-9]+$/, "Invalid User Id")
        .required("User Id is required!"),
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z\\-\s]+$/, "Invalid Name")
        .required("Name is required!"),
      cnic: Yup.string()
        .matches(/^[0-9]+$/, "Invalid CNIC")
        .min(13, "Too Short!")
        .required("CNIC is required!"),
      mobileNo: Yup.string()
        .min(11, "Too Short!")
        .matches(/^03[0-9]+$/, "Invalid Mobile No")
        .required("Mobile No is required!"),
      email: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .email("Invalid Email")
        .required("Email is required!"),
      empNumber: Yup.string()
        .min(3, "Too Short!")
        .max(100, "Too Long!")
        .matches(/^[A-Za-z0-9]+$/, "Invalid Employee No")
        .required("Emp Number is required"),
      department: Yup.string()
        .min(5, "Too Short!")
        .max(100, "Too Long!")
        .matches(/^[A-Za-z0-9\s]+$/, "Invalid Department")
        .required("Department is required"),
      designation: Yup.string()
        .min(5, "Too Short!")
        .max(100, "Too Long!")
        .matches(/^[A-Za-z0-9\s]+$/, "Invalid Designation")
        .required("Designation is required"),
      remarks: Yup.string()
        .min(1, "Too Short!")
        .max(100, "Too Long!")
        .matches(/^[A-Za-z0-9\s]+$/, "Invalid Remarks")
        .required("Remarks are required"),
      userStatus: Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Status is required!"),
      role: Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Role is required!"),
    };

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      shape.institution = Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Institution is required!");
    }
    const validationSchema = Yup.object().shape(shape);

    const header = (
      <div className="mb-3">
        <div className="d-flex">
          <h1>
            <IntlMessages id="menu.user" />
          </h1>

          <Breadcrumb match={match} />

          <div className="m-auto">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={(p) => this.onPageChange(p)}
              showPageJump={true}
              position="between"
            />
          </div>
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={this.toggleAddModal}
            >
              <IntlMessages id="add-button" />
            </Button>
          </div>
        </div>
      </div>
    );

    const content = (
      <Fragment>
        {showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} />}

        {/* Render Common Header */}
        {header}

        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody className="p-2">
              <ReactTable
                data={items}
                columns={this.columns}
                filterable={true}
                // className="-highlight react-table-fixed-height"
                // style={{ cursor: "pointer" }}
                getTrProps={this.getTrProps}
                TbodyComponent={CustomTBodyComponent}
                showPagination={false}
                showPageJump={true}
                showPageSizeOptions={false}
                showPaginationTop={true}
                showPaginationBottom={false}
                loading={tableLoading}
                defaultPageSize={selectedPageSize}
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
                  this.setState({
                    orderBy,
                    tableLoading: true,
                  });

                  this.handleOnSort(orderBy); // Trigger handle onsort.
                }}
                onFilteredChange={(filtered, column, value) => {
                  const searchCriteria = transformToObject(filtered);
                  this.setState({
                    searchCriteria,
                    tableLoading: true,
                  });

                  this.handleOnSearch(searchCriteria); // Trigger handle search
                }}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Fragment>
    );

    return isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div>
          <CustomModal
            modalOpen={addModalOpen}
            toggleModal={this.toggleAddModal}
            handleSubmit={this.addHandleSubmit}
            formFields={formFields}
            initialValues={addInitialValues}
            validationSchema={validationSchema}
            formName="add-user"
            modalName="add-user-modal-title"
            cancelButton="cancel-button"
          />
          <CustomModal
            modalOpen={editModalOpen}
            toggleModal={this.toggleEditModal}
            handleSubmit={this.editHandleSubmit}
            formFields={formFields}
            initialValues={this.state.editInitialValues}
            validationSchema={validationSchema}
            formName="edit-user"
            modalName="edit-user-modal-title"
            cancelButton="cancel-button"
          />
          {/* Render the content */}
          {content}
        </div>
      </Fragment>
    );
  }
}
export default User;
