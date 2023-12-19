import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b770ebb6-e23a-4be6-93b0-7ed683c933c7'
    }
})

export const todolistAPI = {
    //Requests for Todolists
    getTodolists() {
         return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(data: CreateTodolistRequest) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: data.title})
    },
    deleteTodolist(data: RemoveTodolistRequest){
        return instance.delete<ResponseType>(`todo-lists/${data.todolistId}`)
    },
    updateTodolistTitle(data: CommonRequestData){
        return instance.put<ResponseType>(`todo-lists/${data.todolistId}`, {title: data.title})
    },
    //Requests for Tasks
    fetchTasks(data: FetchTasksRequest){
        return instance.get<ResponseTasksType>(`todo-lists/${data.todolistId}/tasks`)
    },
    createTask(data: CommonRequestData) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${data.todolistId}/tasks`, {title: data.title})
    },
    removeTask(data: RemoveTaskRequest) {
        return instance.delete<ResponseType>(`todo-lists/${data.todolistId}/tasks/${data.taskId}`)
    },
    updateTask(data: UpdateTaskRequest){
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${data.todolistId}/tasks/${data.taskId}`,
            data.updatedTaskModel)
    }
}

export const authAPI = {
    login(loginData: LoginRequestData) {
        return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>>('auth/login', loginData)
    },
    logout(){
        return instance.delete<ResponseType, AxiosResponse<ResponseType>>('auth/login')
    },
    me(){
        return instance.get<ResponseType<AuthMeDataType>>('auth/me')
    }
}

//TYPES
export type CommonRequestData = {
    title: string
    todolistId: string
}
export type LoginRequestData = {
    email: string
    password: string
    rememberMe: boolean
}
export type RemoveTodolistRequest = Omit<CommonRequestData, 'title'>
export type FetchTasksRequest = Omit<CommonRequestData, 'title'>
export type CreateTodolistRequest = Omit<CommonRequestData, 'todolistId'>
export type RemoveTaskRequest = {todolistId: string, taskId: string}
export type UpdateTaskRequest = {
    updatedTaskModel: TaskModelType,
    todolistId: string,
    taskId: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: string
}

export type ResponseType <T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type ResponseTasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}
export type AuthMeDataType = {
    id: number
    email: string
    login: string
}
export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 3,
}
export enum StatusCodes {
    Ok = 0,
    Error = 1
}