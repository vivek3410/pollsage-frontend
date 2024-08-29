import { getAPIResponseError } from "../../helpers/common"
import api from "../api.service";

const url = '/creators'
const createPoll = async (data) => {
    try {
        delete data.theme;
        let res = await api.post(`${url}/polls`, data)
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const getListOfPolls = async (page, limit) => {
    try {
        let res = await api.get(`${url}/polls?limit=${limit}&page=${page}`)
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const deletePoll = async (pollId) => {
    try {
        let res = await api.delete(`${url}/polls/${pollId}`);
        return res.data
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const getPollByPollId = async (pollId) => {
    try {
        let res = await api.get(`${url}/polls/${pollId}`)
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const updatePoll = async (pollId, payload) => {
    try {
        let res = await api.put(`${url}/polls/${pollId}`, payload)
        console.log(res);
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

const getPollResult = async (pollId) => {
    try {
        let res = await api.get(`${url}/polls/result/${pollId}`);
        return res.data;
    } catch (e) {
        throw getAPIResponseError(e)
    }
}

export {
    createPoll,
    getListOfPolls,
    getPollByPollId,
    getPollResult,
    updatePoll,
    deletePoll,
}