import axios from "axios";
import config from "../../../../config"
import { NotificationManager } from "components/common/react-notifications";


const defaultPageSize = 10;
const defaultPageNumber = 1;

// const defaultOrderBy = {
//   column: "stampDate",
//   asec: false,
// };

// const defaultSearchCriteria = {
//   username: "",
//   status: "",
//   accountTitle: "",
//   account: "",
//   stampDate: ""
// };

export function fetchIps(
    selectedPageSize = defaultPageSize,
    currentPage = defaultPageNumber,
    // orderBy = defaultOrderBy,
    // searchCriteria = defaultSearchCriteria,
    onSuccess,
    onFailure
  ) {

    // console.log({TotalSize,totalPages})
  
    // const { column: sortColumn, asec: isAsce } = orderBy;
  
    // const baseURL = config.url.rda + config.endpoint.rda.ips;
  
    const URL =
          "https://jsonplaceholder.typicode.com/comments"
    // const URL =
    //       `https://api.instantwebtools.net/v1/passenger?page=${totalPages}&size=${TotalSize}`
  
    console.log('fetchIps url: ', URL)
    // console.log('fetchIps search criteria: ', searchCriteria)
    // console.log('fetchIps selected page size: ', selectedPageSize)
    // console.log('fetchIps current page: ', currentPage)
    // console.log('fetchIps order by: ', orderBy)
  
    return axios.get(URL)
    .then(res => {
      console.log('fetchIps res: ', res);


      return res.data;
    })
    .then(data => {

        onSuccess(data);
    }).catch((error) => {
        onFailure();
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('fetchIps error.response: ', error.response);
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
            console.log('fetchIps error.request: ', error.request);
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
            console.log('fetchIps else error: ', error.message);
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
  