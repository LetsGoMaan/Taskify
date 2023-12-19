import {AppRootStateType} from "app/store";

const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn


export {isLoggedInSelector}