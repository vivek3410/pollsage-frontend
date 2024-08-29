const { jwtDecode } = require("jwt-decode");
const { saveToken, clearToken } = require("../helpers/auth_token");
const { getAPIResponseError } = require("../helpers/common")
const { default: api } = require("./api.service");
const { saveUserDetails, deleteAllLocalData } = require("../helpers/localstorage");

const adminLogin = async (payload) => {
    try {
        let res = await api.post('/admin/auth/login', payload);
        setLoginToken(res.data.data)
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const logout = () => {
    clearToken();
    deleteAllLocalData();
}

const setLoginToken = (data) => {
    saveToken(data.token);
    const decoded = jwtDecode(data.token)
    saveUserDetails(decoded)
}

export {
    adminLogin,
    logout,
}