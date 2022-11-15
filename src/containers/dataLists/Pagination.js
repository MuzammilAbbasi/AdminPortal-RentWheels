import React, {Fragment} from "react";
import { Colxx } from "../../components/common/CustomBootstrap";
import { 
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import '../../assets/css/common/dropdown.inject.css' 


class Pagination extends React.Component {
  componentDidMount() {}
  onChangePage(page) {
    this.props.onChangePage(page); 
  }
  renderPageJump() {
    let pages = this.props.totalPage;
    let pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={() => this.onChangePage(i)}>
          {i}
        </DropdownItem>
      );
    }
    return pageNumbers;
  }
  render() {
    const {
      totalPage = 0,
      currentPage = 1,
      numberLimit = 5,
      lastIsActive = true,
      firstIsActive = true,
      showPageJump,
      position = 'center'
    } = this.props;

    let startPoint = 1;
    let endPoint = numberLimit;

    if (numberLimit > totalPage) {
      startPoint = 1;
      endPoint = totalPage;
    } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
      startPoint = 1;
      endPoint = numberLimit;
    } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
      startPoint = currentPage - parseInt(numberLimit / 2, 10);
      endPoint = currentPage + parseInt(numberLimit / 2, 10);
    } else {
      startPoint = totalPage - (numberLimit - 1);
      endPoint = totalPage;
    }
    startPoint = startPoint === 0 ? 1 : startPoint;
    const points = [];
    for (var i = startPoint; i <= endPoint; i++) {
      points.push(i);
    }

    let firstPageButtonClassName = currentPage <= 1 ? "disabled" : "";
    let lastPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
    let prevPageButtonClassName = currentPage <= 1 ? "disabled" : "";
    let nextPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
    return totalPage > 1 ? (
      <div className="d-flex flex-wrap justify-content-center align-items-center mb-1 px-3">
        <Nav className={`pagination justify-content-${position}`}>
          {firstIsActive && (
            <NavItem className={`page-item ${firstPageButtonClassName}`}>
              <NavLink
                className="page-link first"
                onClick={() => this.onChangePage(1)}
              >
                <i className="simple-icon-control-start" />
              </NavLink>
            </NavItem>
          )}

          <NavItem className={`page-item ${prevPageButtonClassName}`}>
            <NavLink
              className="page-link prev"
              onClick={() => this.onChangePage(currentPage - 1)}
            >
              <i className="simple-icon-arrow-left" />
            </NavLink>
          </NavItem>
          {points.map((i) => {
            return (
              <NavItem
                key={i}
                className={`page-item ${currentPage === i && "active"}`}
              >
                <NavLink
                  className="page-link"
                  onClick={() => this.onChangePage(i)}
                >
                  {i}
                </NavLink>
              </NavItem>
            );
          })}
          <NavItem className={`page-item ${nextPageButtonClassName}`}>
            <NavLink
              className="page-link next"
              onClick={() => this.onChangePage(currentPage + 1)}
            >
              <i className="simple-icon-arrow-right" />
            </NavLink>
          </NavItem>
          {lastIsActive && (
            <NavItem className={`page-item ${lastPageButtonClassName}`}>
              <NavLink
                className="page-link last"
                onClick={() => this.onChangePage(totalPage)}
              >
                <i className="simple-icon-control-end" />
              </NavLink>
            </NavItem>
          )}
        </Nav>
        {showPageJump && (
          <div className="ml-5">
            <span>Page </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {currentPage}
              </DropdownToggle>
              <DropdownMenu className="fixed-scroll-menu" direction="bottom">
                {this.renderPageJump()}
              </DropdownMenu>
            </UncontrolledDropdown>
            <span> of </span>
            {totalPage}
          </div>
        )}

        </div>
    ) : (
      <Colxx xxs="12" className="mt-2" />
    );
  }
}

export default Pagination;
