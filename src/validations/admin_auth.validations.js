const { isEmpty } = require("../helpers/common");

const adminLoginValidation = (payload) => {
    try {
        let errors = {};

        if (isEmpty(payload.username)) {
            errors.username = "username is required";
        }

        if (isEmpty(payload.password)) {
            errors.password = 'password is required'
        }

        return { errors, isValid: isEmpty(errors) }
    } catch (e) {
        return { errors: e, isValid: false }
    }
}

export {
    adminLoginValidation
}