import React, {useEffect, useState} from 'react';
import './App.css';
// import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";

import {
    CircularProgress,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import {getTheme} from "../common/theme";
import {Header} from "../common/components";
import {Main} from "./Main";
import {selectThemeMode} from "./app-slice";
import {Todolist} from "../features/todolists/api/todolistsApi.types";
import {Task} from "../features/todolists/api/tasksApi.types";
import {RequestStatus} from "../common/types";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackbar";
import {Routing} from "../common/routing";
import {useAppDispatch} from "../common/hooks";
import {initializeTC} from "../features/auth/model/authSlice";
import styles from "./App.module.css"



// export type TasksStateType = {
//     [todoListID: string]: Array<TaskType>
// }
export type TasksStateType = {
    [todoListID: string]: Array<Task>
}
export {}

function App() {

    const [isInitialized, setIsInitialized] = useState<boolean>(false);
const themeMode = useSelector(selectThemeMode);
const theme = getTheme(themeMode)
const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeTC()).finally(()=>{
            setIsInitialized(true);
        })
            });


    if(!isInitialized){
        return <div className={styles.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
        </div>
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="App">
            <Header/>
            <Routing/>
            {/*<Main/>*/}
            <ErrorSnackbar/>
        </div>
        </ThemeProvider>
    )
}

export default App;
