import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "../Button";
import {filterValuesType} from "../App";

type TodoListProps = {
    title: string;
    filter: filterValuesType
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter}: TodoListProps) => {

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ?
        tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => {
                removeTask(task.id)
            }
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked)
            }
            const tasksClasses: string = task.isDone ? "task-done" : "task"
            return (
                <li key={task.id}>
                    < input onChange={onChangeTaskStatusHandler}
                            type="checkbox"
                            checked={task.isDone}/>
                    <span className={tasksClasses}>{task.title}</span>
                    <Button title={"x"} onClickHandler={onClickRemoveTaskHandler}/>
                </li>

            )
        })
        : <span>Your tasks list is empty</span>
    //local variables
    const [inputError, setInputError] = useState<boolean>(false)
    const [titleInputValue, setTitleInputValue] = useState<string>("")
    const isInputBtrDisabled = !titleInputValue
    const userLengthMessage = `There are ${10 - titleInputValue.length}  character left to enter`
    const userErrorMessage = titleInputValue.length > 10
    //local handlers
    const onClickAddTaskHandler = () => {
        const trimmedTitle = titleInputValue.trim()
        if(!isInputBtrDisabled && !userErrorMessage && trimmedTitle) {
            addTask(titleInputValue)
       }
        else {
            setInputError(true)

        }
        setTitleInputValue("")
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isInputBtrDisabled && !userErrorMessage) {
            onClickAddTaskHandler()
        }
    }
    const onChangeSetTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    }
    const setFilterHandlerCreator = (newFilterValue: filterValuesType) => {
        return () => changeFilter(newFilterValue)
    }
    const buttonsData = [
        {
            title:"All",
            onClickHandler: setFilterHandlerCreator('all'),
            classes: filter === "all" ? 'filter-btn-active' : ''

        },
        {
            title:"Active",
            onClickHandler: setFilterHandlerCreator('active'),
            classes: filter === "active" ? 'filter-btn-active' : ''

        },
        {
            title:"Comleted",
            onClickHandler: setFilterHandlerCreator('completed'),
            classes: filter === "completed" ? 'filter-btn-active' : ''

        },
    ]
    //JSX
    const buttonList:Array<JSX.Element> =buttonsData.map(btn=>{
        return(
            <Button title={btn.title}
                    classes={btn.classes}
                    onClickHandler={btn.onClickHandler}/>
        )
    })
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleInputValue}
                       onChange={onChangeSetTitleInputValueHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                className={inputError? 'input-error': undefined}/>
                <Button title={"+"}
                        disabled={isInputBtrDisabled || userErrorMessage}
                        onClickHandler={onClickAddTaskHandler}/>
                {isInputBtrDisabled && !inputError && <div>Max length task title is 10 characters</div>}
                {!isInputBtrDisabled && !userErrorMessage &&!inputError && <div>{userLengthMessage}</div>}
                {userErrorMessage && <div style={{color: "red"}}>Max length task title is too long</div>}
                {inputError && <div style={{color:'red'}}>Title is required</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>{buttonList}</div>
        </div>

   )


}
