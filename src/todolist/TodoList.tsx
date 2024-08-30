import React from "react";
import {Button} from "../Button";
import {filterValuesType} from "../App";

type TodoListProps = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: number)=> void
    changeFilter:(filter: filterValuesType)=> void
}

export type TaskType  = {
    id: number
    title: string
    isDone: boolean
}



export const TodoList = ({title, tasks, removeTask, changeFilter}:TodoListProps) => {

    const tasksList:Array<JSX.Element> | JSX.Element= tasks.length !== 0
    ?
        tasks.map((task: TaskType) => {
        return (
            <li key = {task.id}>
                < input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} callback={() => removeTask(task.id)}/>
            </li>

    )
    })
        : <span>Your tasks list is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title = {"+"}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title={"All"} callback={()=>changeFilter('all')}/>
                <Button title={"Active"} callback={()=>changeFilter('active')}/>
                <Button title={"Comleted"} callback={()=>changeFilter('completed')}/>

            </div>

        </div>

)
}