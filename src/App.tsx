import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./todolist/TodoList";

const todoListTitle_1: string = "What to study ";
const todoListTitle_2: string = "What to buy";
const todoListTitle_3: string = "Olala";

const tasks1: Array<TaskType>=[
    {id:1, title: "Html", isDone: true},
    {id:2, title: "CSS", isDone: true},
    {id:3, title: "JS/TS", isDone: false},
    {id:4, title: "React", isDone: false},
    {id:5, title: "Vue", isDone: false},
    {id:6, title: "Angular", isDone: false},
]
const tasks2: Array<TaskType>=[
    {id:1, title: "Cola", isDone: true},
    {id:2, title: "Whiskey", isDone: false},
    {id:3, title: "Ice", isDone: true},
]
const tasks3: Array<TaskType>=[

]

function App() {
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks1} date={"25.07.1875"}/>
            <TodoList title={todoListTitle_2} tasks={tasks2}/>
            <TodoList title={todoListTitle_3} tasks={tasks3}/>

        </div>
    );
}

export default App;
