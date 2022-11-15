import axios from 'axios'
import md5 from 'md5';
import config from "../../config"
import { NotificationManager } from "../../components/common/react-notifications";
import { getHeaders } from '../../constants/requestHeaders';

export const login = (body, onSuccess, onFailure) => {

  let body1 = {
    userId: body.userId,
    password: md5(body.password)
  };
  console.log(`${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.login}`,"login")
  const url = `${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.login}`;
  //  "https://staging.nbp.p.azurewebsites.net/Login";
  //  "https://ehsaas-mpos.paysyslabs.com/backoffice/user/login/";
  return axios
    .post(url, body1)
    .then(res => {
      onSuccess(res);
    }).catch((error) => {
      onFailure(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('getAll error.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);

        NotificationManager.error(
          error.response.data.message,
          error.response.status,
          0,
          null,
          null,
          "filled"
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('getAll error.request: ', error.request);
        NotificationManager.error(
          "ERR_CONNECTION_REFUSED",
          "",
          0,
          null,
          null,
          "filled"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('getAll else error: ', error.message);
        NotificationManager.error(
          "Unknown Error",
          "",
          0,
          null,
          null,
          "filled"
        );
      }

    });
}

export const logout = (onSubmit) => {

  const url =
    `${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.logout}`;
  return axios
    .get(url, getHeaders())
    .then(res => {
      onSubmit(res);
    }).catch((error) => {
      onSubmit(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('getAll error.response: ', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.data.message);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('getAll error.request: ', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('getAll else error: ', error.message);
      }
    });
}
