import {AppRootStateType} from "app/store";

const todolistsSelector = (state: AppRootStateType) => state.todoLists

export {todolistsSelector}