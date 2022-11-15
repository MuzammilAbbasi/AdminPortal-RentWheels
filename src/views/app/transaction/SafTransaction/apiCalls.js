import axios from "axios";
import config from "../../../../config";
import { NotificationManager } from "components/common/react-notifications";
import { getHeaders } from "constants/requestHeaders";

export function fetchSafTransaction(
  payload,
  onSuccess,
  onFailure
){

  const baseURL = "http://localhost:8081/ib-backoffice/Transaction/SAFTransactionResult";
  const URL = baseURL
  console.log("fetchIps url: ", URL);

  return axios
    .post(URL, payload,getHeaders())
    .then((res) => {
      const {data} = res.data;
      console.log("fetchIps res: ", res);
      console.log("fetchIps res.data: ", data);
      let notification= NotificationManager.success(
        res.data.message,
        res.data.status,
        3000,
        null,
        null,
        "filled"
        );
      onSuccess(data);
      
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
      onFailure();
    })
}
export function fetchIps(
    onSuccess,
    onFailure
) {
  // const baseURL = config.url.rda + config.endpoint.rda.ips;
  const baseURL = "http://localhost:8081/api/v1/Transaction/getSafTransactionCompany";
  const URL = baseURL
  console.log("fetchIps url: ", URL);

  return axios
    .get(URL)
    .then((res) => {
      const {data} = res.data;
      console.log("fetchIps res: ", res);
      console.log("fetchIps res.data: ", data);
    if(res.data.status === 200){
        console.log(res.data.status,"in Null")
        // let notification= NotificationManager.success(
        // res.data.message,
        // res.data.status,
        // 3000,
        // null,
        // null,
        // "filled"
        // );
        onSuccess(data);
    }
    else{
        console.log("NOT GET")
        // let notification= NotificationManager.error(
        // res.data.message,
        // res.data.status,
        // 3000,
        // null,
        // null,
        // "filled"
        // );
        onFailure()
    }
    })
    .catch((error) => {
      console.log("NOT GET")
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
        // NotificationManager.error(
        //     "ERR_CONNECTION_REFUSED",
        //     "",
        //     3000,
        //     null,
        //     null,
        //     "filled"
        // );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("fetchIps else error: ", error.message);
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

export function updateIps(modifiedIps, onSuccess, onFailure) {
  const url = config.url.rda + config.endpoint.rda.updateRequest;

  console.log("updateIps url: ", url);
  console.log("updateIps modified ips: ", modifiedIps);

  return axios
    .put(url, modifiedIps)
    .then((res) => {
      console.log("updateIps res: ", res);
      return res.data;
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("updateIps error.response: ", error.response);
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
        console.log("updateIps error.request: ", error.request);
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
        console.log("updateIps else error: ", error.message);
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
