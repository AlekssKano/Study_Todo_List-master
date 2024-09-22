import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../components/Button";
import {filterValuesType} from "../App";
import {TaskType} from "./TodoList";
import AddItemForm from "../components/AddItemForm";
import {EditAbleSpan} from "../components/EditAbleSpan";


type TodolistBodyPropsType = {
    tasks: Array<TaskType>;
    filter: filterValuesType
    todolistId: string;
    changetoDolistFilter: (filter: filterValuesType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todilistId: string) => void


}
export const TodolistBody = ({
                                 tasks,
                                 filter,
                                 todolistId,
                                 changetoDolistFilter,
                                 removeTask,
                                 changeTaskStatus,
                                 addTask,
                                 changeTaskTitle,
                             }: TodolistBodyPropsType) => {

    const setFilterHandlerCreator = (newFilterValue: filterValuesType) => {
        return () => changetoDolistFilter(newFilterValue, todolistId)
    }

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ?
        tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => {
                removeTask(task.id, todolistId)
            }
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
            }
            const setTaskNewTitle=(newTitle: string) => {
                changeTaskTitle(task.id, newTitle, todolistId)
            }
            const tasksClasses: string = task.isDone ? "task-done" : "task"
            return (
                <li key={task.id}>
                    < input onChange={onChangeTaskStatusHandler}
                            type="checkbox"
                            checked={task.isDone}/>
                    {/*<span className={tasksClasses}>{task.title}</span>*/}
                    <EditAbleSpan title={task.title} changeItemTitle={setTaskNewTitle}/>
                    <Button title={"x"} onClickHandler={onClickRemoveTaskHandler}/>
                </li>

            )
        })
        : <span>Your tasks list is empty</span>


    const buttonsData = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator('all'),
            classes: filter === "all" ? 'filter-btn-active' : ''

        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator('active'),
            classes: filter === "active" ? 'filter-btn-active' : ''

        },
        {
            title: "Comleted",
            onClickHandler: setFilterHandlerCreator('completed'),
            classes: filter === "completed" ? 'filter-btn-active' : ''

        },
    ]
    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button title={btn.title}
                    classes={btn.classes}
                    onClickHandler={btn.onClickHandler}/>
        )
    })
    //handler
    const addNewTask
        = (newTaskTitle: string) => {
        addTask(newTaskTitle, todolistId)
    }

    return (
        <div>
            <AddItemForm addItem={addNewTask} maxItemLength={9}/>
            <ul>
                {tasksList}
            </ul>
            <div>{filterButtons}</div>
        </div>
    );
};
