import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../../utils/toaster';
import { creatorLoginValidation } from '../../../validations/creator_auth';
import { creatorLogin } from '../../../services/creator_auth.service';
import links from '../../../utils/nav_link';

export default function Login(props) {
    const navigate = useNavigate();
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [formData, setFromData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const onChangeFromData = (key, value) => {
        if (!key) return;

        setFromData({ ...formData, [key]: value })
    }

    const onLogin = async (e) => {
        try {
            e.preventDefault();
            const { isValid, errors } = creatorLoginValidation(formData);
            if (!isValid) {
                setErrors(errors);
                return;
            }

            setErrors({});

            let res = await creatorLogin(formData);
            if (res) {
                setFromData({
                    email: '',
                    password: ''
                })
                setRegisterSuccess(true);
                successToast("Login successful");
                props.setIsAuth(true);
                navigate('/creator/dashboard')
            }

        } catch (e) {
            errorToast(e.msg)
        }
    }
    return (
        <section className='bg-gray-100 py-20 lg:py-[80px]' style={{ height: '100vh' }}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-[525px">
                        <div className="text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px] shadow-lg">
                            <div className="mb-4 md:mb-8 text-center text-black">
                                <a href="/" className="inline-block max-w-[160px] mx-auto" >
                                    <h1 className="text-4xl font-bold">PollSage</h1>
                                </a>
                                <h1 className="text-lg mt-5">Login to your PollSage account</h1>
                            </div>
                            <form onSubmit={onLogin}>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder='Email'
                                        className={`w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color 
                                            placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary`}
                                        value={formData.email}
                                        onChange={(e) => onChangeFromData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 text-left italic">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder='Password'
                                        className={`w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color 
                                            placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary`}
                                        value={formData.password}
                                        onChange={(e) => onChangeFromData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1 text-left italic">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-10">
                                    <input type="submit" value={"Sign In"} className="bg-blue-600 w-full rounded-md border-primary py-3 px-5 text-base text-white cursor-pointer hover:bg-opacity-90" />
                                </div>
                            </form>
                            <Link to={'/forgot-password'} className='text-base inline-block mb-2 text-black hover:underline hover:text-primary'>Forgot Password?</Link>
                            <p className="text-base text-[#adadad]">Not a member yet? &nbsp;
                                <Link to={links.register} className='text-blue-500 hover:underline'>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
