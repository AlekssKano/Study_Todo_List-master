import React  from 'react';
import './App.css';
import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";

import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "../reducers/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "../reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {getTheme} from "../common/theme";
import {ThemeMode} from "./app_reducer";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";

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
const themeMode = useSelector<RootState, ThemeMode>((state) => state.app?.themeMode);
const theme = getTheme(themeMode)

    const todolists = useAppSelector((state)=>state.todolists)

const dispatch = useAppDispatch();
    // const tasks = useAppSelector(state=>state.tasks)

    //tasks

    const changeTaskStatus = (taskId: string, newStatus: boolean, todilistId: string) => {
        dispatch(changeTaskStatusAC({taskId:taskId, isDone:newStatus, todolistId:todilistId}))
    };

    const removeTask = (taskId: string, todilistId: string) => {
        dispatch(RemoveTaskAC({taskId:taskId, todolistId:todilistId}))


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

        dispatch(RemoveTodolistAC({todolistId:todolistId}))
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId:todolistId}))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="App">
            <Header/>
            <Main/>
        </div>
        </ThemeProvider>
    )
}

export default App;
