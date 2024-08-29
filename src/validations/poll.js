import { isEmpty } from "../helpers/common";

const createPollValidation = (payload) => {
    try {
        console.log(payload)
        let errors = {};

        if (isEmpty(payload.question)) {
            errors.question = "Question is required";
        }

        // options are array of object, object containing text as key, validate each option is required
        payload.options.forEach((option, index) => {
            if (isEmpty(option.text)) {
                errors[`option${index}`] = "Option is required";
            }
        });

        if (isEmpty(payload.options)) {
            errors.options = "Options is required";
        }

        return { errors, isValid: isEmpty(errors) };
    } catch (error) {
        return { errors: error, isValid: false };
    }
};

export {
    createPollValidation
}