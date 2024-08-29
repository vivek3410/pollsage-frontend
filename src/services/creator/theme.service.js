import { getAPIResponseError } from "../../helpers/common"
import api from "../api.service"
const url = '/creators'

const createTheme = async (payload) => {
    try {
        let res = await api.post(`${url}/themes/`, payload)
        // console.log(res);
        return res.data
    } catch (e) {
        console.log("error: ", e);
        throw getAPIResponseError(e)
    }
}
const getAllThemesForForm = async () => {
    try {
        let res = await api.get(`${url}/themes/for-form`)
        console.log(res.data);
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

export {
    createTheme,
    getAllThemesForForm
}