import { getAPIResponseError } from '../helpers/common';
import api from './api.service';
import { clearToken, saveToken } from './../helpers/auth_token';
import { jwtDecode } from 'jwt-decode'
import { deleteAllLocalData, saveUserDetails } from '../helpers/localstorage';


const creatorRegister = async (payload) => {
    try {
        let res = await api.post('/creators/auth/register', payload);
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}
const creatorLogin = async (payload) => {
    try {
        let res = await api.post('/creators/auth/login', payload)
        console.log(res.data);
        setLoginToken(res.data.data)
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const setLoginToken = (data) => {
    saveToken(data);
    const decoded = jwtDecode(data)
    console.log(decoded);
    saveUserDetails(decoded)
}

const creatorForgetPassword = async (data) => {
    try {
        let res = await api.post('/creators/auth/forget-password', data);
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const creatorResetPassword = async (payload) => {
    try {
        let res = await api.post('/creators/auth/reset-password', payload)
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const logout = () => {
    clearToken();
    deleteAllLocalData();
}

export {
    creatorRegister,
    creatorLogin,
    creatorForgetPassword,
    creatorResetPassword,
    logout,
}
