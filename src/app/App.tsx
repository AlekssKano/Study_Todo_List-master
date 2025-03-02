import React  from 'react';
import './App.css';
import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";

import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import {getTheme} from "../common/theme";
import {Header} from "../common/components";
import {Main} from "./Main";
import {selectThemeMode} from "./app-slice";
import {Todolist} from "../features/todolists/api/todolistsApi.types";


export type filterValuesType = 'all' | 'active' | 'completed';

export type DomainTodolist = Todolist &{
    filter: filterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}
export {}

function App() {
const themeMode = useSelector(selectThemeMode);
const theme = getTheme(themeMode)

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
