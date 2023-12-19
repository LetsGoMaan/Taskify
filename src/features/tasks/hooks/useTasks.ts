import {ChangeEvent, useCallback} from "react";
import {tasksThunks} from "features/tasks/tasks-slice";
import {useAppDispatch} from "app/hooks/useAppDispatch";
import {TaskStatuses, TaskType} from "api/todolist-api";

export const useTasks = (task: TaskType, todolistId: string) => {
    const dispatch = useAppDispatch()

    const removeTask = useCallback (() => {
        dispatch(tasksThunks.removeTask({taskId: task.id, todolistId}))
    }, [dispatch, todolistId, task.id])

    const changeTaskStatus = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        const taskStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.inProgress
        dispatch(tasksThunks.updateTask({taskId: task.id, todolistId, updatedTaskField: {status: taskStatus}}))
    }, [dispatch, todolistId, task.id])

    const changeTaskTitle = useCallback ((title: string) => {
        dispatch(tasksThunks.updateTask({taskId: task.id, todolistId, updatedTaskField: {title}}))
    } , [dispatch, todolistId, task.id ])

    return {
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    }
}