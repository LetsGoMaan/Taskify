import React, {useEffect} from 'react';
import s from "app/App.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "features/todolists/ui/TodolistsList";
import {Login} from "features/auth/Login";
import {useAppDispatch, useAppState} from "app/hooks";
import {appThunks} from "app/app-slice";
import {Page404} from "common/components";

export const Main = () => {
    const {isInitialized} = useAppState()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appThunks.initializeApp())
    }, [dispatch])

    return (
        <div className={s.app}>
            {!isInitialized
                ? <div className={s.initialized_container}>
                    <CircularProgress color="primary" size={150}/>
                </div>
                :
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<Page404/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            }
        </div>
    );
};