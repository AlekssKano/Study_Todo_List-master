import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "../components/Button";
import {filterValuesType} from "../App";
import TodolistHeader from "./TodolistHeader";
import {TodolistBody} from "./TodolistBody";
import {todolistSX} from "./Todolist.styles";
import {Box} from "@mui/material";

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
    changeTaskTitle:(taskId: string, newTitle: string, todilistId: string)=>void
    changeTodolistTitle:(todolistId: string, newTitle: string) => void //change


}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = ({
                             removeTodoList,
                             todolistId,
                             title,
                             tasks,
                             removeTask,
                             changetoDolistFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodoListProps) => {
    const [collapsed, setCollapsed] = useState(false)

const setTodolistNewTitle =(newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
}

    //JSX
    return (
        <Box sx={todolistSX}>
<TodolistHeader title={title}
                isCollapsed={collapsed}

                toggleTodolist={()=>setCollapsed(!collapsed)}

                removeTodolist={()=>removeTodoList(todolistId)}
                changeTodolistTitle={setTodolistNewTitle}


                />
            {!collapsed &&
                <TodolistBody tasks={tasks}
                              filter={filter}
                              todolistId={todolistId}
                              changetoDolistFilter={changetoDolistFilter}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}
                              addTask={addTask}
                              changeTaskTitle={changeTaskTitle}
                />}

            </Box>

    )
}
