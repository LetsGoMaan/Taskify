import {authAPI, LoginRequestData, StatusCodes} from "api/todolist-api";
import {appErrorNetworkHandler, appErrorServerHandler, createAppAsyncThunk} from "common/utils";
import {appThunks} from "app/app-slice";
import {createSlice} from "@reduxjs/toolkit";


//SLICE
const authInitialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(appThunks.initializeApp.fulfilled, (state) => {
                state.isLoggedIn = true
            })
    }
})

const login = createAppAsyncThunk<void, LoginRequestData>(
    'auth/login',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === StatusCodes.Error) {
                appErrorServerHandler(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        }
    })
const logout = createAppAsyncThunk<void>(
    'auth/logout',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.logout()
            if (response.data.resultCode === StatusCodes.Error) {
                appErrorServerHandler(response.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        }
    })

export const authThunks = {login, logout}
export const authSlice = slice.reducer
