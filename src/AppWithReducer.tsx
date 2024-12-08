import React, {useReducer, useState} from 'react';
import './app/App.css';
import {TaskType, TodoList} from "./todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
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
} from "./reducers/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasksReducer";

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

function AppWithReducer() {

    //BLL Теперь тут
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [isLightMode, setIsLightMOde]=useState(true)


    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,
        [
            {
                id: todoListID_1,
                title: "What to Learn",
                filter: 'all',


            },
            {
                id: todoListID_2,
                title: "What to buy",
                filter: 'all',

            }])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
            [todoListID_1]: [
                {id: v1(), title: "Html", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: false},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Vue", isDone: false},
                {id: v1(), title: "Angular", isDone: false}
            ],
            [todoListID_2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Oil", isDone: false},
                {id: v1(), title: "Flour", isDone: false},
                {id: v1(), title: "Powder", isDone: false},
                {id: v1(), title: "Pasta", isDone: false},
            ]
        })

    //tasks

    const changeTaskStatus = (taskId: string, newStatus: boolean, todilistId: string) => {
        dispatchToTasks(changeTaskStatusAC({taskId:taskId, isDone:newStatus, todolistId:todilistId}))
    };

    const removeTask = (taskId: string, todilistId: string) => {
        dispatchToTasks(removeTaskAC({taskId:taskId, todolistId:todilistId}))


    }

    const addTask = (title: string, todilistId: string) => {

        dispatchToTasks(addTaskAC({title:title, todolistId:todilistId}))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todilistId: string) => {

        dispatchToTasks(changeTaskTitleAC({taskId:taskId, todolistId:todilistId, title:newTitle}))
    }


    //todolosts
    const changeTodoListFilter = (NewFilterValue: filterValuesType, todilistId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC({todolistId:todilistId,filter: NewFilterValue}))

    }
    const removeTodoList = (todolistId: string) => {

        dispatchToTodolists(RemoveTodolistAC(todolistId))
        dispatchToTasks(RemoveTodolistAC(todolistId)) // один из вариантов, такое не сработает с добавлением


    }
    const addTodoList = (title: string) => {

        const action = AddTodolistAC(title) // способ для Добавление .. И ЭТОТ СПОСОБО ЛУЧШЕ!
            //ДОБАВЛЯЙ ОТДЕЛЬНЫЦ action! это экономит память!
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {

        dispatchToTodolists(ChangeTodolistTitleAC({title:newTitle, todolistId:todolistId}))
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

export default AppWithReducer;
