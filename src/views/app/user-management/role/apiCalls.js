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
    code: "",
    descr: "",
    institution: "",
    status: "",
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

    const baseURL = `${config.url.backoffice}${config.endpoint.backoffice.role}`;
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

export function getPermissions(setPermissions, institution) {

    let url = `${config.url.backoffice}${config.endpoint.backoffice.permission}`;

    url += institution ? institution.value : `${JSON.parse(sessionStorage.getItem('user')).institution.value}`;

    console.log('getPermissions url: ', url);

    axios
        .get(url, getHeaders())
        .then(res => {
            console.log('getPermissions res: ', res);
            return res.data;
        })
        .then(data => {
            setPermissions(data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('getPermissions error.response: ', error.response);
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
                setPermissions([]);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('getPermissions error.request: ', error.request);
                NotificationManager.error(
                    "ERR_CONNECTION_REFUSED",
                    "",
                    0,
                    null,
                    null,
                    "filled"
                );
                setPermissions([]);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('getPermissions else error: ', error.message);
                NotificationManager.error(
                    "Unknown Error",
                    "",
                    0,
                    null,
                    null,
                    "filled"
                );
                setPermissions([]);
            }
        });
}

export function addRole(body, onSuccess, onFailure) {

    console.log("In Add role");

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.role}`;
    console.log('addRole url: ', url);
    console.log('addRole body: ', body);

    axios
        .post(url, body, getHeaders())
        .then(res => {
            console.log('addRole res: ', res);
            return res.data;
        })
        .then(data => {
            if( onSuccess ) onSuccess( data )
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
            if ( onFailure ) onFailure( error )
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('addRole error.response: ', error.response);
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
                console.log('addRole error.request: ', error.request);
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
                console.log('addRole else error: ', error.message);
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

export function editRole(body, onSuccess, onFailure) {

    console.log("In Edit Role");

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.role}`;
    console.log('editRole url: ', url);
    console.log('editRole body: ', body);

    axios
        .put(url, body, getHeaders())
        .then(res => {
            console.log('editRole res: ', res);
            return res.data;
        })
        .then(data => {
            if( onSuccess ) onSuccess( data )
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
            if ( onFailure ) onFailure( error )
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('editRole error.response: ', error.response);
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
                console.log('editRole error.request: ', error.request);
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
                console.log('editRole else error: ', error.message);
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

export function batchUpdateRoleStatus(body) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.role}${config.endpoint.backoffice.batch}`;
    console.log('batchUpdateRoleStatus url: ', url);
    console.log('batchUpdateRoleStatus body: ', body);

    axios
        .put(url, body, getHeaders())
        .then(res => {
            console.log('batchUpdateRoleStatus res: ', res);
            return res.data;
        })
        .then(data => {
            NotificationManager.primary(
                "Success",
                "Update All Selected Roles Successfully",
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
                console.log('batchUpdateRoleStatus error.response: ', error.response);
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
                console.log('batchUpdateRoleStatus error.request: ', error.request);
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
                console.log('batchUpdateRoleStatus else error: ', error.message);
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