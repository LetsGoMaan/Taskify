import {useAuth} from "features/auth/hooks/useAuth";
import {todolistsSelector} from "features/todolists/todolist-selectors";
import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {todolistsThunks} from "features/todolists/todolists-slice";


export const useTodolistsList = () => {
    const {isLoggedIn} = useAuth()
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(todolistsSelector)
    const navigate = useNavigate()


    useEffect( ()=>{
        if(isLoggedIn) {
            dispatch(todolistsThunks.fetchTodolists())
        } else {
            navigate('/login')
        }
    }, [isLoggedIn])

    const addNewTodoList = useCallback((title: string) => {
        dispatch(todolistsThunks.createTodolist({title}))
    }, [])

    return {
        todoLists,
        addNewTodoList
    }
}