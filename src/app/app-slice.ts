import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginFulfilled, matchFulfilled, matchPending,} from "common/constants/matchers";
import {appErrorNetworkHandler, appErrorServerHandler, createAppAsyncThunk} from "common/utils";
import {authAPI, StatusCodes} from "api";
import {todolistsFulfilled, todolistsPending} from "features/todolists/todolists-slice";

const initialState = {
    status: 'idle' as AppStatus,
    error: null as string | null,
    initialized: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setStatus: (state, action: PayloadAction<{ status: AppStatus }>) => {
            state.status = action.payload.status
        },
        setInitialized: (state, action: PayloadAction<{ initialized: boolean }>) => {
            state.initialized = action.payload.initialized
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(loginFulfilled, (state) => {
                state.initialized = true
            })
            .addMatcher(todolistsPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(matchPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(todolistsFulfilled, (state) => {
                state.status = 'success'
            })
            .addMatcher(matchFulfilled, (state) => {
                state.status = 'success'
            })
    }
})

export const initializeApp = createAppAsyncThunk<void>(
    'app/init',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === StatusCodes.Ok) {
                dispatch(appActions.setInitialized({initialized: true}))
            } else {
                appErrorServerHandler(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setInitialized({initialized: true}))
        }
    })
export const appActions = slice.actions
export const appSlice = slice.reducer
export const appThunks = {initializeApp}

//Types
export type AppStatus = 'idle' | 'loading' | 'success' | 'failed'