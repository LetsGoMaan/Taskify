import {isFulfilled, isPending} from "@reduxjs/toolkit";
import {authThunks} from "features/auth/auth-slice";
import {tasksThunks} from "features/tasks/tasks-slice";

export const matchPending = isPending(
    authThunks.login,
    authThunks.logout,
    tasksThunks.fetchTasks,
    tasksThunks.updateTask,
    tasksThunks.removeTask,
    tasksThunks.createTask,
)
export const matchFulfilled = isFulfilled(
    authThunks.login,
    authThunks.logout,
    tasksThunks.fetchTasks,
    tasksThunks.updateTask,
    tasksThunks.removeTask,
    tasksThunks.createTask
)

export const loginFulfilled = isFulfilled(authThunks.login)
