import React, { useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "../todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm";
import {
    AppBar, Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid2,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {amber, pink} from "@mui/material/colors";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "../reducers/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {useAppDispatch, useAppSelector} from "./hooks";

export type filterValuesType = 'all' | 'active' | 'completed';

export type ToDolistType = {
    id: string
    title: string
    filter: filterValuesType

}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}
export {}

function App() {



    const todolists = useAppSelector((state)=>state.todolists)

const dispatch = useAppDispatch();
    const tasks = useAppSelector(state=>state.tasks)

    //tasks

    const changeTaskStatus = (taskId: string, newStatus: boolean, todilistId: string) => {
        dispatch(changeTaskStatusAC({taskId:taskId, isDone:newStatus, todolistId:todilistId}))
    };

    const removeTask = (taskId: string, todilistId: string) => {
        dispatch(removeTaskAC({taskId:taskId, todolistId:todilistId}))


    }

    const addTask = (title: string, todilistId: string) => {

        dispatch(addTaskAC({title:title, todolistId:todilistId}))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todilistId: string) => {

        dispatch(changeTaskTitleAC({taskId:taskId, todolistId:todilistId, title:newTitle}))
    }


    //todolosts
    const changeTodoListFilter = (NewFilterValue: filterValuesType, todilistId: string) => {
        dispatch(ChangeTodolistFilterAC({todolistId:todilistId,filter: NewFilterValue}))

    }
    const removeTodoList = (todolistId: string) => {

        dispatch(RemoveTodolistAC(todolistId))
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId:todolistId}))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="App">
        </div>
        </ThemeProvider>
    )
}

export default App;
