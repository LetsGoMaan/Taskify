import {authThunks} from "features/auth/auth-slice";
import {isLoggedInSelector} from "features/auth/auth-selectors";
import {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {LoginRequestData} from "api";

export const useAuth = () => {
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
    const dispatch = useAppDispatch()

    const login = useCallback((data: LoginRequestData) => {
        dispatch(authThunks.login(data))
    }, [dispatch])

    const logout = useCallback(() => {
        dispatch(authThunks.logout())
    }, [dispatch])
    return {isLoggedIn, login, logout}
}