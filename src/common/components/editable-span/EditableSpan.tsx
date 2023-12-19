import React from 'react';
import s from './EditableSpan.module.css'
import TextField from '@mui/material/TextField';
import {useEditableSpan} from "common/hooks";

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo((
    {
        title,
        callback,
    }
) => {
    const {updatedTitle, onEditMode, onChange, editMode, offEditMode} = useEditableSpan(callback, title)

    return (
        <>
            {editMode
                ? <TextField
                    size={'small'}
                    id="outlined-basic"
                    label={title}
                    variant="outlined"
                    onChange={onChange}
                    onBlur={offEditMode}
                    value={updatedTitle}
                    autoFocus
                />
                : <span className={s.todolist_title} onDoubleClick={onEditMode}>{title}</span>}
        </>
    )
});

