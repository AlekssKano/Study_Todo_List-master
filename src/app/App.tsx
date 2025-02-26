import React  from 'react';
import './App.css';
import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";

import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import {getTheme} from "../common/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";

import {selectThemeMode} from "./app_selectors";

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
