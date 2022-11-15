import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import InstitutionDataListView from "./InstitutionDataListView";
import InstitutionDataListHeading from "./InstitutionDataListHeading";
import Pagination from "../../../../containers/dataLists/Pagination";
import ListPageHeading from "../../../../containers/dataLists/ListPageHeading";
import CustomModal from "../../../../containers/modals/CustomModal";
import NoDataListHeading from "../../../../containers/dataLists/NoDataListHeading";
import { getAll, addInstitution, editInstitution, batchUpdateInstitutionStatus } from "./apiCalls";
// import LoadingOverlay from "components/custom/LoadingOverlay"

import LoadingOverlay from 'components/custom/LoadingOverlay'

import * as Yup from "yup";

function collect(props) {
  return { data: props.data };
}

class Institution extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "createdDatetime", label: "Created Date Time" },
        { column: "code", label: "Code" },
        { column: "descr", label: "Description" }
      ],
      actionOptions: [
        { column: "01", label: "Active" },
        { column: "03", label: "In-Active" },
        { column: "02", label: "Delete" },
      ],
      pageSizes: [10, 20, 30, 50, 100],

      selectedOrderOption: { column: "createdDatetime", label: "Created Date Time" },
      dropdownSplitOpen: false,
      addModalOpen: false,
      editModalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      showLoadingOverlay: false,
      editInitialValues: {},
    };

    this.addHandleSubmit = this.addHandleSubmit.bind(this);
    this.editHandleSubmit = this.editHandleSubmit.bind(this);
  }
  componentDidMount() {
    getAll(this.state.selectedPageSize, this.state.currentPage, this.state.selectedOrderOption, this.state.search, this.setData, this.setErrorData);
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

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  setData = (data) => {
    this.setState({
      totalPage: data.totalPages,
      items: data.resp,
      // selectedItems: [],
      totalItemCount: data.totalItem,
      isLoading: true
    });
  };

  setErrorData = () => {
    this.setState({
      items: [],
      isLoading: true
    });
  };

  toggleAddModal = () => {
    this.setState({
      addModalOpen: !this.state.addModalOpen
    });
  };

  toggleEditModal = (productCode) => {
    this.setState({
      editModalOpen: !this.state.editModalOpen,
      editInitialValues: this.state.items.filter((x) => x.code === productCode)[0]
    });
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => getAll(this.state.selectedPageSize, this.state.currentPage, this.state.selectedOrderOption, this.state.search, this.setData, this.setErrorData)
    );
  };

  changeAction = column => {

    console.log('selectedItems: ', this.state.selectedItems);

    if (this.state.selectedItems.length > 0) {
      const payload = {
        institutionStatus: column,
        institutions: this.state.selectedItems
      };

      batchUpdateInstitutionStatus(payload);
    }
  };

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => getAll(this.state.selectedPageSize, this.state.currentPage, this.state.selectedOrderOption, this.state.search, this.setData, this.setErrorData)
    );
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };

  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => getAll(this.state.selectedPageSize, this.state.currentPage, this.state.selectedOrderOption, this.state.search, this.setData, this.setErrorData)
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => getAll(this.state.selectedPageSize, this.state.currentPage, this.state.selectedOrderOption, this.state.search, this.setData, this.setErrorData)
      );
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
    const payload = {
      ...values,
      institutionStatus: values.institutionStatus.value
    };
    console.log(JSON.stringify(payload, null, 2));
    addInstitution(payload);
  };

  editHandleSubmit = (values, { setSubmitting }) => {
    this.setState( { showLoadingOverlay: true } )
    const payload = {
      ...values,
      institutionStatus: values.institutionStatus.value
    };
    console.log(JSON.stringify(payload, null, 2));
    editInstitution(payload, this.onAddEditSuccess, this.onAddEditFailure);
  };

  onAddEditSuccess = (data) => {
    this.setState( { showLoadingOverlay: false } )
  }

  onAddEditFailure = (error) => {
    this.setState( { showLoadingOverlay: false } )
  }

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

  render() {
    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      actionOptions,
      pageSizes,
      showLoadingOverlay,
      addModalOpen,
      editModalOpen
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    const formFields = [
      {
        label: 'label.code',
        name: 'code',
        type: 'textbox',
        maxLength: '25',
        disabled: this.state.editModalOpen,
      },
      {
        label: 'label.desc',
        name: 'descr',
        type: 'textbox',
        maxLength: '50',
        disabled: false,
      },
      {
        label: 'label.status',
        name: 'institutionStatus',
        id: 'institutionStatus',
        type: 'select',
        options: [
          { value: "01", label: "Active" },
          { value: "03", label: "In-Active" },
        ],
        disabled: false,
      },
    ];

    const addInitialValues = {
      code: "",
      descr: "",
      institutionStatus: undefined,
    };

    const validationSchema = Yup.object().shape({
      code: Yup.string()
        .min(5, 'Too Short!')
        .max(25, 'Too Long!')
        .matches(/^[A-Za-z0-9]+$/, 'Invalid Code')
        .required("Code is required!"),
      descr: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[A-Za-z0-9\s]+$/, 'Invalid description')
        .required("Description is required!"),
      institutionStatus: Yup.object()
        // .shape({
        //   label: Yup.string().required(),
        //   value: Yup.string().required()
        // })
        .required("Status is required!"),
    });

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          { showLoadingOverlay && <LoadingOverlay style={{ zIndex: 2000 }} /> }
          <div>
            <ListPageHeading
              heading="menu.institution"
              displayMode={displayMode}
              changeDisplayMode={this.changeDisplayMode}
              handleChangeSelectAll={this.handleChangeSelectAll}
              changeOrderBy={this.changeOrderBy}
              changeAction={this.changeAction}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              actionOptions={actionOptions}
              pageSizes={pageSizes}
              toggleAddModal={this.toggleAddModal}
            />
            <CustomModal
              modalOpen={addModalOpen}
              toggleModal={this.toggleAddModal}
              handleSubmit={this.addHandleSubmit}
              formFields={formFields}
              initialValues={addInitialValues}
              validationSchema={validationSchema}
              formName="add-institutuion"
              modalName="add-institution-modal-title"
            />
            <CustomModal
              modalOpen={editModalOpen}
              toggleModal={this.toggleEditModal}
              handleSubmit={this.editHandleSubmit}
              formFields={formFields}
              initialValues={this.state.editInitialValues}
              validationSchema={validationSchema}
              formName="edit-institutuion"
              modalName="edit-institution-modal-title"
            />
            {
              this.state.items.length > 0 ? (
                <div>
                  <Row>
                    <Pagination
                      currentPage={this.state.currentPage}
                      totalPage={this.state.totalPage}
                      onChangePage={i => this.onChangePage(i)}
                    />
                  </Row>
                  <Row>
                    <InstitutionDataListHeading />
                  </Row>
                  <Row>
                    {this.state.items.map(product => {
                      return (
                        <InstitutionDataListView
                          key={product.code}
                          product={product}
                          isSelect={this.state.selectedItems.includes(product.code)}
                          onCheckItem={this.onCheckItem}
                          collect={collect}
                          toggleEditModal={this.toggleEditModal}
                        />
                      );
                    })}
                  </Row>
                </div>) :
                <Row>
                  <NoDataListHeading />
                </Row>
            }
          </div>
        </Fragment>
      );
  }
}
export default Institution;
