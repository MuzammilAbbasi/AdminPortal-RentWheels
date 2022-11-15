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
  tenor: "",
  stampDate: "",
  status: "",
  username: "",
  cnic: "",
  accountTitle: "",
};

export function fetchPIBs(
  selectedPageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  searchCriteria = defaultSearchCriteria,
  onSuccess,
  onFailure
) {

  const { column: sortColumn, asec: isAsce } = orderBy;

  const baseURL = config.url.rda + config.endpoint.rda.pibs;

  const URL =
    `${baseURL}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

  console.log('fetchPIBs PIBs', URL);
  console.log('fetchPIBs search criteria: ', searchCriteria)
  console.log('fetchPIBs selected page size: ', selectedPageSize)
  console.log('fetchPIBs current page: ', currentPage)
  console.log('fetchPIBs order by: ', orderBy)

  return axios.post(URL, { ...searchCriteria })
    .then(res => {
      console.log('fetchPIBs res: ', res);
      return res.data;
    })
    .then(data => {
      onSuccess(data);
    }).catch((error) => {
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('fetchPIBs error.response: ', error.response);
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
        console.log('fetchPIBs error.request: ', error.request);
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
        console.log('fetchPIBs else error: ', error.message);
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

export function updatePIBs(modifiedRepatriation, onSuccess, onFailure) {
  const url = config.url.rda + config.endpoint.rda.updatepibs

  console.log('updatepibs url: ', url)
  console.log('updatepibs modified repatriation: ', modifiedRepatriation)

  return axios
    .put(url, modifiedRepatriation)
    .then(res => {
      console.log('updateRepatriation res: ', res);
      return res.data;
    })
    .then(data => {
      onSuccess(data);
    }).catch((error) => {
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('updateRepatriation error.response: ', error.response);
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
        console.log('updateRepatriation error.request: ', error.request);
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
        console.log('updateRepatriation else error: ', error.message);
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