import {todolistsSlice} from "features/todolists/todolists-slice";
import { tasksSlice} from "features/tasks/tasks-slice";
import { appSlice} from "app/app-slice";
import { authSlice} from "features/auth/auth-slice";
import { configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        todoLists: todolistsSlice,
        tasks: tasksSlice,
        app: appSlice,
        auth: authSlice
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

