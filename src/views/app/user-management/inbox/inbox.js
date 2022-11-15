import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { Input, Card, CardBody } from "reactstrap";
import * as Yup from "yup";

import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import Pagination from "../../../../containers/dataLists/Pagination";
import CustomModal from "../../../../containers/modals/CustomModal";

import { Colxx } from "../../../../components/common/CustomBootstrap";
import CustomTBodyComponent from "../../../../components/custom/customtablebody";

import { TypeCell, transformToObject } from "../../../../helpers/Utils";
import IntlMessages from "../../../../helpers/IntlMessages";

import {
  getAll,
  getInstitutionsList,
  getPermissions,
  getRolesList,
  addUser,
  editUser,
  addRole,
  editRole,
} from "./apiCalls";

import LoadingOverlay from 'components/custom/LoadingOverlay'

import "react-datepicker/dist/react-datepicker.css";
import "../../../../assets/css/common/datepoper.inject.css";
import "../../../../assets/css/common/common.css";

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.mouseTrap = require("mousetrap");

        this.state = {
            selectedPageSize: 10,

            // Search Criteria
            searchCriteria:
            {
                processId: "",
                idOrCode: "",
                createdBy: "",
                opeartion: "",
                // reason: "",
                // nameOrDescr:""
            },

            pageSizes: [10, 20, 30, 50, 100],

            // Default Order by
            orderBy: {
                column: "createdDateTime",
                asec: false,
            },

            editUserModalOpen: false,
            editRoleModalOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            tableLoading: true, // Table loading
            isLoading: false,
            showLoadingOverlay: false,
            editUserInitialValues: {},
            editRoleInitialValues: {},
            institutuionList: [],
            roleList: [],
            permissions: [],
            checked: [],
            expanded: []
        };

    this.editUserHandleSubmit = this.editUserHandleSubmit.bind(this);
    this.editRoleHandleSubmit = this.editRoleHandleSubmit.bind(this);
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
      getPermissions(this.setPermissions);
    }
  }
  componentDidUpdate() {
    if (
      this.state.editRoleInitialValues !== undefined &&
      this.state.editRoleInitialValues !== null
    ) {
      if (
        this.state.editRoleInitialValues.permissions !== undefined &&
        this.state.editRoleInitialValues.permissions !== null
      ) {
        if (this.state.checked.length === 0) {
          this.state.editRoleInitialValues.permissions.forEach((o) => {
            this.state.checked.push(o.id.toString());
            this.state.expanded.push(o.id.toString());
          });
        }
      }
    }
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

  setPermissions = (data) => {
    this.setState({
      permissions: data,
    });
  };

  getNodes = (perm) => {
    const childItems = this.getChildItem(perm);
    if (childItems.length > 0) {
      const multiple = [];
      childItems.forEach((child) => {
        multiple.push(this.getNodes(child));
      });
      return this.getMultipleItem(multiple, perm);
    }

    return this.getSingleItem(perm);
  };

  getSingleItem = (item) => {
    return {
      value: item.id.toString(),
      label: item.label,
      icon: item.type === "button" ? <i className="iconsminds-on-off" /> : null,
    };
    // { value: item.id.toString(), label: item.label, icon: <i className={item.icon} /> }
  };

  getMultipleItem = (childItems, item) => {
    return {
      value: item.id.toString(),
      label: item.label,
      children: childItems,
    };
  };

  getChildItem = (o) => {
    const childItems = [];
    this.state.permissions.forEach((p) => {
      if (o.id === p.parentId) {
        childItems.push(p);
      }
    });
    return childItems;
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

  toggleUserEditModal = (productCode) => {
    const initial = this.state.items.filter(
      (x) => x.idOrCode === productCode
    )[0];
    this.setState({
      editUserModalOpen: !this.state.editUserModalOpen,
      editUserInitialValues: {
        ...initial,
        isaccepted: false,
      },
    });

    if (
      !this.state.editUserModalOpen &&
      JSON.parse(sessionStorage.getItem("user")).institution.value === "00"
    ) {
      getRolesList(this.setRolesList, initial.institution);
    }
  };

  toggleRoleEditModal = (productCode) => {
    const initial = this.state.items.filter(
      (x) => x.idOrCode === productCode
    )[0];
    this.setState({
      editRoleModalOpen: !this.state.editRoleModalOpen,
      editRoleInitialValues: {
        ...initial,
        isaccepted: false,
      },
      checked: [],
      expanded: [],
    });

    if (
      !this.state.editRoleModalOpen &&
      JSON.parse(sessionStorage.getItem("user")).institution.value === "00"
    ) {
      getPermissions(this.setPermissions, initial.institution);
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

  //   Toggling Model related Logic [START]

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const { idOrCode, operation } = rowInfo.original;
      if (operation === "User Creation" || operation === "User Updation") {
        return {
          onDoubleClick: () => this.toggleUserEditModal(idOrCode),
        };
      } else if (
        operation === "Role Creation" ||
        operation === "Role Updation"
      ) {
        return {
          onDoubleClick: () => this.toggleRoleEditModal(idOrCode),
        };
      }
    }
    return {};
  };

  editUserHandleSubmit = (values) => {
    console.log(values);
    console.log(values.operation);
    // values.operation = "User Updation";
    // console.log(values);
    this.setState({ showLoadingOverlay: true });
    if (values.operation === "User Creation") {
      addUser(values, this.onAddEditSuccess, this.onAddEditFailure);
    } else if (values.operation === "User Updation") {
      editUser(values, this.onAddEditSuccess, this.onAddEditFailure);
    }
  };

  editRoleHandleSubmit = (values) => {
    this.setState({ showLoadingOverlay: true });
    if (values.operation === "Role Creation") {
      addRole(values, this.onAddEditSuccess, this.onAddEditFailure);
    } else if (values.operation === "Role Updation") {
      editRole(values, this.onAddEditSuccess, this.onAddEditFailure);
    }
  };

  onInstitutionChange = (name, value) => {
    console.log("onInstitutionChange name: ", name);
    console.log("onInstitutionChange value: ", value);
    getRolesList(this.setRolesList, value);
  };

  columns = [
    {
      Header: "Process Id",
      id: "processId",
      accessor: "processId",
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
      Header: "Id / Code",
      id: "idOrCode",
      accessor: "idOrCode",
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
      Header: "Name / Desc",
      id: "nameOrDescr",
      accessor: "nameOrDescr",
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
      Header: "Created by",
      id: "createdBy",
      accessor: "createdBy",
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
      Header: "Operation",
      id: "operation",
      accessor: "operation",
      Cell: TypeCell,
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
      Header: "Comments",
      id: "reason",
      accessor: "reason",
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
      Header: () => (
        <div>
          Req Date <span className="text-muted">[dd-MM-yyyy]</span>
        </div>
      ),
      id: "reqInitDateTime",
      accessor: "reqInitDateTime",
      filterable: false,
    },
  ];

  isDisable =
    JSON.parse(sessionStorage.getItem("user")).permissions.filter(
      (x) => x.name === "makerApprove"
    ).length === 0;

  render() {
    const {
      items,
      currentPage,
      totalPage,
      tableLoading,
      isLoading,
      editUserModalOpen,
      editRoleModalOpen,
      selectedPageSize,
      showLoadingOverlay,
    } = this.state;

    const { match } = this.props;

    const userFormFields = [
      {
        label: "label.userId",
        name: "idOrCode",
        type: "textbox",
        maxLength: "50",
        disabled: true,
        colxx: "6",
      },
      {
        label: "label.name",
        name: "nameOrDescr",
        type: "textbox",
        maxLength: "50",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.cnic",
        name: "cnic",
        type: "textbox",
        maxLength: "13",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.mobileNo",
        name: "mobileNo",
        type: "textbox",
        maxLength: "11",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.email",
        name: "email",
        type: "textbox",
        maxLength: "50",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.empNumber",
        name: "empNumber",
        type: "textbox",
        maxLength: "100",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.department",
        name: "department",
        type: "textbox",
        maxLength: "100",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.designation",
        name: "designation",
        type: "textbox",
        maxLength: "100",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.remarks",
        name: "remarks",
        type: "textbox",
        maxLength: "100",
        disabled: this.isDisable,
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
        disabled: this.isDisable,
        colxx: "6",
      },
    ];

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      userFormFields.push({
        label: "label.institution",
        name: "institution",
        id: "institution",
        type: "select",
        options: this.state.institutuionList,
        disabled: this.isDisable,
        onChange: this.onInstitutionChange,
        colxx: "6",
      });
    }

    userFormFields.push({
      label: "label.role",
      name: "role",
      id: "role",
      type: "select",
      options: this.state.roleList,
      disabled: this.isDisable,
      colxx: "6",
    });

    userFormFields.push({
      label: "label.reason",
      name: "reason",
      type: "textbox",
      maxLength: "100",
      disabled: false,
      colxx: "6",
    });

    const userShape = {
      idOrCode: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z0-9]+$/, "Invalid User Id")
        .required("User Id is required!"),
      nameOrDescr: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z\\-\s]+$/, "Invalid Name")
        .required("Name is required!"),
      cnic: Yup.string()
        .min(13, "Too Short!")
        .matches(/^[0-9]+$/, "Invalid CNIC")
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
      reason: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z0-9 ]+$/, "Invalid Comments")
        .required("Comments are required!"),
    };

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      userShape.institution = Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Institution is required!");
    }
    const userValidationSchema = Yup.object().shape(userShape);

    const nodes = [];
    this.state.permissions.forEach((o) => {
      if (o.parentId === -1) {
        nodes.push(this.getNodes(o));
      }
    });

    const roleFormFields = [
      {
        label: "label.code",
        name: "idOrCode",
        type: "textbox",
        maxLength: "3",
        disabled: true,
        colxx: "6",
      },
      {
        label: "label.desc",
        name: "nameOrDescr",
        type: "textbox",
        maxLength: "50",
        disabled: this.isDisable,
        colxx: "6",
      },
      {
        label: "label.status",
        name: "roleStatus",
        id: "roleStatus",
        type: "select",
        options: [
          { value: "01", label: "Active" },
          { value: "03", label: "In-Active" },
        ],
        disabled: this.isDisable,
        colxx: "6",
      },
    ];

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      roleFormFields.push({
        label: "label.institution",
        name: "institution",
        id: "institution",
        type: "select",
        options: this.state.institutuionList,
        disabled: this.isDisable,
        onChange: this.onInstitutionChange,
        colxx: "6",
      });
    }

    roleFormFields.push({
      label: "label.reason",
      name: "reason",
      type: "textbox",
      maxLength: "100",
      disabled: false,
      colxx: "6",
    });

    roleFormFields.push({
      label: "label.permission",
      name: "permissions",
      id: "permissions",
      type: "nodes",
      options: nodes,
      checked: this.state.checked,
      expanded: this.state.expanded,
      onCheck: (checked, targetNode) => {
        this.setState({ checked });
      },
      onExpand: (expanded, targetNode) => this.setState({ expanded }),
    });

    const roleShape = {
      idOrCode: Yup.string()
        .min(2, "Too Short!")
        .max(3, "Too Long!")
        .matches(/^[0-9]+$/, "Invalid Code")
        .required("Code is required!"),
      nameOrDescr: Yup.string()
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z0-9\s]+$/, "Invalid description")
        .required("Description is required!"),
      roleStatus: Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Status is required!"),
      reason: Yup.string()
        .min(1, "Too Short!")
        .max(50, "Too Long!")
        .matches(/^[A-Za-z0-9 ]+$/, "Invalid Comments")
        .required("Comments are required!"),
    };

    if (JSON.parse(sessionStorage.getItem("user")).institution.value === "00") {
      roleShape.institution = Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Institution is required!");
    }

    const roleValidationSchema = Yup.object().shape(roleShape);

    const header = (
      <div className="mb-3">
        <div className="d-flex">
          <h1>
            <IntlMessages id="menu.inbox" />
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
                // filterable={true}
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
            modalOpen={editUserModalOpen}
            toggleModal={this.toggleUserEditModal}
            handleSubmit={this.editUserHandleSubmit}
            formFields={userFormFields}
            initialValues={this.state.editUserInitialValues}
            validationSchema={userValidationSchema}
            formName="user"
            modalName="user-modal-title"
          />
          <CustomModal
            modalOpen={editRoleModalOpen}
            toggleModal={this.toggleRoleEditModal}
            handleSubmit={this.editRoleHandleSubmit}
            formFields={roleFormFields}
            initialValues={this.state.editRoleInitialValues}
            validationSchema={roleValidationSchema}
            formName="role"
            modalName="role-modal-title"
          />
          {/* Render the content */}
          {content}
        </div>
      </Fragment>
    );
  }
}
export default Inbox;
