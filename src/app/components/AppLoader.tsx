import React from 'react';
import s from "app/App.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppState} from "app/hooks";

export const AppLoader = () => {
    const {appStatus} = useAppState()
    return (
        <div className={s.progress_container}>
            {appStatus === 'loading' && <LinearProgress color="secondary"/>}
        </div>
    );
};

