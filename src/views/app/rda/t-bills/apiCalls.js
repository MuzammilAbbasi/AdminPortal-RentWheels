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

//name change

export function fetchTBills(
  selectedPageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  searchCriteria = defaultSearchCriteria,
  onSuccess,
  onFailure
) {

  const { column: sortColumn, asec: isAsce } = orderBy;

  const baseURL = config.url.rda + config.endpoint.rda.tBills;

  const URL =
        `${baseURL}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

  console.log('fetchTBills TBills',baseURL);
  console.log('fetchTBills search criteria: ', searchCriteria)
  console.log('fetchTBills selected page size: ', selectedPageSize)
  console.log('fetchTBills current page: ', currentPage)
  console.log('fetchTBills order by: ', orderBy)

  return axios.post(URL, { ...searchCriteria })
  .then(res => {
    console.log('fetchTBills res: ', res);
    return res.data;
  })
  .then(data => {
      onSuccess(data);
  }).catch((error) => {
      onFailure();
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('fetchTBills error.response: ', error.response);
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
          console.log('fetchTBills error.request: ', error.request);
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
          console.log('fetchTBills else error: ', error.message);
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

export function updateTBills(modifiedTBills, onSuccess, onFailure) {
  const url = config.url.rda + config.endpoint.rda.updatetBills

  console.log('updateTBills url: ', url)
  console.log('updateTBills modified TBills: ', modifiedTBills)

  return axios
    .put(url, modifiedTBills)
    .then(res => {
      console.log('updateTBills res: ', res);
      return res.data;
    })
    .then(data => {
        onSuccess(data);
    }).catch((error) => {
        onFailure();
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('updateTBills error.response: ', error.response);
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
            console.log('updateTBills error.request: ', error.request);
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
            console.log('updateTBills else error: ', error.message);
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