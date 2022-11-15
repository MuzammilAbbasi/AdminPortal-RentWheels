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
    processId: "",
    idOrCode: "",
    createdBy: "",
    opeartion: "",
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

    let baseURL = "";
    if (JSON.parse(sessionStorage.getItem('user')).permissions.filter(x => (x.name === 'makerApprove')).length > 0) {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.processMaker}${selectedPageSize}/${currentPage - 1}`;
    } else {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.processChecker}${selectedPageSize}/${currentPage - 1}`;
    }
    // const URL =
    //     `${baseURL}${JSON.parse(sessionStorage.getItem('user')).institution.value}/${selectedPageSize}/${currentPage - 1}/${sortColumn}/${isAsce}`;

    console.log("getAll url: ", baseURL);
    // console.log("getAll search criteria: ", searchCriteria);
    // console.log("getAll orderBy: ", orderBy);

    // axios.post(URL, { ...searchCriteria }, getHeaders())
    console.log(searchCriteria);
    axios.get(baseURL, getHeaders())
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

    console.log("In Add user : ")
    console.log(body);

    let baseURL = "";
    let payload = {};

    let notificationHeading = "";
    let notificationMessage = "";

    if (JSON.parse(sessionStorage.getItem('user')).permissions.filter(x => (x.name === 'makerApprove')).length > 0) {
        
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.addUserReviewMaker}`;

        const { institution } = JSON.parse(
            sessionStorage.getItem("user")
        );

        payload = {
            cnic: body.cnic,
            email: body.email,
            userId: body.idOrCode,
            institution: institution.value === "00" ? body.institution.value : institution.value,
            isaccepted: body.isaccepted,
            mobileNo: body.mobileNo,
            name: body.nameOrDescr,
            processId: body.processId,
            reason: body.reason,
            role: body.role.value,
            userStatus: body.userStatus.value,
            department: body.department,
            designation: body.designation,
            empNumber: body.empNumber,
            remarks: body.remarks
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Request sent to Checker" : "Process has been discarded";

    } else {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.addUserReviewChecker}`;
        payload = {
            processid: body.processId,
            isaccepted: body.isaccepted,
            reason: body.reason,
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "User created successfully" : "Request sent to Maker";
    }
    console.log('addUser url: ', baseURL);
    console.log('addUser body: ', payload);

    axios
        .post(baseURL, payload, getHeaders())
        .then(res => {
            console.log('addUser res: ', res);
            return res.data;
        })
        .then(data => {
            if ( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                notificationHeading,
                notificationMessage,
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            if( onSuccess ) onSuccess( data )
        }).catch((error) => {
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

    console.log("In editUser");
    console.log(body);

    let baseURL = "";
    let payload = {};

    let notificationHeading = "";
    let notificationMessage = "";

    if (JSON.parse(sessionStorage.getItem('user')).permissions.filter(x => (x.name === 'makerApprove')).length > 0) {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.editUserReviewMaker}`;
        const { institution } = JSON.parse(
            sessionStorage.getItem("user")
        );
        payload = {
            cnic: body.cnic,
            email: body.email,
            userId: body.idOrCode,
            institution: institution.value === "00" ? body.institution.value : institution.value,
            isaccepted: body.isaccepted,
            mobileNo: body.mobileNo,
            name: body.nameOrDescr,
            processId: body.processId,
            reason: body.reason,
            role: body.role.value,
            userStatus: body.userStatus.value,
            department: body.department,
            designation: body.designation,
            empNumber: body.empNumber,
            remarks: body.remarks
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Request sent to Checker" : "Process has been discarded";
        
    } else {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.editUserReviewChecker}`;
        payload = {
            processid: body.processId,
            isaccepted: body.isaccepted,
            reason: body.reason,
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "User modified successfully" : "Request sent to Maker";
    }
    console.log('editUser url: ', baseURL);
    console.log('editUser body: ', payload);

    axios
        .post(baseURL, payload, getHeaders())
        .then(res => {
            console.log('editUser res: ', res);
            return res.data;
        })
        .then(data => {
            if ( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                notificationHeading,
                notificationMessage,
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            onSuccess( data )
        }).catch((error) => {
            onFailure( error )
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

    let baseURL = "";
    let payload = {};
    
    let notificationHeading = "";
    let notificationMessage = "";

    if (JSON.parse(sessionStorage.getItem('user')).permissions.filter(x => (x.name === 'makerApprove')).length > 0) {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.addRoleReviewMaker}`;
        const { institution } = JSON.parse(
            sessionStorage.getItem("user")
        );
        payload = {
            isaccepted: body.isaccepted,
            processId: body.processId,
            reason: body.reason,
            code: body.idOrCode,
            descr: body.nameOrDescr,
            permissions: body.permissions.map(function (item) {
                return item['id'];
            }),
            institution: institution.value === "00" ? body.institution.value : institution.value,
            roleStatus: body.roleStatus.value,
        };
        
        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Request sent to Checker" : "Process has been discarded";

    } else {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.addRoleReviewChecker}`;
        payload = {
            processid: body.processId,
            isaccepted: body.isaccepted,
            reason: body.reason,
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Role created successfully" : "Request sent to Maker";
    }
    console.log('addRole url: ', baseURL);
    console.log('addRole body: ', payload);

    axios
        .post(baseURL, payload, getHeaders())
        .then(res => {
            console.log('addRole res: ', res);
            return res.data;
        })
        .then(data => {
            if ( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                notificationHeading,
                notificationMessage,
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

    let baseURL = "";
    let payload = {};

    let notificationHeading = "";
    let notificationMessage = "";

    if (JSON.parse(sessionStorage.getItem('user')).permissions.filter(x => (x.name === 'makerApprove')).length > 0) {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.editRoleReviewMaker}`;
        const { institution } = JSON.parse(
            sessionStorage.getItem("user")
        );
        payload = {
            isaccepted: body.isaccepted,
            processId: body.processId,
            reason: body.reason,
            code: body.idOrCode,
            descr: body.nameOrDescr,
            permissions: body.permissions.map(function (item) {
                return item['id'];
            }),
            institution: institution.value === "00" ? body.institution.value : institution.value,
            roleStatus: body.roleStatus.value,
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Request sent to Checker" : "Process has been discarded";

    } else {
        baseURL = `${config.url.backoffice}${config.endpoint.backoffice.editRoleReviewChecker}`;
        payload = {
            processid: body.processId,
            isaccepted: body.isaccepted,
            reason: body.reason,
        };

        notificationHeading = body.isaccepted ? "Success" : "Request Rejected";
        notificationMessage = body.isaccepted ? "Role modified successfully" : "Request sent to Maker";
    }
    console.log('editRole url: ', baseURL);
    console.log('editRole body: ', payload);

    axios
        .post(baseURL, payload, getHeaders())
        .then(res => {
            console.log('editRole res: ', res);
            return res.data;
        })
        .then(data => {
            if ( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                notificationHeading,
                notificationMessage,
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

