import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
// import {Button} from "../components/Button";
import {filterValuesType} from "../AppWithUseState";
import {TaskType} from "./TodoList";
import AddItemForm from "../components/AddItemForm";
import {EditAbleSpan} from "../components/EditAbleSpan";
import {Button, IconButton, List, ListItem} from "@mui/material";
import DeletedIcon from '@mui/icons-material/Delete';
import { Checkbox } from "@mui/material"; // Правильный импорт

type ButtonFilterType= {
    title: string
    onClickHandler: ()=>void
    color: 'secondary' | 'primary'
}


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
            // const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
            // }
            const setTaskNewTitle=(newTitle: string) => {
                changeTaskTitle(task.id, newTitle, todolistId)
            }
            const tasksClasses: string = task.isDone ? "task-done" : "task"
            return (
                <ListItem key={task.id}
                          disablePadding
                          className={'task'}
                          // divider={true}
                          secondaryAction={
                              <IconButton onClick={onClickRemoveTaskHandler}
                                          size={'small'} >
                                  <DeletedIcon/>
                              </IconButton>
                          }
                >
                    <Checkbox
                        size="small"
                        color={'primary'}
                        onChange={onChangeTaskStatusHandler}
                        checked={task.isDone}
                    />
                    {/*< input onChange={onChangeTaskStatusHandler}*/}
                    {/*        type="checkbox"*/}
                    {/*        checked={task.isDone}/>*/}
                    {/*<span className={tasksClasses}>{task.title}</span>*/}
                    <EditAbleSpan title={task.title} changeItemTitle={setTaskNewTitle} classes={task.isDone?"task-done" : "task"}/>
                    {/*<Button title={"x"} onClickHandler={onClickRemoveTaskHandler}/>*/}

                </ListItem>

            )
        })
        : <span>Your tasks list is empty</span>


    const buttonsData:ButtonFilterType[] = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator('all'),
            color: filter === "all" ? 'secondary':'primary'
        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator('active'),
            color: filter === "active" ? 'secondary' : 'primary'

        },
        {
            title: "Comleted",
            onClickHandler: setFilterHandlerCreator('completed'),
            color: filter === "completed" ? 'secondary' : 'primary'

        },
    ]
    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button
                size='small'
                variant='contained'
                disableElevation={true} //отключает тени у кнопки
                    color={btn.color}
                    onClick={btn.onClickHandler}>

                {btn.title}</Button>
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
            <List >
                {tasksList}
            </List>
            <div>{filterButtons}</div>
        </div>
    );
};
