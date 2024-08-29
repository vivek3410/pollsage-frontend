import React, { useEffect, useState } from 'react';
import PageDetails from '../../../components/_page_details';
import PollForm from './form';
import { dismissToast, errorToast, loadingToast, successToast } from '../../../utils/toaster';
import { getAllThemesForForm } from '../../../services/creator/theme.service';
import { useNavigate, useParams } from 'react-router-dom';
import { getPollByPollId, updatePoll } from '../../../services/creator/poll.service';
import { createPollValidation } from '../../../validations/poll';

export default function EditPoll() {
    const { pollId } = useParams()
    const navigate = useNavigate()

    const initialState = {
        question: null,
        allow_multiple_selection: false,
        description: null,
        options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
        publish_status: 'published',
        start_date: null,
        end_date: null,
        result_visibility: 'public',
        password: null,
        theme: 'dark'
    }

    const [formData, setFormData] = useState(initialState);

    const [minPollEndDate, setMinPollEndDate] = useState(
        new Date().toISOString().slice(0, 16)
    )

    const [errors, setErrors] = useState({})
    const [booleanValue, setBooleanValue] = useState({
        showDescription: false,
        showPassword: false,
        showAdvancedSettings: false,
    })
    const [additionalFeatures, setAdditionalFeatures] = useState(false);


    const [themeSetting, setThemeSetting] = useState({
        theme: 'dark'
    })

    const [isFormDirty, setIsFormDirty] = useState(false);
    const [step, setStep] = useState(1)

    const [themes, setThemes] = useState([]);
    useEffect(() => {
        const fetchThemes = async () => {
            try {
                let res = await getAllThemesForForm();
                let themes = separateThemesByDarkness(res.data);
                setThemes(themes)
            } catch (e) {
                errorToast(e.msg)
            }
        }
        fetchThemes()
    }, [])

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
    }, [isFormDirty])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            console.log(pollId);
            let res = await getPollByPollId(pollId)
            delete res.data.createdAt;
            delete res.data.updatedAt;
            setFormData(res.data);
            if (res.data.description) {
                setBooleanValue({ ...booleanValue, showDescription: true })
            }

            if (res.data.password || res.data.start_date || res.data.end_date) {
                setAdditionalFeatures(true)
                if (res.data.password) {
                    setBooleanValue({ ...booleanValue, showPassword: true })
                }

                if (res.data.start_date) {
                    setMinPollEndDate(res.data.start_date)
                }
            }
        } catch (e) {

        }
    }

    const separateThemesByDarkness = (themes) => {
        const dark_themes = [];
        const light_themes = [];
        themes.forEach((theme) => {
            if (theme.id_dark_theme) {
                dark_themes.push(theme)
            } else {
                light_themes.push(theme)
            }
        })

        return {
            dark_themes,
            light_themes
        }
    }

    const onChangeBooleanValue = (key, value) => {
        if (!key) return;
        setBooleanValue({ ...booleanValue, [key]: value })
    }

    const onChangeFormData = (key, value, index = null) => {
        if (!key) return;
        if (key === 'options') {
            let options = [...formData.options];
            options[index].text = value;
            setFormData({ ...formData, options })
            return
        }
        if (key === 'password') {
            value = !value ? null : value
        }

        setFormData({ ...formData, [key]: value });
        setIsFormDirty(true)
    }

    const onChangeThemeSetting = (key, value) => {
        if (!key) return;
        setThemeSetting({ ...formData, [key]: value })
    }

    const handleOptionChange = (index, value) => {
        setFormData((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions[index].text = value;
            return {
                ...prev,
                options: updatedOptions
            }
        })
    }

    const addOption = (e) => {
        e.preventDefault();
        setFormData((prev) => {
            return {
                ...prev,
                options: [...prev.options, { text: '' }]
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
            const { isValid, errors } = createPollValidation(formData);
            if (!isValid) {
                setErrors(errors)
                return
            }

            setErrors({})
            loadingToast("updating poll...");
            console.log(formData);
            console.log(themeSetting.selectedTheme);
            delete formData.pollId;
            delete formData._id;
            console.log("afterDelete", formData);
            let payload = {
                ...formData,
                selected_theme: themeSetting.selectedTheme ? JSON.parse(themeSetting?.selectedTheme)._id : null
            }
            let res = await updatePoll(pollId, payload);
            console.log(res);
            if (res) {
                setFormData(initialState);
                dismissToast(res);
                successToast("Poll updated successfully");
                navigate('/creator/polls')
            }
        } catch (e) {
            dismissToast()
            console.log(e);
            errorToast(e.msg)
        }
    }

    const handleStepChange = (e, step) => {
        e.preventDefault();
        if (step === 2) {
            const { isValid, errors } = createPollValidation(formData);
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
            <h1 className="text-slate-800 font-bold text-3xl">Edit Poll</h1>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="">
                    <div className="flex flex-col gap-9">
                        <div className="shadow-default dark:border-strokedark dark:bg-boxdark">
                            <PollForm
                                formData={formData}
                                errors={errors}
                                onChangeFormData={onChangeFormData}
                                onSubmit={onSubmit}
                                booleanValue={booleanValue}
                                onChangeBooleanValue={onChangeBooleanValue}
                                additionalFeatures={additionalFeatures}
                                setAdditionalFeatures={setAdditionalFeatures}
                                handleOptionChange={handleOptionChange}
                                addOption={addOption}
                                addOtherOption={addOtherOption}
                                removeOption={removeOption}
                                minPollEndDate={minPollEndDate}
                                setMinPollEndDate={setMinPollEndDate}
                                submitButtonText={"Update poll"}
                                step={step}
                                setStep={setStep}
                                totalSteps={3}
                                handleStepChange={handleStepChange}
                                themes={themes}
                                themeSetting={themeSetting}
                                onChangeThemeSetting={onChangeThemeSetting}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
