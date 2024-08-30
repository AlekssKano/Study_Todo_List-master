import React from "react";
import {Button} from "../Button";

type TodoListProps = {
    title: string;
    tasks: Array<TaskType>;
    date?: string;
}

export type TaskType  = {
    id: number
    title: string
    isDone: boolean
}



export const TodoList = (props: TodoListProps) => {

    const tasksList:Array<JSX.Element> | JSX.Element= props.tasks.length !== 0
    ?
        props.tasks.map((task: TaskType) => {
        return (
            <li key = {task.id}>
                < input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>

    )
    })
        : <span>Your tasks list is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title = {"+"}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Comleted"}/>

            </div>
            <span>{props.date}</span>
        </div>

)
}