import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "../components/Button";
import {filterValuesType} from "../AppWithUseState";
import TodolistHeader from "./TodolistHeader";
import {TodolistBody} from "./TodolistBody";
import {todolistSX} from "./Todolist.styles";
import {Box} from "@mui/material";
import {TodolistTitle} from "../TodolistTitle";
import {ToDolistType} from "../app/App";

type TodoListProps = {

    todolistId: string;
    title: string;
    filter: filterValuesType
    tasks: Array<TaskType>;
    removeTodoList: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changetoDolistFilter: (filter: filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todilistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void //change
    todolist: ToDolistType


}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = ({
                             todolist,
                             removeTodoList,
                             tasks,
                             removeTask,
                             changetoDolistFilter,
                             addTask,
                             changeTaskStatus,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodoListProps) => {
    // const [collapsed, setCollapsed] = useState(false)
    //
    // const setTodolistNewTitle = (newTitle: string) => {
    //     changeTodolistTitle(newTitle, todolistId)
    // }

    //JSX
    return (
        <Box sx={todolistSX}>
            {/*<TodolistHeader title={title}*/}
            {/*                isCollapsed={collapsed}*/}

            {/*                toggleTodolist={()=>setCollapsed(!collapsed)}*/}

            {/*                removeTodolist={()=>removeTodoList(todolistId)}*/}
            {/*                changeTodolistTitle={setTodolistNewTitle}*/}


            {/*                />*/}
            <TodolistTitle todolist={todolist}/>

                <TodolistBody
                    tasks={tasks}
                    key={todolist.id} // была ошибка на недостачу ключ, исправила сама. уточнить
                    filter={todolist.filter}
                    todolistId={todolist.id}
                    changetoDolistFilter={changetoDolistFilter}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                />

        </Box>

    )
}
