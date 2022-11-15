
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
} from '../actions';

import {
    loginUserSuccess,
    loginUserError,
    registerUserSuccess,
    registerUserError,
    forgotPasswordSuccess,
    forgotPasswordError,
    resetPasswordSuccess,
    resetPasswordError
} from './actions';

import axios from "axios";
import config from '../../config';

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithUserIdPassword);
}

const loginWithUserIdPasswordAsync = async (userId, password) => {
    const url =
        `${config.url.backoffice}${config.endpoint.backoffice.user}${config.endpoint.backoffice.login}${userId}/${password}`;
    console.log('url: ', url);

    return axios
        .get(url)
        .then(res => {
            console.log('res: ', res);
            return res;
        }).catch((error) => {
            return error;
        });

}

function* loginWithUserIdPassword({ payload }) {
    const { userId, password } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(loginWithUserIdPasswordAsync, userId, password);
        console.log('loginUser: ', loginUser);
        if (loginUser.data) {
            sessionStorage.setItem('user', JSON.stringify(loginUser.data));
            yield put(loginUserSuccess(loginUser.data));
            history.push('/');
        } else {

            if (loginUser.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('loginUser.response: ', loginUser.response);
                console.log(loginUser.response.data);
                console.log(loginUser.response.status);
                console.log(loginUser.response.data.message);
                console.log(loginUser.response.headers);

                yield put(loginUserError(loginUser.response.data.message));

            } else if (loginUser.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('error.request: ', loginUser.request);
                yield put(loginUserError("ERR_CONNECTION_REFUSED"));
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('else error: ', loginUser.message);
                yield put(loginUserError("Unknown Error"));
            }
        }
    } catch (error) {
        yield put(loginUserError(error));

    }
}


export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
    history.push('/')
}

function* logout({ payload }) {
    const { history } = payload
    try {
        yield call(logoutAsync, history);
        sessionStorage.removeItem('userId');
    } catch (error) {
    }
}
export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
    ]);
}