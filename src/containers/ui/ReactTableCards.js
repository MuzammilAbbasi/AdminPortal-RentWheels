import React from "react";
import { Card, CardTitle, CardBody, Button, Row } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactTable from "react-table";
import { CSVLink } from "react-csv";
import classnames from "classnames";
import DataTablePagination from "../../components/DatatablePagination";

const CustomTbodyComponent = props => (
  <div {...props} className={classnames("rt-tbody", props.className || [])}>
    <PerfectScrollbar options={{ suppressScrollX: true }}>
      {props.children}
    </PerfectScrollbar>
  </div>
);

export const ReactTableWithPaginationCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <ReactTable
          data={props.data}
          columns={props.dataTableColumns}
          defaultPageSize={5}
          showPageJump={false}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
};
export const ReactTableWithScrollableCard = props => {
  return (
    <Card>
      <div className="mt-4 mr-4">
          <CSVLink data={props.data} filename="batch.csv">
            <Button outline color="primary" size="sm" className="float-right">
              Export
                </Button>
          </CSVLink>
          </div>
          <CardBody>
          <ReactTable
            data={props.data}
            TbodyComponent={CustomTbodyComponent}
            columns={props.dataTableColumns}
            defaultPageSize={props.data.length}
            showPageJump={false}
            showPageSizeOptions={false}
            showPagination={false}
          />
      </CardBody>
    </Card>
  );
};
export const ReactTableAdvancedCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <ReactTable
          data={props.data}
          columns={props.dataTableColumns}
          defaultPageSize={5}
          filterable={true}
          showPageJump={true}
          PaginationComponent={DataTablePagination}
          showPageSizeOptions={true}
        />
      </CardBody>
    </Card>
  );
};
