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
  username: "",
  status: "",
  reqAccountNo: "",
  reqBankName: "",
  stampDate: ""
};

export function fetchRepatriation(
  selectedPageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  searchCriteria = defaultSearchCriteria,
  onSuccess,
  onFailure
) {

  const { column: sortColumn, asec: isAsce } = orderBy;

  const baseURL = config.url.rda + config.endpoint.rda.repatriation;

  const URL =
        `${baseURL}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

  console.log('fetchRepatriation url: ', URL)
  console.log('fetchRepatriation search criteria: ', searchCriteria)
  console.log('fetchRepatriation selected page size: ', selectedPageSize)
  console.log('fetchRepatriation current page: ', currentPage)
  console.log('fetchRepatriation order by: ', orderBy)

  return axios.post(URL, { ...searchCriteria })
  .then(res => {
    console.log('fetchRepatriation res: ', res);
    return res.data;
  })
  .then(data => {
      onSuccess(data);
  }).catch((error) => {
      onFailure();
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('fetchRepatriation error.response: ', error.response);
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
          console.log('fetchRepatriation error.request: ', error.request);
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
          console.log('fetchRepatriation else error: ', error.message);
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

export function updateRepatriation(modifiedRepatriation, onSuccess, onFailure) {
  const url = config.url.rda + config.endpoint.rda.updateRepatriation

  console.log('updateRepatriation url: ', url)
  console.log('updateRepatriation modified repatriation: ', modifiedRepatriation)

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