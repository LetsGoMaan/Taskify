import {AppRootStateType} from "app/store";

const statusSelector = (state: AppRootStateType) => state.app.status
const isInitializedSelector = (state: AppRootStateType) => state.app.initialized
const errorSelector = (state: AppRootStateType) => state.app.error


export {statusSelector, isInitializedSelector, errorSelector}