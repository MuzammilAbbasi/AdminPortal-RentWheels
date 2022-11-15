import React from "react";
import { defaultDirection } from "../constants/defaultValues";
import moment from "moment";
import converter from 'number-to-words'
import { FormattedHTMLMessage } from "react-intl";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

// For Detail page
export const TypeCell = ({ value }) => {
  switch (value) {
    case "PRE_VALIDATION":
      return (
        <div className="badge badge-outline-primary badge-pill">{value}</div>
      );
    case "PRE_VALIDATION_REPLY":
      return <div className="badge badge-outline-info badge-pill">{value}</div>;
    case "PAYMENT":
      return (
        <div className="badge badge-outline-primary badge-pill">{value}</div>
      );
    case "PAYMENT_REPLY":
      return <div className="badge badge-outline-info badge-pill">{value}</div>;
    case "User Creation":
      return (
        <div className="badge badge-outline-primary badge-pill">{value}</div>
      );
    case "Role Creation":
      return <div className="badge badge-outline-info badge-pill">{value}</div>;
    case "User Updation":
      return (
        <div className="badge badge-outline-primary badge-pill">{value}</div>
      );
    case "Role Updation":
      return <div className="badge badge-outline-info badge-pill">{value}</div>;
    case "inquiry":
      return <div className="badge badge-outline-info badge-pill">inquiry</div>;
    case "credit":
      return <div className="badge badge-outline-info badge-pill">credit</div>;
    case "payment-inquiry":
      return (
        <div className="badge badge-outline-secondary badge-pill">
          credit-inquiry
        </div>
      );
    case "DBIT":
      return <div className="badge badge-outline-info badge-pill">DBIT</div>;
    case "CRDT":
      return (
        <div className="badge badge-outline-secondary badge-pill">CRDT</div>
      );
    default:
      return (
        <div className="badge badge-outline-secondary badge-pill">{value}</div>
      );
  }
};

// For detail page
export const StatusCell = ({ value }) => {
  const _lower = value.toLowerCase();

  if (_lower.includes("complete"))
    return <span className="badge badge-pill badge-success ">{value}</span>;
  else if (_lower.includes("rejected"))
    return <span className="badge badge-pill badge-danger">{value}</span>;
  else return <span className="badge badge-pill badge-info">{value}</span>;
};

export const DetailStatusCell = ({ value }) => {
  if (value != null && value !== undefined) {
    const lower = value.toLowerCase();
    const upper = lower.toUpperCase();
    switch (lower) {
      case "success":
        return <span className="badge badge-pill badge-success">{upper}</span>;
      case "fail":
        return <span className="badge badge-pill badge-danger">{upper}</span>;
      case "processed":
        return <span className="badge badge-pill badge-success">{upper}</span>;
      case "returned":
        return <span className="badge badge-pill badge-info">{upper}</span>;
      case "suspended":
        return <span className="badge badge-pill badge-warning">{upper}</span>;
      case "rejected":
        return <span className="badge badge-pill badge-danger">{upper}</span>;
      default:
        return (
          <span className="badge badge-pill badge-secondary">{upper}</span>
        );
    }
  }
  return null;
};

export const dropDownValue = ({ value }) => {
  switch (value) {
    case "Active":
      return <span className="badge badge-pill badge-success">{value}</span>;
    case "In-Active":
      return <span className="badge badge-pill badge-danger">{value}</span>;
    default:
      return <span className="badge badge-pill badge-secondary">{value}</span>;
  }
};

export const DateCell = ({ value }) => {
  const formatedDate = moment(value, "DD-MM-YYYY hh:mm:ss a").format(
    "DD-MM-YYYY"
  );
  return formatedDate;
};

export const NumberCell = ({ value }) => {
  return Number(value).toLocaleString();
};

export const DateDiffCell = ({ value, row }) => {
  return (
    <span title={dateDiff(row.processStartDateTime, row.processEndDateTime)}>
      {" "}
      {value}{" "}
    </span>
  );
};

/*
 * Purpose: "Transform Array to object"
 *
 * Input: [{id: 'idVal', value: 'valueVal'}]
 *
 * Output:  {idVal: valueVal}
 */
export const transformToObject = (arr) => {
  const obj = {};
  arr.forEach((element) => {
    obj[`${element.id}`] = element.value;
  });
  return obj;
};

export const caseInsensitiveFilter = (filter, row, column) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()).includes(
        filter.value.toLowerCase()
      )
    : true;
}

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "." + mm + "." + yyyy;
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};

export const getDirection = () => {
  let direction = defaultDirection;
  if (localStorage.getItem("direction")) {
    const localValue = localStorage.getItem("direction");
    if (localValue === "rtl" || localValue === "ltr") {
      direction = localValue;
    }
  }
  return {
    direction,
    isRtl: direction === "rtl",
  };
};

export const setDirection = (localValue) => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  localStorage.setItem("direction", direction);
};

export function dateDiff(date1, date2) {
  let d1 = moment(date1, "DD-MM-YYYY hh:mm:ss a");
  let d2 = moment(date2, "DD-MM-YYYY hh:mm:ss a");

  var result =
    d2.diff(d1, "minutes") + " min(s) or " + d2.diff(d1, "seconds") + " sec(s)";

  return result;
}

export function amountFotmatter(amount) {
  const currFormat = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  })
    .format(amount)
    .substring(3);

  return currFormat;
}

export function changeSettleDateFormat(settlementDate) {
  if (settlementDate !== null) {
    let d1 = moment(settlementDate, "YYYY-MM-DD");

    return moment(d1).format("DD-MM-YYYY");
  } else return "NA";
}

export function changeDateFormat(date) {
  let d1 = moment(date, "YYYY-MM-DD hh:mm:ss.SSS");

  return moment(d1).format("DD-MM-YYYY hh:mm:ss");
}

export function xml2json(xml) {
  var x2js = require("x2js");
  var x2jsObj = new x2js();

  const json = x2jsObj.xml2js(xml);

  return json;
}

// input: string | number 
// valid-inputs: 1000 | 1,000
export function toWords( number ){
  const type = typeof number
  console.log('toWords: ', type);
  switch (type){
    case 'number': return converter.toWords( number )
    case 'string': return converter.toWords( number.replace(/,/g, '') )
    default: return number
  }
}

export function isFieldRequired(yupSchema, fieldname) {
  if (yupSchema.describe().fields[fieldname] !== undefined)
    return (
      yupSchema
        .describe()
        .fields[fieldname].tests.findIndex(({ name }) => name === "required") >= 0
    );
  else return false;
 }
