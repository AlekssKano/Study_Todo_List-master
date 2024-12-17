import {TaskType} from "../TodoList";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {ToDolistType} from "../../../../../../app/App";
import {useAppSelector} from "../../../../../../app/hooks";
import {Task} from "./Task/Task";

type Props ={
    todolist:ToDolistType
}
export const Tasks=({todolist}:Props)=>{
    const tasks = useAppSelector(state=>state.tasks)

    let filteredTasks: Array<TaskType> = tasks[todolist.id]
    if (todolist.filter === 'active') {
        filteredTasks = tasks[todolist.id].filter(task => task.isDone === false)
    }

    if (todolist.filter === 'completed') {
        filteredTasks = tasks[todolist.id].filter(task => task.isDone === true)
    }

    return(
<>

    {filteredTasks.length !== 0
        ?
        <List>
            {filteredTasks.map((task)=>{
                return <Task key ={task.id} todolist={todolist} task={task} />
            })}
        </List>
        : <span>Your tasks list is empty</span>

    }
</>
    )
}