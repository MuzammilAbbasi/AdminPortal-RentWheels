import React, { Component, Fragment } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

export default class DataTablePagination extends Component {
  constructor(props) {
    super(props);

    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.renderPageJump = this.renderPageJump.bind(this);

    this.state = {
      page: props.page,
      pageSize: props.defaultPageSize,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { page: props.page };
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePageSize(size) {
    this.props.onPageSizeChange(size);
    
    this.setState({ pageSize: size });
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === "" ? this.props.page : page);
  }

  pageClick(pageIndex) {
    
    this.changePage(pageIndex);
  }

  renderPages() {
    let pageCount = this.props.pages;

    const current = this.state.page;
    const _displayPages = 5;

    // check 2 pages left form the current page. If user is standing on the first pages take starting point form 0, else current - 2
    let start = current - 2 < 0 ? 0 : current - 2; // ( current - 2 ) is actually two values before.
    // Check weather the user is standing on last pages? Bound page limit cannot exceed totalpages.
    start =
      start + _displayPages > pageCount ? pageCount - _displayPages : start;
    let end = start + _displayPages;

    // check, start cannot go below zero.
    start = start < 1 ? 0 : start;

    let pageButtons = [];
    for (let i = start; i < end; i++) {
      let active = this.state.page === i ? true : false;

      pageButtons.push(
        <PaginationItem key={i} active={active}>
          <PaginationLink onClick={() => this.pageClick(i)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageButtons;
  }

  renderPageJump() {
    // total pages.
    let pages = this.props.pages;
    let pageNumbers = [];
    for (let i = 0; i < pages; i++) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={() => this.changePage(i)}>
          {i + 1}
        </DropdownItem>
      );
    }
    return pageNumbers;
  }

  render() {
    const {
      page,
      pages,
      canPrevious,
      canNext,
      pageSizeOptions,
      showPageSizeOptions,
      showPageJump,
    } = this.props;

    return (
      <Fragment>
        <div className="text-center">
          {showPageJump && (
            <div className="float-left pt-2">
              <span style={{ paddingLeft: "10px" }}>Page </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs">
                  {this.state.page + 1}
                </DropdownToggle>
                <DropdownMenu direction="left">
                  {this.renderPageJump()}
                </DropdownMenu>
              </UncontrolledDropdown>
              <span> of </span>
              {pages}
            </div>
          )}
          <Pagination
            className="d-inline-block"
            size="sm"
            listClassName="justify-content-center"
            aria-label="Page navigation example"
          >
            {/* {/ {/ First Page Button /} /} */}
            <PaginationItem className={`${!canPrevious && "disabled"}`}>
              <PaginationLink
                className={"prev"}
                onClick={() => {
                  if (!canPrevious) return;
                  this.changePage(0);
                }}
                disabled={!canPrevious}
              >
                <i className="simple-icon-control-start" />
              </PaginationLink>
            </PaginationItem>

            {/* {/ {/ Pervious Page Button /} /} */}
            <PaginationItem className={`${!canPrevious && "disabled"}`}>
              <PaginationLink
                className={"prev"}
                onClick={() => {
                  if (!canPrevious) return;
                  this.changePage(page - 1);
                }}
                disabled={!canPrevious}
              >
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>

            {/* {/ {/ Render Pages Between /} /} */}
            {this.renderPages()}

            {/* {/ {/ Next Page Button /} /} */}
            <PaginationItem className={`${!canNext && "disabled"}`}>
              <PaginationLink
                className="next"
                onClick={() => {
                  if (!canNext) return;
                  this.changePage(page + 1);
                }}
                disabled={!canNext}
              >
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>

            {/* {/ {/ Last Page Button /} /} */}
            <PaginationItem className={`${!canNext && "disabled"}`}>
              <PaginationLink
                className="next"
                onClick={() => {
                  if (!canNext) return;
                  this.changePage(pages);
                }}
                disabled={!canNext}
              >
                <i className="simple-icon-control-end" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
          {showPageSizeOptions && (
            <div className="float-right pt-2">
              <span className="text-muted text-small mr-1">Items </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs">
                  {this.state.pageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizeOptions.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => this.changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
