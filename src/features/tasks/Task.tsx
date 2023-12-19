import React from 'react';
import s from "features/todolists/ui/TodoList.module.css";
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses, TaskType} from "api";
import {AppStatus} from "app/app-slice";
import {useTasks} from "features/tasks/hooks/useTasks";
import {EditableSpan, SuperButton} from "common/components";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    todolistStatus: AppStatus
}

export const Task: React.FC<TaskPropsType> = React.memo( (
    {
        todolistId,
        task,
        todolistStatus
    }
) => {

    const {removeTask, changeTaskStatus, changeTaskTitle} = useTasks(task, todolistId)

    return (
        <>
            <li className={s.task_list_item}>
                <SuperButton name={'x'} btnType={'trash'} callback={removeTask}/>
                <EditableSpan title={task.title} callback={changeTaskTitle}/>
                <Checkbox color="primary" onChange={changeTaskStatus}
                          checked={task.status === TaskStatuses.Completed}
                          disabled={todolistStatus === 'loading'}
                />
            </li>
        </>
    );
});
