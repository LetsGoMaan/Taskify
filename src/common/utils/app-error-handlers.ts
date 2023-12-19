import {ResponseType} from "api/todolist-api";
import {Dispatch} from "redux";
import {isAxiosError} from "axios";
import {appActions} from "app/app-slice";

export const appErrorServerHandler = <D>(responseData: ResponseType<D>, dispatch: Dispatch) => {
    if (responseData.messages.length) {
        dispatch(appActions.setError({error: responseData.messages[0]}))
    } else {
        dispatch(appActions.setError({error: 'Some error'}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}

export const appErrorNetworkHandler = (e: unknown, dispatch: Dispatch) => {
    const error = isAxiosError(e) ? e.message : 'Some Error!'
    dispatch(appActions.setError({error}))
    dispatch(appActions.setStatus({status: 'failed'}))
}