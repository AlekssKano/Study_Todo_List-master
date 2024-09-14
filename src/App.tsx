import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todolist/TodoList";
import {v1} from "uuid";

const todoListTitle_1: string = "What to study ";
const todoListTitle_2: string = "What to buy";
const todoListTitle_3: string = "Olala";

// const tasks1: Array<TaskType>=[
//     {id:1, title: "Html", isDone: true},
//     {id:2, title: "CSS", isDone: true},
//     {id:3, title: "JS/TS", isDone: false},
//     {id:4, title: "React", isDone: false},
//     {id:5, title: "Vue", isDone: false},
//     {id:6, title: "Angular", isDone: false},
// ]
export type filterValuesType = 'all' | 'active' | 'completed';

type ToDolistType = {
    id: string
    title: string
    filter: filterValuesType

}

type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}


function App() {

    //BLL Теперь тут
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todolists, setTodolists] = useState<Array<ToDolistType>>(
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
    const [tasks, setTasks] = useState<TasksStateType>(
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

        let nextState: TasksStateType = {
            ...tasks, [todilistId]: tasks[todilistId].map(t =>
                t.id === taskId ? {...t, isDone: newStatus} : t)
        }
        setTasks(nextState)
    };

    const removeTask = (taskId: string, todilistId: string) => {

        let NextState: TasksStateType = {
            ...tasks, [todilistId]: tasks[todilistId].filter(task => {
                return task.id !== taskId
            })
        }
        setTasks(NextState)

    }

    const addTask = (title: string, todilistId: string) => {
        let newTask: TaskType =
            {
                id: v1(),
                title: title,
                isDone: false
            };
        let NextState: TasksStateType = {...tasks, [todilistId]: [newTask, ...tasks[todilistId]]}
        setTasks(NextState)
    }

    //todolosts
    const changeTodoListFilter = (NewFilterValue: filterValuesType, todilistId: string) => {
        const nextState: Array<ToDolistType> = todolists.map(tl => tl.id === todilistId ? {
            ...tl,
            filter: NewFilterValue
        } : tl)
        setTodolists(nextState)
    }
    const removeTodoList = (todolistId: string) => {
        console.log("remove rendering")
        const nextState: Array<ToDolistType> =
            todolists.filter(tl => tl.id !== todolistId)
        setTodolists(nextState)
        delete tasks[todolistId]
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
            />
        )
    })



    return (
        <div className="App">
            {todolistsComponents}
        </div>
    )
}

export default App;
