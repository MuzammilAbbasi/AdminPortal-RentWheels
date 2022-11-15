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

const defaultSearchCriteria = {
  username: "",
  status: "",
  fromAccount: "",
  stan: "",
  mobileNo: "",
  toBank: "",
  rrn: "",
  companyName: "",
};

export function getVirtualCardData(payload, onSuccess, onFailure) {
  const baseURL = config.url.ib_backoffice;
  console.log("baseURL ==>", baseURL);
  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.virtualCardDetails}`;
  console.log("baseURL1 ==>", URL);
  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const { data } = res.data;
      console.log("Response ==> ", res);
      if (res.data.status === 200) {
        let notification = NotificationManager.success(
          res.data.message,
          res.data.status,
          3000,
          null,
          null,
          "filled"
        );
        // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
        onSuccess(data);
      }
      let notification = NotificationManager.error(
        res.data.message,
        res.data.status,
        3000,
        null,
        null,
        "filled"
      );
      onFailure();
    })
    .catch((error) => {
      console.log(error, "Error...");
      onFailure();
      if (error.data) {
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
        // console.log("getDataAgainstCnic error.request: ", error.request);
        NotificationManager.error(
          error.response.data.message,
          error.response.status,
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

export function TemporaryAppBlock(
  payload,
  onSuccess,
  onFailure
) {
  // console.log(
  //   "url",
  //   // `${config.url.rda}${config.endpoint.backoffice.get}/${cnic}/${userName}`
  // );
  const baseURL = config.url.ib_backoffice;
  console.log("baseURL ==>", baseURL);
  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.temporaryAppBlock}`;
  console.log("baseURL1 ==>", URL);
  // const URL = baseURL1
  axios
    // .post('http://localhost:8081/api/v1/CallCenter/getCustomerMobileDemographicDetail', payload,getHeaders())
    .post(URL, payload, getHeaders())
    .then((res) => {
      const accountnull = "";
      const { data } = res.data;

      if (data !== null) {
        if (res.data.status === 200) {
          let notification = NotificationManager.success(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
          onSuccess(data);
        } else {
          let notification = NotificationManager.error(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          onFailure();
        }
      } else {
        console.log("Errrrrrr Notify....");
        let notification = NotificationManager.error(
          res.data.message,
          res.data.status,
          3000,
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
      if (error.data) {
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
export function PermanentAppBlock(payload,onSuccess, onFailure) {
  console.log(payload);
  const baseURL = config.url.ib_backoffice;
  console.log("baseURL ==>", baseURL);
  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.permanentlyAppBlock}`;
  console.log("baseURL1 ==>", URL);
  // const URL = baseURL1
  axios
    // .post('http://localhost:8081/api/v1/CallCenter/getCustomerMobileDemographicDetail', payload,getHeaders())
    .post(URL, payload, getHeaders())
    .then((res) => {
      // const accountnull = "";
      const { data } = res.data;
      console.log("DAta =>> ", data);
      if (data !== null) {
        // cnic=data.cnic
        // cnic = cnic.substring(0, 5) + "-" + cnic.substring(5,12)+ "-" + cnic.substring(12, cnic.length);
        // data.cnic = cnic
        // res = {...res,cnic}
        // if(data?.account === null){
        //   data.account = accountnull
        //   res = {...res, account}

        // }
        if (res.data.status === 200) {
          let notification = NotificationManager.success(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
          onSuccess(res.data);
        } else {
          let notification = NotificationManager.error(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          onFailure();
        }
      } else {
        console.log("Errrrrrr Notify....");
        let notification = NotificationManager.error(
          res.data.message,
          res.data.status,
          3000,
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
      if (error.data) {
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
export function ActivitateMobileApp(payload,onSuccess, onFailure) {
  console.log(payload);
  const baseURL = config.url.ib_backoffice;
  console.log("baseURL ==>", baseURL);
  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.ActivitateMobileApp}`;
  console.log("baseURL1 ==>", URL);
  // const URL = baseURL1
  axios
    // .post('http://localhost:8081/api/v1/CallCenter/getCustomerMobileDemographicDetail', payload,getHeaders())
    .post(URL, payload, getHeaders())
    .then((res) => {
      // const accountnull = "";
      const { data } = res.data;
      console.log("DAta =>> ", data);
      if (data !== null) {
        // cnic=data.cnic
        // cnic = cnic.substring(0, 5) + "-" + cnic.substring(5,12)+ "-" + cnic.substring(12, cnic.length);
        // data.cnic = cnic
        // res = {...res,cnic}
        // if(data?.account === null){
        //   data.account = accountnull
        //   res = {...res, account}

        // }
        if (res.data.status === 200) {
          let notification = NotificationManager.success(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          // console.log(`onSuccess Passing : ${JSON.stringify({cnic:cnic,...res.data})}`)
          onSuccess(res.data);
        } else {
          let notification = NotificationManager.error(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          onFailure();
        }
      } else {
        console.log("Errrrrrr Notify....");
        let notification = NotificationManager.error(
          res.data.message,
          res.data.status,
          3000,
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
      if (error.data) {
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

export function EditProfileSync(
  cnic,
  username,
  email,
  account,
  onSuccess,
  onFailure
) {
  // const Cnic = cnic.replace('-','').replace('-','');
  // console.log(
  //   "url",
  //   // `${config.url.rda}${config.endpoint.backoffice.get}/${cnic}/${userName}`
  // );
  const payload = {
    cnic: cnic,
    username: username,
    email: email,
    accountNumber: account,
  };

  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.callCentreDemographicEdit}`;
  console.log(URL);
  // const URL = baseURL1
  axios
    .post(URL, payload, getHeaders())
    .then((res) => {
      const accountnull = "";
      console.log("DATA RES",res)
      const { data, status, message } = res.data;
      console.log("Response ==> ", res);
      if (status == "200") {
        let notification = NotificationManager.success(
          res.data.message,
          res.data.status,
          3000,
          null,
          null,
          "filled"
        );
        console.log(`onSuccess Passing : ${data}`);
        onSuccess(data);
      } else{
        let notification = NotificationManager.error(
          "Unable To Process",
          res?.data?.status,
          3000,
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
      if (error.data) {
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
export function getDataAgainstCnicAndUsername(
  cnic,
  username,
  startingDate,
  endingDate,
  account,
  onSuccess,
  onFailure
) {
  const Cnic = cnic.replace("-", "").replace("-", "");
  // console.log(
  //   "url",
  //   // `${config.url.rda}${config.endpoint.backoffice.get}/${cnic}/${userName}`
  // );
  const payload = {
    cnic: Cnic,
    username: username,
    startingDate: startingDate,
    endingDate: endingDate,
    account: account,
  };
  const baseURL = config.url.ib_backoffice;

  const URL = `${baseURL}${config.endpoint.backoffice_ib.callCenter.customerMobileDemographicDetail}`;

  // const URL = baseURL1
  axios
    // .post('http://localhost:8081/api/v1/CallCenter/getCustomerMobileDemographicDetail', payload,getHeaders())
    .post(URL, payload, getHeaders())
    .then((res) => {
      const accountnull = "";
      const { data, status, message } = res.data;
      console.log(data);
      if (status == "200") {
        console.log("Customer data =>> ", data);
        const Data = data.customer_relation;
        const userDisabled = data.userDisabled;

        const customer_relation = { ...Data, userDisabled };

        console.log("res ==> ", customer_relation);

        let notification = NotificationManager.success(
          res.data.message,
          res.data.status,
          3000,
          null,
          null,
          "filled"
        );
        console.log("onSuccess Passing : ", customer_relation);
        onSuccess(customer_relation);
      } else if (status == "400"){
        let notification = NotificationManager.error(
          "Data Not Found",
          status,
          3000,
          null,
          null,
          "filled"
        );
        onFailure();
      }
       else {
        let notification = NotificationManager.error(
          "Data Not Found",
          status,
          3000,
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
      if (error.data) {
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

export function fetchIps(
  pageSize = defaultPageSize,
  currentPage = defaultPageNumber,
  orderBy = defaultOrderBy,
  isAsc = defaultisAsc,
  searchCriteria = defaultSearchCriteria,
  startingDate,
  endingDate,
  onSuccess,
  onFailure
) {
  // const { column: sortColumn, asec: isAsce } = orderBy;
  console.log("startingDate =>> ", startingDate, " endingDate =>>", endingDate);
  // const baseURL = config.url.rda + config.endpoint.rda.ips;
  if (currentPage === 0 || Number.isNaN(currentPage)) {
    currentPage = 1;
  }
  const baseURL = config.url.ib_backoffice;
  console.log("baseURL1 ==>", baseURL);
  const baseURL1 = `${baseURL}${config.endpoint.backoffice_ib.callCenter.customerMobileActivityTab}`;
  const URL = baseURL1;

  const payload = {
    pageSize: pageSize,
    currentPage: currentPage - 1,
    orderBy: orderBy,
    isAsc: isAsc,
    filterCriteria: searchCriteria,
    startDate: startingDate,
    endDate: endingDate,
  };

  // const URL = `${baseURL}?${pageSize}?${
  //   currentPage
  // }?${orderBy}?${isAsc}`;

  // console.log("fetchIps url: ", URL);
  // // console.log("fetchIps search criteria: ", searchCriteria);
  // console.log("fetchIps selected page size: ",pageSize);
  // console.log("fetchIps current page: ", currentPage);
  // console.log("fetchIps isAsc: ", isAsc);
  // console.log("fetchIps order by: ", orderBy);

  // .post(URL, { ...searchCriteria })
  return axios
    .post(URL, { ...payload }, getHeaders())
    .then((res) => {
      const { data } = res.data;
      if (data !== null) {
        if (res.data.status === 200) {
          // let notification= NotificationManager.success(
          //   res.data.message,
          //   res.data.status,
          //   3000,
          //   null,
          //   null,
          //   "filled"
          // );
          // console.log(data)
          onSuccess(data);
        } else {
          // console.log("NOT GET")
          let notification = NotificationManager.error(
            res.data.message,
            res.data.status,
            3000,
            null,
            null,
            "filled"
          );
          onFailure();
        }
      } else {
        // console.log("NOT GET")
        console.log("Errrrrrr Notify....");
        console.log(res.data.message);
        let notification = NotificationManager.error(
          res.data.message,
          res.data.status,
          3000,
          null,
          null,
          "filled"
        );
        onFailure();
      }
    })
    .catch((error) => {
      // console.log("NOT GET")
      onFailure();
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("fetchIps error.response: ", error.response);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.data.message);
        // console.log(error.response.headers);

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
        // console.log("NOT GET")
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

  return axios
    .put(url, modifiedIps)
    .then((res) => {
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
