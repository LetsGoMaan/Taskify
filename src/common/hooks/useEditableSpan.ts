import {ChangeEvent, useCallback, useState} from "react";

export const useEditableSpan = (callback: (title: string) => void, title: string) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [updatedTitle, setNewTitle] = useState<string>(title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = useCallback( () => {
        if  (updatedTitle.length > 0 ) {
            callback(updatedTitle)
            setEditMode(false)
        } else {
            setNewTitle(title)
            setEditMode(false)
        }
    }, [callback, title, updatedTitle ])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }, [])

    return {editMode, onEditMode, updatedTitle, offEditMode, onChange  }
}