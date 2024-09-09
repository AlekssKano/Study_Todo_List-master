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

function App() {
    const [tasks, setTasks] = React.useState<TaskType[]>([
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Vue", isDone: false},
        {id: v1(), title: "Angular", isDone: false},
    ])
    console.log(tasks);

    const changeTaskStatus = (taskId: string, newStatus:boolean) => {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
        setTasks(nextState)
    }
    const removeTask = (taskId: string ) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    const [filter, setFilter] = useState<filterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    const changeFilter = (NewFilterValue: filterValuesType) => {
        setFilter(NewFilterValue)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let NewTasks = [newTask, ...tasks]
        setTasks(NewTasks)
    }
    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      filter={filter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App;
