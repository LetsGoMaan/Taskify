import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {useValidators, ValidatorsType} from "common/hooks/useValidators";

export type AppFormsData = {
    email: string,
    password: string,
    rememberMe: boolean,
    titleInput: string
}
export const useAppForm = (validateFields: ValidateFieldType[]) => {
    const {validators} = useValidators()

    const getValidateSchema = (
        validators: ValidatorsType,
        validateFields: ValidateFieldType[]
    ) => {
        if (!validateFields.length) return {}
        const result: ValidatorsType = {}
        for (let i = 0; i < validateFields.length; i++) {
            result[validateFields[i]] = validators[validateFields[i]]
        }
        return result
    }

    const validateSchema = yup.object(getValidateSchema(validators, validateFields))

    const {handleSubmit, control, reset, formState: { errors }, register, clearErrors } = useForm<AppFormsData>({
        mode: "onSubmit" ,
        resolver: yupResolver(validateSchema)
    });
    const clearFieldErrors = (fieldName: ValidateFieldType ) => {
        setTimeout(() => {
            clearErrors(fieldName)
        }, 3000);
    };

    return {
        handleSubmit,
        control,
        reset,
        errors,
        register,
        clearFieldErrors
    }
}

export type ValidateFieldType = 'email' | 'password' | 'titleInput'