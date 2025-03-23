import React, {ChangeEvent, useEffect} from "react";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../../common/hooks";
import {fetchTasks, selectTasksS} from "../../../../../model/tasks-slice";
import {TaskItem } from "./Task/TaskItem";
import {DomainTodolist} from "../../../../api/todolistsApi.types";

type Props ={
    todolist:DomainTodolist
}
export const Tasks=({todolist}:Props)=>{
    const tasks = useAppSelector(selectTasksS) //
    const dispatch = useAppDispatch()
    const { id, filter } = todolist

    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [])


const todolistTasks=tasks[todolist.id]
    let filteredTasks = todolistTasks
    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.status)
    }

    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.status)
    }

    return(
<>

    {filteredTasks && filteredTasks.length !== 0
        ?
        <List>
            { filteredTasks && filteredTasks.map((task)=>{
                return <TaskItem key ={task.id} todolist={todolist} task={task} />
            })}
        </List>
        : <span>Your tasks list is empty</span>

    }
</>
    )
}