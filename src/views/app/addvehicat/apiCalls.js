import axios from "axios";

export const adddvehiclecategory = (
  vehicleCat,
  categoryPic,
  onSuccess,
  onFailure
) => {
  let body = {
    vehicleType: vehicleCat,
    file: categoryPic,
  };
  // console.log(
  //   `${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.login}`,
  //   "login"
  // );
  const url = "http://localhost:8000/api/v1/vehicles/vehiclecategory"; //`${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.login}`;
  //  "https://staging.nbp.p.azurewebsites.net/Login";
  //  "https://ehsaas-mpos.paysyslabs.com/backoffice/user/login/";
  // const instance = axios.create({
  //   withCredentials: true,
  // });
  return axios
    .post(url, body)
    .then((res) => {
      console.log(res);
      onSuccess(res);
    })
    .catch((error) => {
      onFailure(error);
    });
};
