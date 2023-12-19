import * as yup from "yup";

export const useValidators = () => {
    const validators: ValidatorsType = {
        email: yup
            .string()
            .required('Email is required!')
            .email('Email not valid'),
        password: yup
            .string()
            .required('Password is required!')
            .min(4, 'Password must be at least 4 symbols'),
        titleInput: yup
            .string()
            .required('Field is required')
            .max(20, 'Title must be less then 20 symbols!')
    }

    return {validators}
}

export type ValidatorsType = {
    email?: yup.StringSchema<string, yup.AnyObject>
    password?: yup.StringSchema<string, yup.AnyObject>
    titleInput?: yup.StringSchema<string, yup.AnyObject>
}