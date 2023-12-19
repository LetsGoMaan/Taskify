import React from "react";
import s from "./InputBlock.module.css";
import TextField from '@mui/material/TextField';
import {useAppForm} from "common/hooks/useAppForm";
import { SuperButton } from "../super-button";

type InputBlockPropsType = {
    callback: (title: string) => void
}
type InputFormType = {
    titleInput: string
}
export const InputBlock: React.FC<InputBlockPropsType> = React.memo((
    {
        callback
    }
) => {
    const {handleSubmit, errors, reset, register, clearFieldErrors} = useAppForm(['titleInput'])
    const onSubmitHandler = (data: InputFormType) => {
        callback(data.titleInput)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={s.input_block_wrapper}>
                <div>
                    <TextField
                        {...register('titleInput')}
                        size={"small"}
                        onBlur={() => clearFieldErrors('titleInput')}
                        error={!!errors.titleInput}
                        id="outlined-error"
                        label={!!errors.titleInput ? errors.titleInput.message : 'Add item'}
                    />
                </div>
                <div>
                    <SuperButton name={'Create'}/>
                </div>
            </form>
        </>
    );
});


