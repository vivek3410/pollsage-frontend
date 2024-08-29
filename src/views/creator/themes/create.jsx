import React, { useEffect, useState } from 'react';
import PageDetails from '../../../components/_page_details';
import ThemeForm from './form';
import { useNavigate } from 'react-router-dom';
import { dismissToast, errorToast, loadingToast, successToast } from '../../../utils/toaster';
import { createThemeValidation } from '../../../validations/theme.validations';
import { createTheme } from '../../../services/creator/theme.service';
import ThemePreview from '../../../components/theme_preview';

export default function CreateTheme() {
    const navigate = useNavigate();

    const initialState = {
        theme_name: '',
        is_dark_theme: false,
        colors: {
            pollContainerBackgroundColor: null,
            pollBoxBackgroundColor: null,
            pollQuestionColor: null,
            formLabelColor: null,
            pollOptionsLabelColor: null,
            pollOptionsInputColor: null,
            pollOptionsCheckedColor: null,
            voteButtonBackgroundColor: null,
            inputFieldPlaceholderColor: null,
            inputFiledColor: null,
            commentNameColor: null,
            commentTextColor: null
        }
    }

    const [formData, setFormData] = useState(initialState);
    const [minPollEndDate, setMinPollEndDate] = useState(
        new Date().toISOString().slice(0, 16)
    )

    const [errors, setErrors] = useState({});

    const [booleanValue, setBooleanValue] = useState({
        showDescription: false,
        showPassword: true
    })

    const [isFormDirty, setIsFromDirty] = useState(false);
    const [step, setStep] = useState(1);

    // load themes from api
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormDirty) {
                e.preventDefault();
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [setIsFromDirty])

    const onChangeFormData = (key, value, color = null) => {
        if (!key) return;
        if (color) {
            setFormData((prevState) => {
                return {
                    ...prevState,
                    colors: {
                        ...prevState.colors,
                        [key]: value,
                    }
                }
            })
            return;
        }

        setFormData({ ...formData, [key]: value });
        setIsFromDirty(true)
    }

    const handleOptionChange = (index, value) => {
        setFormData((prevState) => {
            const updatedOptions = [...prevState.options];
            updatedOptions[index].text = value;
            return {
                ...prevState,
                options: updatedOptions
            }
        })
    }

    const addOption = (e) => {
        e.preventdefault();
        setFormData((prevState) => {
            return {
                ...prevState,
                options: [...prevState.options, { text: '' }]
            }
        })
    }

    const addOtherOption = (e) => {
        e.preventDefault();
        addOption(e);
        handleOptionChange(formData.options.length, 'Other')
    }

    const removeOption = (index) => {
        setFormData((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions.splice(index, 1);
            return {
                ...prev,
                options: updatedOptions
            }
        })
    }

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const { isValid, errors } = createThemeValidation(formData);
            if (!isValid) {
                setErrors(errors);
                return;
            }

            setErrors({})

            loadingToast('Creating Poll...');

            let res = await createTheme(formData)

            if (res) {
                setFormData(initialState);
                dismissToast();
                successToast("Theme created successfully");
                navigate('/creator/polls')
            }
        } catch (e) {
            dismissToast()
            errorToast(e.msg);
        }
    }

    const handleStepChange = (e, step) => {
        e.preventDefault();
        if (step === 2) {
            const { isValid, errors } = createThemeValidation(formData)
            if (!isValid) {
                setErrors(errors);
                return;
            } else {
                setErrors({})
            }
        }
        setStep(step)
    }


    return (
        <>
            <PageDetails title="Create Poll - PollSage" description="Create Poll" />
            <div className="mt-4 mx-4">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div>
                        <div className="flex flex-col gap-6 xl:flex-row mb-4">
                            <div className="w-full xl:w-1/2 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                                    <h3 className='font-medium text-black dark:text-white'>
                                        Create Theme
                                    </h3>
                                </div>
                                <ThemeForm
                                    formData={formData}
                                    errors={errors}
                                    onChangeFormData={onChangeFormData}
                                    onSubmit={onSubmit}
                                    booleanValue={booleanValue}
                                    handleOptionChange={handleOptionChange}
                                    addOption={addOption}
                                    addOtherOption={addOtherOption}
                                    removeOption={removeOption}
                                    minPollEndDate={minPollEndDate}
                                    setMinPollEndDate={setMinPollEndDate}
                                    submitButtonText={"Create Theme"}
                                    step={step}
                                    setStep={setStep}
                                    totalSteps={3}
                                    handleStepChange={handleStepChange}
                                    themes={themes}
                                />
                            </div>
                            <div className="w-full xl:w-1/2 p-8 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                                <ThemePreview selectedTheme={formData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
