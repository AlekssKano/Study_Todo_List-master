import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import {EditAbleSpan} from "../../../../../../../common/components/EditAbleSpan/EditAbleSpan";
import React, {ChangeEvent} from "react";
import {TasksStateType, ToDolistType} from "../../../../../../../app/App";
import {TaskType} from "../../TodoList";
import {RemoveTodolistAC} from "../../../../../../../reducers/todolistsReducer";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../../../reducers/tasksReducer";
import {useAppDispatch} from "../../../../../../../app/hooks";

type Props ={
    todolist:ToDolistType
    task: TaskType
}
export const Task =({task, todolist}:Props)=>{
    const dispatch = useAppDispatch()


    const onClickRemoveTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
    }

        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ taskId:task.id, isDone:newStatus, todolistId:todolist.id}))

    }
    const setTaskNewTitle=(newTitle: string) => {
       let newTitleTask = newTitle
        dispatch(changeTaskTitleAC({todolistId:todolist.id, taskId:task.id, title:newTitleTask}))

    }

    return(
        <ListItem
                  disablePadding
                  className={'task'}
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

            <EditAbleSpan title={task.title} changeItemTitle={setTaskNewTitle} classes={task.isDone?"task-done" : "task"}/>

        </ListItem>

    )
}