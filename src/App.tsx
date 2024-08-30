import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todolist/TodoList";

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
export type filterValuesType ='all'| 'active' | 'completed';

    function App() {
    const [tasks, setTasks] = React.useState<TaskType[]>([
        {id:1, title: "Html", isDone: true},
        {id:2, title: "CSS", isDone: true},
        {id:3, title: "JS/TS", isDone: false},
        {id:4, title: "React", isDone: false},
        {id:5, title: "Vue", isDone: false},
        {id:6, title: "Angular", isDone: false},
    ])
    const removeTask = (taskId: number) => {
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
const changeFilter=(NewFilterValue:filterValuesType) => {
        setFilter(NewFilterValue)
}


return (
    <div className="App">
        <TodoList title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
    </div>
)
}

export default App;
