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

    const [isLightMode, setIsLightMOde]=useState(true)


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
    const addTodoList = (title: string) => {

        dispatch(AddTodolistAC(title))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {

        dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId:todolistId}))
    }

    const todolistsComponents = todolists.map((tl: ToDolistType) => {
        let filteredTasks: Array<TaskType> = tasks[tl.id]
        if (tl.filter === 'active') {
            filteredTasks = tasks[tl.id].filter(task => task.isDone === false)
        }

        if (tl.filter === 'completed') {
            filteredTasks = tasks[tl.id].filter(task => task.isDone === true)
        }
        return (
            <Grid2 key={tl.id}>
            <Paper elevation={8}>
                <TodoList
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changetoDolistFilter={changeTodoListFilter}
                    filter={tl.filter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            </Paper>
            </Grid2>
        )
    })

const theme= createTheme({
    palette:{
        primary:pink,
        secondary: amber,
        mode: isLightMode?'light':'dark'
    }
})
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="App">
            <AppBar position="static">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <Switch onChange={()=>setIsLightMOde(!isLightMode)}/>
                        <Button color="inherit">Login</Button>
                    </Box>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid2 container sx={{m:'15px', justifyContent: 'center'}}>
                <AddItemForm
                    addItem={addTodoList}
                    maxItemLength={12}/>
                </Grid2>
                <Grid2 container spacing={4}>
                {todolistsComponents}
                </Grid2>
            </Container>
        </div>
        </ThemeProvider>
    )
}

export default App;
