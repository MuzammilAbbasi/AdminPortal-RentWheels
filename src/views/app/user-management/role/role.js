import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import {
  Input,
  Card,
  CardBody,
  CustomInput,
  Button
} from "reactstrap";
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
  getPermissions,
  addRole,
  editRole,
  batchUpdateRoleStatus
} from "./apiCalls";

import LoadingOverlay from 'components/custom/LoadingOverlay'

import "react-datepicker/dist/react-datepicker.css";
import "../../../../assets/css/common/datepoper.inject.css";
import "../../../../assets/css/common/common.css";



class Role extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      selectedPageSize: 10,
      showLoadingOverlay: false,

      // Search Criteria
      searchCriteria:
      {
        code: "",
        descr: "",
        institution: "",
        status: "",
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
      permissions: [],
      checked: [],
      expanded: []
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
    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
      getInstitutionsList(this.setInstitutionsList);
    } else {
      getPermissions(this.setPermissions);
    }
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  componentDidUpdate() {
    if (this.state.editInitialValues !== undefined && this.state.editInitialValues !== null) {
      if (this.state.editInitialValues.permissions !== undefined && this.state.editInitialValues.permissions !== null) {
        if (this.state.checked.length === 0) {
          this.state.editInitialValues.permissions.forEach((o) => {
            this.state.checked.push(
              o.id.toString()
            );
            this.state.expanded.push(
              o.id.toString()
            );
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
      institutuionList: data
    });
  };

  setPermissions = (data) => {
    this.setState({
      permissions: data
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
  }

  getSingleItem = (item) => {
    return (
      { value: item.id.toString(), label: item.label, icon: item.type === 'button' ? <i className="iconsminds-on-off"/> : null }
      // { value: item.id.toString(), label: item.label, icon: <i className={item.icon} /> }
    );
  }

  getMultipleItem = (childItems, item) => {
    return (
      { value: item.id.toString(), label: item.label, children: childItems }
    );
  }

  getChildItem = (o) => {
    const childItems = [];
    this.state.permissions.forEach((p) => {
      if (o.id === p.parentId) {
        childItems.push(
          p
        );
      }
    });
    return childItems;
  }

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

  onAddEditSuccess = data => {
    // this.setState({showLoadingOverlay: false});
  }

  onAddEditFailure = error => {
    this.setState({showLoadingOverlay: false});
  }

  toggleAddModal = () => {

    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
      this.setState({
        permissions: [],
      });
    }
    this.setState({
      addModalOpen: !this.state.addModalOpen,
      checked: [],
      expanded: []
    });
  };

  toggleEditModal = (productCode) => {
    const initial = this.state.items.filter((x) => x.code === productCode)[0];
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      editInitialValues: initial,
      checked: [],
      expanded: []
    });

    if (!this.state.editModalOpen && JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
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

  // Toggling Model related Logic [START]

  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const { code } = rowInfo.original;
      return {
        onDoubleClick: () => this.toggleEditModal(code),
      };
    }
    return {};
  };

  changeAction = column => {

    console.log('selectedItems: ', this.state.selectedItems);

    if (this.state.selectedItems.length > 0) {
      const payload = {
        roleStatus: column,
        roles: this.state.selectedItems,
        institution: JSON.parse(sessionStorage.getItem('user')).institution.value
      };

      batchUpdateRoleStatus(payload);
    }
  };

  onCheckItem = (event, code) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: code
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(code)) {
      selectedItems = selectedItems.filter(x => x !== code);
    } else {
      selectedItems.push(code);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(code, items, "code");
      var end = this.getIndex(this.state.lastChecked, items, "code");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.code;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
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

  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.code)
      });
    }
    document.activeElement.blur();
    return false;
  };

  addHandleSubmit = (values, { setSubmitting }) => {
    this.setState( { showLoadingOverlay: true } )
    console.log('checked: ', this.state.checked);
    const payload = {
      ...values,
      roleStatus: values.roleStatus.value,
      permissions: this.state.checked
    };
    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
      payload.institution = values.institution.value
    } else {
      payload.institution = JSON.parse(sessionStorage.getItem('user')).institution.value
    }
    console.log(JSON.stringify(payload, null, 2));
    addRole(payload, this.onAddEditSuccess, this.onAddEditFailure);
  };

  editHandleSubmit = (values, { setSubmitting }) => {
    this.setState( { showLoadingOverlay: true } )
    const payload = {
      ...values,
      roleStatus: values.roleStatus.value,
      permissions: this.state.checked
    };
    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
      payload.institution = values.institution.value
    } else {
      payload.institution = JSON.parse(sessionStorage.getItem('user')).institution.value
    }
    console.log(JSON.stringify(payload, null, 2));
    editRole(payload, this.onAddEditSuccess, this.onAddEditFailure);
  };

  onAddEditSuccess = (data) => {
    this.setState( { showLoadingOverlay: false } )
  }

  onAddEditFailure = (error) => {
    this.setState( { showLoadingOverlay: false } )
  }

  onInstitutionChange = (name, value, setFieldValue) => {
    console.log('onInstitutionChange name: ', name);
    console.log('onInstitutionChange value: ', value);
    console.log('onInstitutionChange setFieldValue: ', setFieldValue);
    getPermissions(this.setPermissions, value);
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
        selectedItems: [clickedProductId]
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
        onChange={(event) => { this.onCheckItem(event, value) }}
        label=""
      />
    );
  };
  columns = [
    {

      Header: "Code",
      id: "code",
      accessor: "code",
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
      Header: "Description",
      id: "descr",
      accessor: "descr",
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
      Header: "Institutution",
      id: "institution",
      accessor: "institution.value",
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
      Header: () => "Status",
      id: "roleStatus",
      accessor: "roleStatus.label",
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
    //   id: "code",
    //   accessor: "code",
    //   filterable: false,
    //   sortable: false,
    //   style: { overflow: "visible" },
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

    const nodes = [];
    this.state.permissions.forEach((o) => {
      if (o.parentId === -1) {
        nodes.push(this.getNodes(o));
      }
    });

    const formFields = [
      {
        label: 'label.code',
        name: 'code',
        type: 'textbox',
        maxLength: '3',
        disabled: this.state.editModalOpen,
        colxx: "6",
      },
      {
        label: 'label.desc',
        name: 'descr',
        type: 'textbox',
        maxLength: '50',
        disabled: false,
        colxx: "6",
      },
      {
        label: 'label.status',
        name: 'roleStatus',
        id: 'roleStatus',
        type: 'select',
        options: [
          { value: "01", label: "Active" },
          { value: "03", label: "In-Active" },
        ],
        disabled: false,
        colxx: "6",
      }
    ];

    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
      formFields.push({
        label: 'label.institution',
        name: 'institution',
        id: 'institution',
        type: 'select',
        options: this.state.institutuionList,
        disabled: false,
        onChange: this.onInstitutionChange,
        colxx: "6",
      });
    }

    formFields.push({
      label: 'label.permission',
      name: 'permissions',
      id: 'permissions',
      type: 'nodes',
      options: nodes,
      checked: this.state.checked,
      expanded: this.state.expanded,
      onCheck: (checked, targetNode) => { this.setState({ checked }) },
      onExpand: (expanded, targetNode) => this.setState({ expanded }),
    });

    const addInitialValues = {
      code: "",
      descr: "",
      roleStatus: undefined,
      institution: undefined,
    };

    const shape = {
      code: Yup.string()
        .min(2, 'Too Short!')
        .max(3, 'Too Long!')
        .matches(/^[0-9]+$/, 'Invalid Code')
        .required("Code is required!"),
      descr: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        // back pe ye regex hai ^[A-Za-z0-9\\s]+$
        .matches(/^[A-Za-z0-9\s]+$/, 'Invalid description')
        .required("Description is required!"),
      roleStatus: Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Status is required!")
    };

    if (JSON.parse(sessionStorage.getItem('user')).institution.value === "00") {
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
            <IntlMessages id="menu.role" />
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
              onClick={this.toggleAddModal}>
              <IntlMessages id="add-button" />
            </Button>
          </div>
        </div>
      </div>
    );

    const content = (
      <Fragment>
        { showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} /> }
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
              formName="add-role"
              modalName="add-role-modal-title"
              cancelButton="cancel-button"
            />
            <CustomModal
              modalOpen={editModalOpen}
              toggleModal={this.toggleEditModal}
              handleSubmit={this.editHandleSubmit}
              formFields={formFields}
              initialValues={this.state.editInitialValues}
              validationSchema={validationSchema}
              formName="edit-role"
              modalName="edit-role-modal-title"
              cancelButton="cancel-button"
            />
            {/* Render the content */}
            {content}
          </div>
        </Fragment>
      );
  }
}
export default Role;
