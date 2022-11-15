import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput
} from "reactstrap";
import { injectIntl } from "react-intl";

class ColumnAction extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
    };
  }

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    const {
      handleChangeSelectAll,
      changeAction,
      selectedItemsLength,
      itemsLength,
      actionOptions
    } = this.props;

    const { dropdownSplitOpen } = this.state;
    return (
      <div className="text-zero">
        <ButtonDropdown
          isOpen={dropdownSplitOpen}
          toggle={this.toggleSplit}>
          <div className="btn btn-primary pl-4 pr-0 check-button check-all">
            <CustomInput
              className="custom-checkbox mb-0 d-inline-block"
              type="checkbox"
              id="checkAll"
              checked={selectedItemsLength >= itemsLength}
              onChange={() => handleChangeSelectAll(true)}
              label={
                <span
                  className={`custom-control-label ${
                    selectedItemsLength > 0 &&
                      selectedItemsLength < itemsLength
                      ? "indeterminate"
                      : ""
                    }`}
                />
              }
            />
          </div>
          <DropdownToggle
            caret
            color="primary"
            className="dropdown-toggle-split" />
          <DropdownMenu right
            style={{overflow: "visible"}}
          >
            {/* <DropdownItem>
                    <IntlMessages id="delete-button" />
                  </DropdownItem> */}
            {actionOptions.map((action, index) => {
              return (
                <DropdownItem
                  key={index}
                  onClick={() => changeAction(action.column)}
                >
                  {action.label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default injectIntl(ColumnAction);
