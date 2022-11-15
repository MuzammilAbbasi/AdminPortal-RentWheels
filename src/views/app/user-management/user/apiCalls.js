import axios from "axios";
import { NotificationManager } from "../../../../components/common/react-notifications";
import config from '../../../../config';
import { getHeaders } from '../../../../constants/requestHeaders';

const defaultPageSize = 10;
const defaultPageNumber = 1;

const defaultOrderBy = {
    column: "createdDateTime",
    asec: true,
};

const defaultSearchCriteria = {
    userId: "",
    name: "",
    cnic: "",
    mobileNo: "",
    email: "",
    role: "",
    userStatus: "",
};

export function getAll(
    selectedPageSize = defaultPageSize,
    currentPage = defaultPageNumber,
    orderBy = defaultOrderBy,
    searchCriteria = defaultSearchCriteria,
    onSuccess,
    onFailure
) {

    const { column: sortColumn, asec: isAsce } = orderBy;

    const baseURL = `${config.url.backoffice}${config.endpoint.backoffice.user}`;
    const URL =
        `${baseURL}${JSON.parse(sessionStorage.getItem('user')).institution.value}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

    console.log("getAll url: ", URL);
    console.log("getAll search criteria: ", searchCriteria);
    console.log("getAll orderBy: ", orderBy);

    axios.post(URL, { ...searchCriteria }, getHeaders())
        .then(res => {
            console.log('getAll res: ', res);
            return res.data;
        })
        .then(data => {
            onSuccess(data);
        }).catch((error) => {
            onFailure();
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('getAll error.response: ', error.response);
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
                console.log('getAll error.request: ', error.request);
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
                console.log('getAll else error: ', error.message);
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

export function getInstitutionsList(setInstitutionsList) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.institution}${config.endpoint.backoffice.list}`;
    console.log('getInstitutionsList url: ', url);

    axios
        .get(url, getHeaders())
        .then(res => {
            console.log('getInstitutionsList res: ', res);
            return res.data;
        })
        .then(data => {
            setInstitutionsList(data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('getInstitutionsList error.response: ', error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.data.message);
                console.log(error.response.headers);

                NotificationManager.secondary(
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
                console.log('getInstitutionsList error.request: ', error.request);
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
                console.log('getInstitutionsList else error: ', error.message);
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

export function getRolesList(setRolesList, institution) {

    let url = `${config.url.backoffice}${config.endpoint.backoffice.role}${config.endpoint.backoffice.list}`;

    url += institution ? institution.value : `${JSON.parse(sessionStorage.getItem('user')).institution.value}`;

    console.log('getRolesList url: ', url);

    axios
        .get(url, getHeaders())
        .then(res => {
            console.log('getRolesList res: ', res);
            return res.data;
        })
        .then(data => {
            setRolesList(data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('getRolesList error.response: ', error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.data.message);
                console.log(error.response.headers);

                NotificationManager.secondary(
                    error.response.data.message,
                    error.response.status,
                    0,
                    null,
                    null,
                    "filled"
                );
                setRolesList([]);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('getRolesList error.request: ', error.request);
                NotificationManager.error(
                    "ERR_CONNECTION_REFUSED",
                    "",
                    0,
                    null,
                    null,
                    "filled"
                );
                setRolesList([]);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('getRolesList else error: ', error.message);
                NotificationManager.error(
                    "Unknown Error",
                    "",
                    0,
                    null,
                    null,
                    "filled"
                );
                setRolesList([]);
            }
        });
}

export function addUser(body, onSuccess, onFailure) {

    console.log(body);

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.user}`;
    console.log('addUser url: ', url);
    console.log('addUser body: ', body);

    axios
        .post(url, body, getHeaders())
        .then(res => {
            console.log('addUser res: ', res);
            return res.data;
        })
        .then(data => {
            onSuccess( data )
            NotificationManager.primary(
                "Success",
                "Request has been initiated",
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            if (onSuccess) onSuccess( data )

        }).catch((error) => {
            onFailure( error )
            
            if ( onFailure ) onFailure( error )

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('addUser error.response: ', error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.data.message);
                console.log(error.response.headers);

                NotificationManager.secondary(
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
                console.log('addUser error.request: ', error.request);
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
                console.log('addUser else error: ', error.message);
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

export function editUser(body, onSuccess, onFailure) {

    console.log("Inside the editUser of user");

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.user}`;
    console.log('editUser url: ', url);
    console.log('editUser body: ', body);

    axios
        .put(url, body, getHeaders())
        .then(res => {
            console.log('editUser res: ', res);
            return res.data;
        })
        .then(data => {
            onSuccess( data )
            NotificationManager.primary(
                "Success",
                "Request has been initiated",
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            if ( onSuccess ) onSuccess( data )
        }).catch((error) => {
            onFailure( error )
            if( onFailure ) onFailure( error )
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('editUser error.response: ', error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.data.message);
                console.log(error.response.headers);

                NotificationManager.secondary(
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
                console.log('editUser error.request: ', error.request);
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
                console.log('editUser else error: ', error.message);
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

export function batchUpdateUserStatus(body) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.batch}`;
    console.log('batchUpdateUserStatus url: ', url);
    console.log('batchUpdateUserStatus body: ', body);

    axios
        .put(url, body, getHeaders())
        .then(res => {
            console.log('batchUpdateUserStatus res: ', res);
            return res.data;
        })
        .then(data => {
            NotificationManager.primary(
                "Success",
                "Update All Selected User Successfully",
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('batchUpdateUserStatus error.response: ', error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.data.message);
                console.log(error.response.headers);

                NotificationManager.secondary(
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
                console.log('batchUpdateUserStatus error.request: ', error.request);
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
                console.log('batchUpdateUserStatus else error: ', error.message);
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