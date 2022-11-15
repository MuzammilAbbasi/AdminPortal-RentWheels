import axios from "axios";
import config from "../../../../config"
import { NotificationManager } from "components/common/react-notifications";


const defaultPageSize = 10;
const defaultPageNumber = 1;

const defaultOrderBy = {
  column: "stampDate",
  asec: false,
};

const defaultSearchCriteria = {
  account: "",
  description: "",
  stampDate: "",
  username: "",
  cnic: "",
  accountTitle: "",
  status: "",
};

export function fetchAccountMaintenance(
  selectedPageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  searchCriteria = defaultSearchCriteria,
  onSuccess,
  onFailure
) {

  const { column: sortColumn, asec: isAsce } = orderBy;

  const baseURL = config.url.rda + config.endpoint.rda.accountMaintenance;

  const URL =
    `${baseURL}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

  console.log('fetchAccountMaintenanceurl: ', URL)
  console.log('fetchAccountMaintenancesearch criteria: ', searchCriteria)
  console.log('fetchAccountMaintenanceselected page size: ', selectedPageSize)
  console.log('fetchAccountMaintenancecurrent page: ', currentPage)
  console.log('fetchAccountMaintenanceorder by: ', orderBy)

  return axios.post(URL, { ...searchCriteria })
    .then(res => {
      console.log('fetchAccountMaintenanceres: ', res);
      return res.data;
    })
    .then(data => {
      onSuccess(data);
    }).catch((error) => {
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('fetchAccountMaintenanceerror.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        // NotificationManager.error(
        //     error.response.data.message,
        //     error.response.status,
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('fetchAccountMaintenance error.request: ', error.request);
        // NotificationManager.error(
        //     "ERR_CONNECTION_REFUSED",
        //     "",
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('fetchAccountMaintenanceelse error: ', error.message);
        // NotificationManager.error(
        //     "Unknown Error",
        //     "",
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      }
    });
}

export function updateAccountMaintenance(modifiedAccount, onSuccess, onFailure) {
  const url = config.url.rda + config.endpoint.rda.updateAccountMaintenance;

  console.log('updateAccountMaintenance url: ', url)
  console.log('updateAccountMaintenance modified ips: ', modifiedAccount)

  return axios
    .put(url, modifiedAccount)
    .then(res => {
      console.log('updateAccountMaintenance res: ', res);
      return res.data;
    })
    .then(data => {
      onSuccess(data);
    }).catch((error) => {
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('updateAccountMaintenance error.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        // NotificationManager.error(
        //     error.response.data.message,
        //     error.response.status,
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('updateAccountMaintenance error.request: ', error.request);
        // NotificationManager.error(
        //     "ERR_CONNECTION_REFUSED",
        //     "",
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('updateAccountMaintenance else error: ', error.message);
        // NotificationManager.error(
        //     "Unknown Error",
        //     "",
        //     0,
        //     null,
        //     null,
        //     "filled"
        // );
      }
    });
}