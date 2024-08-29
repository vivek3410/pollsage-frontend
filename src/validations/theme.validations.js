const { isEmpty } = require("../helpers/common");

const createThemeValidation = (payload) => {
    try {
        let errors = {};
        if (isEmpty(String(payload.theme_name))) {
            errors.theme_name = 'theme name is required';
        }
        // if (isEmpty(payload.colors.pollContainerBackgroundColor)) {
        //     errors.pollContainerBackgroundColor = 'poll container background color is required';
        // }

        // if (isEmpty(payload.colors.pollContainerBackgroundColor)) {
        //     errors.pollContainerBackgroundColor = 'poll container background color is required';
        // }
        // if (isEmpty(payload.colors.pollBoxBackgroundColor)) {
        //     errors.pollBoxBackgroundColor = 'poll box background color is required';
        // } if (isEmpty(payload.colors.pollQuestionColor)) {
        //     errors.pollQuestionColor = 'poll question color is required';
        // } if (isEmpty(payload.colors.formLabelColor)) {
        //     errors.formLabelColor = 'Form label color is required';
        // } if (isEmpty(payload.colors.pollOptionsLabelColor)) {
        //     errors.pollOptionsLabelColor = 'poll option label color is required';
        // }
        // if (isEmpty(payload.colors.pollOptionsInputColor)) {
        //     errors.pollOptionsInputColor = 'poll option input color is required';
        // } if (isEmpty(payload.colors.pollOptionsCheckedColor)) {
        //     errors.pollOptionsCheckedColor = 'poll option checked color is required';
        // } if (isEmpty(payload.colors.voteButtonBackgroundColor)) {
        //     errors.voteButtonBackgroundColor = 'vote button background color is required';
        // } if (isEmpty(payload.colors.inputFieldPlaceholderColor)) {
        //     errors.inputFieldPlaceholderColor = 'input field placeholder color color is required';
        // } if (isEmpty(payload.colors.inputFieldColor)) {
        //     errors.inputFieldColor = 'input field color is required';
        // }
        // if (isEmpty(payload.colors.commentNameColor)) {
        //     errors.commentNameColor = 'comment name color is required';
        // } if (isEmpty(payload.colors.commentTextColor)) {
        //     errors.commentTextColor = 'comment text color is required';
        // }

        return { errors, isValid: isEmpty(errors) }

    } catch (e) {
        return { errors: e, isValid: false }
    }
}

export {
    createThemeValidation
}