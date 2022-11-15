import { useMemo } from "react";
import { useTable } from "react-table";
import React, { Component } from "react";

export const BookingTable = () => {
  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      width: 185,
    },
    {
      Header: "Rentee",
      accessor: "rentee.username",
      width: 150,
    },
  ];
  var tdata;
  fetch("http://localhost:8000/api/v1/bookings")
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        tdata: data.Payload.data,
      });
      tdata = data.Payload.data;
      // alert(data.Payload.data[0]._id);
      // this.setState({
      //   list: data.Payload.data,
      // });
    });
  tdata = useMemo(() => tdata, []);
  const tableInstance = useTable({
    columns,
    tdata,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroups) => (
          <tr {...headerGroups.getHeaderGroupProps()}>
            {headerGroups.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
