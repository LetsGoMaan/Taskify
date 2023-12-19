import React from 'react';
import s from "app/App.module.css";
import {TodoList} from "features/todolists/ui/TodoList";
import {useTodolistsList} from "features/todolists/hooks/useTodolistsList";
import {InputBlock} from "common/components";

export const TodolistsList = () => {

    const {todoLists, addNewTodoList} = useTodolistsList()

    const mappedTodoList =  todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todolistId={tl.id}
                todolistStatus={tl.todolistStatus}
                title={tl.title}
                filter={tl.filter}
            />
        )
    })

    return (
        <>
            <div className={s.add_todoList_block}>
                <InputBlock callback={addNewTodoList}/>
            </div>
            <div className={s.todoLists_wrapper}>
                {mappedTodoList}
            </div>
        </>
    );
}

