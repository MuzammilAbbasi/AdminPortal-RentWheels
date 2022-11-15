import axios from "axios";
import { NotificationManager } from "../../../../components/common/react-notifications";
import config from '../../../../config';

export function getAll(selectedPageSize, currentPage, selectedOrderOption, search, setData, setErrorData) {

    const url = search === '' ?
        `${config.url.backoffice}${config.endpoint.backoffice.institution}${selectedPageSize}/${currentPage - 1}/${selectedOrderOption.column}`
        : `${config.url.backoffice}${config.endpoint.backoffice.institution}${selectedPageSize}/${currentPage - 1}/${selectedOrderOption.column}/${search}`;
    console.log('getAll url: ', url);
    axios
        .get(url)
        .then(res => {
            console.log('getAll res: ', res);
            return res.data;
        })
        .then(data => {
            setData(data);
        }).catch((error) => {
            setErrorData();
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

export function addInstitution(body, onSuccess, onFailure) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.institution}`;
    console.log('addInstitution url: ', url);
    console.log('addInstitution body: ', body);

    axios
        .post(url, body)
        .then(res => {
            console.log('addInstitution res: ', res);
            return res.data;
        })
        .then(data => {
            if( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                "Success",
                "Add Institution Successfully",
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
              }, 2000);
            
        }).catch((error) => {
            if ( onFailure ) onFailure( error )
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('addInstitution error.response: ', error.response);
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
                console.log('addInstitution error.request: ', error.request);
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
                console.log('addInstitution else error: ', error.message);
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

export function editInstitution(body, onSuccess, onFailure) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.institution}`;
    console.log('editInstitution url: ', url);
    console.log('editInstitution body: ', body);

    axios
        .put(url, body)
        .then(res => {
            console.log('editInstitution res: ', res);
            return res.data;
        })
        .then(data => {
            if ( onSuccess ) onSuccess( data )
            NotificationManager.primary(
                "Success",
                "Update Institution Successfully",
                0,
                null,
                null,
                "filled"
            );
            setTimeout(() => {
                window.location.reload();
              }, 2000);
        }).catch((error) => {
            if ( onFailure ) onFailure( error )
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('editInstitution error.response: ', error.response);
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
                console.log('editInstitution error.request: ', error.request);
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
                console.log('editInstitution else error: ', error.message);
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

export function batchUpdateInstitutionStatus(body) {

    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.institution}${config.endpoint.backoffice.batch}`;
    console.log('batchUpdateInstitutionStatus url: ', url);
    console.log('batchUpdateInstitutionStatus body: ', body);

    axios
        .put(url, body)
        .then(res => {
            console.log('batchUpdateInstitutionStatus res: ', res);
            return res.data;
        })
        .then(data => {
            NotificationManager.primary(
                "Success",
                "Update All Selected Institutions Successfully",
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
                console.log('batchUpdateInstitutionStatus error.response: ', error.response);
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
                console.log('batchUpdateInstitutionStatus error.request: ', error.request);
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
                console.log('batchUpdateInstitutionStatus else error: ', error.message);
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