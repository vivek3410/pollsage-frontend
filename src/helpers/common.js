import moment from 'moment'
export function isEmpty(value) {
    if (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    ) {
        return true;
    } else return false;
}

export function isEmail(value) {
    var myRegEx =
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValid = myRegEx.test(value);
    return isValid ? true : false;
}

export const getAPIResponseError = (e) => {
    if (e) {
        // console.log("Server Error: ", e.response);
        if (e?.response?.status === 404) {
            return { code: 404, message: "URL Not Found" };
        }

        if (e.response && e.response.data) {
            let code = e.response.data?.status;
            let msg = e.response.data?.message;
            console.log(msg);
            if (e.response.data.message) {
                return { code, msg }
            }
        }
    }
    return;
}

export const formattedDateFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
};

export const generateUUID = () => {
    const array = new Uint32Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (num) => num.toString(36)).join('')
}