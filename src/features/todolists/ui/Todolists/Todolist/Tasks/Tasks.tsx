import {TaskType} from "../TodoList";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {DomainTodolist} from "../../../../../../app/App";
import {useAppSelector} from "../../../../../../common/hooks";
import {Task} from "./Task/Task";
import {selectTasks} from "../../../../../model/tasks_selectors";
import {selectTasksS} from "../../../../../model/tasks-slice";

type Props ={
    todolist:DomainTodolist
}
export const Tasks=({todolist}:Props)=>{
    // const tasks = useAppSelector(selectTasks)
    const tasks = useAppSelector(selectTasksS) // не работает
    // const tasks = useAppSelector(state=>state.tasks)



const todolistTasks=tasks[todolist.id]
    let filteredTasks: Array<TaskType> = todolistTasks
    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return(
<>

    {filteredTasks && filteredTasks.length !== 0
        ?
        <List>
            { filteredTasks && filteredTasks.map((task)=>{
                return <Task key ={task.id} todolist={todolist} task={task} />
            })}
        </List>
        : <span>Your tasks list is empty</span>

    }
</>
    )
}