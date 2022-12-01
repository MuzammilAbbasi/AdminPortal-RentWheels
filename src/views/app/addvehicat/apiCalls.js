import axios from "axios";

export const adddvehiclecategory = (
  vehicleCat,
  categoryPic,
  onSuccess,
  onFailure
) => {
  let formData = new FormData();

  formData.append('vehicleType',vehicleCat);
  formData.append('image',categoryPic);


  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
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
    .post(url, formData)
    .then((res) => {
      console.log(res);
      onSuccess(res);
    })
    .catch((error) => {
      onFailure(error);
    });
};
