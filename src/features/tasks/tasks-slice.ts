import {
    StatusCodes,
    TaskModelType,
    TaskStatuses,
    TaskType,
    todolistAPI, CommonRequestData,
    RemoveTaskRequest, FetchTasksRequest
} from "api";
import {appErrorNetworkHandler, appErrorServerHandler, createAppAsyncThunk} from "common/utils";
import {createSlice} from "@reduxjs/toolkit";
import {authThunks} from "features/auth/auth-slice";
import {todolistsActions, todolistsThunks} from "features/todolists/todolists-slice";

//Reducer
const initialState: TodoListDataType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
                state[action.payload.newTodolist.id] = []
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.todolistId].push(action.payload.newTaskData)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (taskIndex !== -1)
                    state[action.payload.todolistId].splice(taskIndex, 1)
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasksData
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (taskIndex !== -1)
                    state[action.payload.todolistId][taskIndex] = action.payload.updatedTask
            })
            .addCase(authThunks.logout.fulfilled, () => {
                return initialState
            })
    }
})

const createTask = createAppAsyncThunk<{ todolistId: string, newTaskData: TaskType }, CommonRequestData>(
    'tasks/create',
    async (data, {rejectWithValue, dispatch}) => {
        dispatch(todolistsActions.setTodolistStatus({status: 'loading', todolistId: data.todolistId}))
        try {
            const res = await todolistAPI.createTask({title: data.title, todolistId: data.todolistId})
            if (res.data.resultCode === StatusCodes.Ok) {
                return {todolistId: data.todolistId, newTaskData: res.data.data.item}
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

const removeTask = createAppAsyncThunk<{ todolistId: string, taskId: string }, RemoveTaskRequest>(
    'tasks/remove',
    async (data, {rejectWithValue, dispatch}) => {
        dispatch(todolistsActions.setTodolistStatus({status: 'loading', todolistId: data.todolistId}))
        try {
            const response = await todolistAPI.removeTask({taskId: data.taskId, todolistId: data.todolistId})
            if (response.data.resultCode === StatusCodes.Ok) {
                return {todolistId: data.todolistId, taskId: data.taskId}
            } else {
                appErrorServerHandler(response.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(todolistsActions.setTodolistStatus({status: 'success', todolistId: data.todolistId}))
        }
    })

const fetchTasks = createAppAsyncThunk<{ tasksData: TaskType[], todolistId: string }, FetchTasksRequest>(
    'tasks/fetch',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const res = await todolistAPI.fetchTasks({todolistId: data.todolistId})
            return {tasksData: res.data.items, todolistId: data.todolistId}
        } catch (e) {
            appErrorNetworkHandler(e, dispatch)
            return rejectWithValue(null)
        }
    })

const updateTask = createAppAsyncThunk<{ todolistId: string, taskId: string, updatedTask: TaskType },
    { todolistId: string, taskId: string, updatedTaskField: UpdatedTaskFieldType }>(
    'tasks/update',
    async (data, {rejectWithValue, dispatch, getState}) => {
        const findProcessedTask = getState().tasks[data.todolistId].find(task => task.id === data.taskId)
        if (!findProcessedTask) {
            return rejectWithValue(null)
        }
        const updatedTask: TaskModelType = {
            title: findProcessedTask.title,
            description: findProcessedTask.description,
            completed: findProcessedTask.completed,
            status: findProcessedTask.status,
            priority: findProcessedTask.priority,
            startDate: findProcessedTask.startDate,
            deadline: findProcessedTask.deadline,
            ...data.updatedTaskField,
        }
        dispatch(todolistsActions.setTodolistStatus({status: 'loading', todolistId: data.todolistId}))
        try {
            const res = await todolistAPI
                .updateTask({updatedTaskModel: updatedTask, taskId: data.taskId, todolistId: data.todolistId})
            if (res.data.resultCode === StatusCodes.Ok) {
                return {updatedTask: res.data.data.item, taskId: data.taskId, todolistId: data.todolistId}
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
    }
)
export const tasksSlice = slice.reducer
export const tasksThunks = {createTask, removeTask, fetchTasks, updateTask}

//Types
export type TodoListDataType = {
    [key: string]: TaskType[]
}
type UpdatedTaskFieldType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}