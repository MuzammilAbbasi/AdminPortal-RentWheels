import axios from "axios";
import config from "../../../../config";
import { NotificationManager } from "components/common/react-notifications";
import { getHeaders } from "constants/requestHeaders";

const defaultPageSize = 10;
const defaultPageNumber = 1;
const defaultOrderBy = "ID";
const defaultisAsc = "true";
const defaultSearchCriteria = 
{
    accountNumber: "",
    activity: "",
    cnic: "",
    debitCard: "",
    dob: "",
    email: "",
    mobileNo: "",
    responseDescription: "",
    rrn: "",
    stampDate: "",
};

export function fetchMobileRegistrationAgainstCnic(
  searchCriteria = defaultSearchCriteria,
  pageSize = defaultPageSize,
  currentPage = defaultPageNumber - 1,
  orderBy = defaultOrderBy,
  isAsc= defaultisAsc,
  onSuccess,
  onFailure
){
  const payload = {
    filterCriteria:searchCriteria,
    pageSize:pageSize,
    currentPage:currentPage,
    orderBy:orderBy,
    isAsc:isAsc
}
  console.log("payloadAPI ==> ",payload);
  const baseURL = config.url.ib_backoffice
  console.log("baseURL1 ==>",baseURL)
  const baseURL1 = `${baseURL}Registration/registrationDetailAgainstCnic`;
  const URL = baseURL1
  console.log("fetchIps url: ", URL);
  console.log(getHeaders()," <== HEADERS")
  
  return axios
    .post(URL,payload,getHeaders())
    .then((res) => {
      const {data} = res.data;
      console.log("RES =>> ",data)
      if(data){
        onSuccess(data);
      }
      else{
      onFailure();
      var size = Object.keys(payload?.filterCriteria).length;
      if(size < 2)
      NotificationManager.error(
        res.data.status,
        "No Data Found",
        3000,
        null,
        null,
        "filled"
    );
      }
    })
    .catch((error) => {
      console.log(error,"Err")
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("fetchIps error.response: ", error.response);
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
        console.log("NOT GET")
        console.log("fetchIps error.request: ", error.request);
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
        console.log("fetchIps else error: ", error.message);
        NotificationManager.error(
            "Unknown Error",
            "",
            0,
            null,
            null,
            "filled"
        );
      }
    })
}