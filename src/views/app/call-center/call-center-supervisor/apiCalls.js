import axios from "axios";
import config from "../../../../config";
import { NotificationManager } from "components/common/react-notifications";
import { getHeaders } from "constants/requestHeaders";

const defaultPageSize = 10;
const defaultPageNumber = 1;
// const defaultStartingDate = new Date();
// const defaultEndingDate = new Date();
const defaultOrderBy = "stampDate";
const defaultisAsc = "true";
const defaultCriteria = {
  cnic: "",
  accountNumber: "",
};

export function getMakerTransactionDetails(
  searchCriteria = defaultCriteria,
  pageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  isAsc = defaultisAsc,
  internationalTransactionStatus,
  onSuccess,
  onFailure
) {
  const payload = {
    filterCriteria: searchCriteria,
    status: internationalTransactionStatus,
    pageSize: pageSize,
    currentPage: currentPage - 1,
    orderBy: orderBy,
    isAsc: isAsc,
  };

  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.makerTransactionDetails}`;
  // const URL = baseURL1
  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;
      // let notification= NotificationManager.success(
      //     res.data.message,
      //     res.data.status,
      //     3000,
      //     null,
      //     null,
      //     "filled"
      // );

      onSuccess(data);
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("getDataAgainstCnic error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
export function IndexApi(
  searchCriteria = defaultCriteria,
  pageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  isAsc = defaultisAsc,
  onSuccess,
  onFailure
) {
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.indexDetail}`;
  const payload = {
    filterCriteria: searchCriteria,
    pageSize: pageSize,
    currentPage: currentPage - 1,
    orderBy: orderBy,
    isAsc: isAsc,
  };

  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;

      // let notification= NotificationManager.success(
      //     res.data.message,
      //     res.data.status,
      //     3000,
      //     null,
      //     null,
      //     "filled"
      // );

      onSuccess(data);
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("getDataAgainstCnic error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
export function approveStatus(payload, onFetchApproveSuccess, onFailure) {
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.approveUserStatus}`;
  console.log(URL);
  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;

      let notification = NotificationManager.success(
        res.data.message,
        res.data.status,
        3000,
        null,
        null,
        "filled"
      );

      onFetchApproveSuccess(data);
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("approveStatus error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
export function rejectStatus(payload, onSuccess, onFailure) {
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.rejectUserStatus}`;

  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;

      let notification = NotificationManager.success(
        "Request is Rejected",
        res.data.status,
        4000,
        null,
        null,
        "filled"
      );

      onSuccess();
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("getDataAgainstCnic error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
export function RejectTransactionStatus(payload, onSuccess, onFailure) {
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.rejectTransactionStatus}`;

  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;

      if (data.status === "200") {
        let notification = NotificationManager.success(
          "Request is Rejected",
          data.status,
          4000,
          null,
          null,
          "filled"
        );

        onSuccess();
      } else {
        let notification = NotificationManager.error(
          data.message,
          data.status,
          4000,
          null,
          null,
          "filled"
        );

        onFailure();
      }
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("getDataAgainstCnic error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
export function ApproveTransactionStatus(payload, onSuccess, onFailure) {
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenterSupervisor.approveTransactionStatus}`;

  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const data = res.data;

      if (data.status === "200") {
        let notification = NotificationManager.success(
          "Request is Rejected",
          res.data.status,
          4000,
          null,
          null,
          "filled"
        );

        onSuccess();
      } else {
        let notification = NotificationManager.error(
          data.message,
          data.status,
          4000,
          null,
          null,
          "filled"
        );

        onFailure();
      }
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("getDataAgainstCnic error.response: ", error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          3000,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("getDataAgainstCnic else error: ", error.message);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    });
}
