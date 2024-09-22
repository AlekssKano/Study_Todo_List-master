import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

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

    const changeTaskTitle=(taskId: string, newTitle: string, todilistId: string)=>{
        let nextState: TasksStateType = {
            ...tasks, [todilistId]: tasks[todilistId].map(t =>
                t.id === taskId ? {...t, title: newTitle} : t)
        }
        setTasks(nextState)
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
    const addTodoList=(title:string)=>{
        const newTodo:ToDolistType={
            id:v1(),
            title:title,
            filter:'all'
        }
        const nextTasksState:TasksStateType={...tasks,[newTodo.id]:[]}
        setTasks(nextTasksState)
        setTodolists([...todolists, newTodo])
    }
    const changeTodolistTitle=(newTitle: string, todilistId: string)=>{
        const nextState: Array<ToDolistType> = todolists.map(tl => tl.id === todilistId ? {
            ...tl, title: newTitle} : tl)
        setTodolists(nextState)
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
                changeTaskTitle={changeTaskTitle}
            />
        )
    })



    return (
        <div className="App">
            <AddItemForm
                addItem={addTodoList}
            maxItemLength={12}/>
            {todolistsComponents}
        </div>
    )
}

export default App;
