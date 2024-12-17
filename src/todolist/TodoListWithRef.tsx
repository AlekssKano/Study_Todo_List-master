import React, {useRef} from "react";
import {Button} from "../common/components/Button/Button";
import {filterValuesType} from "../app/App";

type TodoListProps = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title:string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(inputRef)

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ?
        tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    < input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <Button title={"x"} onClickHandler={() => removeTask(task.id)}/>
                </li>

            )
        })
        : <span>Your tasks list is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title={"+"}
                        onClickHandler={() => {
                            if(inputRef.current) {
                                addTask(inputRef.current.value)
                                inputRef.current.value=("")
                            } }}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title={"All"} onClickHandler={() => changeFilter('all')}/>
                <Button title={"Active"} onClickHandler={() => changeFilter('active')}/>
                <Button title={"Comleted"} onClickHandler={() => changeFilter('completed')}/>

            </div>

        </div>

    )
}