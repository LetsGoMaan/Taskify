import {AppRootStateType} from "app/store";

const tasksSelector = (state: AppRootStateType, todolistId: string) => state.tasks[todolistId]

export {tasksSelector}
