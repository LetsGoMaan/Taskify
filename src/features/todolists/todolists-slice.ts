import {createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {appErrorNetworkHandler, appErrorServerHandler, createAppAsyncThunk} from "common/utils";
import {AppStatus} from "app/app-slice";
import {authThunks} from "features/auth/auth-slice";
import {
    CreateTodolistRequest,
    RemoveTodolistRequest,
    StatusCodes,
    todolistAPI,
    TodolistType,
    CommonRequestData
} from "api";


// SLICE
const initialState: TodolistDomainType[] = []
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist)
                todolist.filter = action.payload.filter
        },
        setTodolistStatus: (state, action: PayloadAction<{ status: AppStatus, todolistId: string }>) => {
            const todolist = state.find(tl => tl.id === action.payload.todolistId)
            if (todolist)
                todolist.todolistStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const todolist = state.find(tl => tl.id === action.payload.todolistId)
                if (todolist)
                    todolist.title = action.payload.title
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (todolistIndex !== -1)
                    state.splice(todolistIndex, 1)
            })
            .addCase(createTodolist.fulfilled, (state,action) => {
                state.unshift({...action.payload.newTodolist, filter: 'all', todolistStatus: 'idle'})
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
            })
            .addCase(authThunks.logout.fulfilled, () => {
                return initialState
            })
    }
});

//THUNKS
const updateTodolistTitle = createAppAsyncThunk<CommonRequestData, CommonRequestData>(
    'todolists/updateTitle',
    async (data, {rejectWithValue, dispatch}) => {
        dispatch(todolistsActions.setTodolistStatus({status: 'loading', todolistId: data.todolistId}))
        try {
            const res = await todolistAPI.updateTodolistTitle(data)
            if (res.data.resultCode === StatusCodes.Ok) {
                return {title: data.title, todolistId: data.todolistId}
            } else {
                appErrorServerHandler(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(todolistsActions.setTodolistStatus({status: 'success', todolistId: data.todolistId}))
        }
    })
const removeTodolist = createAppAsyncThunk<RemoveTodolistRequest, RemoveTodolistRequest>(
    'todolists/remove',
    async (data, {rejectWithValue, dispatch}) => {
        dispatch(todolistsActions.setTodolistStatus({status: 'loading', todolistId: data.todolistId}))
        try {
            const res = await todolistAPI.deleteTodolist(data)
            if (res.data.resultCode === StatusCodes.Ok) {
                return {todolistId: data.todolistId}
            } else {
                appErrorServerHandler(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(todolistsActions.setTodolistStatus({status: 'success', todolistId: data.todolistId}))
        }
    })

const createTodolist = createAppAsyncThunk<{ newTodolist: TodolistType }, CreateTodolistRequest>(
    'todolists/create',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const response = await todolistAPI.createTodolist(data)
            if (response.data.resultCode === StatusCodes.Ok) {
                return {newTodolist: response.data.data.item}
            } else {
                appErrorServerHandler(response.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        }
    })

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
    'todolists/fetch',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const res = await todolistAPI.getTodolists()
            return {todolists: res.data}
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        }
    })

export const todolistsPending = isPending(
    fetchTodolists,
    removeTodolist,
    createTodolist,
    updateTodolistTitle,
)
export const todolistsFulfilled = isFulfilled(
    fetchTodolists,
    removeTodolist,
    createTodolist,
    updateTodolistTitle,
)

export const todolistsSlice = slice.reducer
export const todolistsThunks = {updateTodolistTitle, removeTodolist, createTodolist, fetchTodolists}
export const todolistsActions = slice.actions

// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    todolistStatus: AppStatus
}