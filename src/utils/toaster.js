import { isEmpty } from './../helpers/common';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


let globalOptions = {
    position: "bottom-center",
    autoClose: 5000, // 5 seconds
    hideProgressBar: false,
    closeOnClick: true || false,
    pauseOnHover: true || false,
    draggable: true || false,
    theme: "light",
}

export const successToast = (message = '', options = globalOptions) => {
    if (isEmpty(message)) return;
    dismissToast();
    return toast.success(message, options)
}

export const errorToast = (message = '', options = globalOptions) => {
    if (isEmpty(message)) return;
    dismissToast();
    return toast.error(message, options)
}

export const dismissToast = (id = null) => {
    toast.dismiss(id && id);
}

export const loadingToast = (message = '', options = globalOptions) => {
    if (isEmpty(message)) return;
    dismissToast();
    return toast.loading(message, options);
};