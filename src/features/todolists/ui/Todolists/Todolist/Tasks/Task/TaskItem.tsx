import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import {EditAbleSpan} from "../../../../../../../common/components/EditAbleSpan/EditAbleSpan";
import React, {ChangeEvent} from "react";
import {TasksStateType, DomainTodolist} from "../../../../../../../app/App";
import {useAppDispatch} from "../../../../../../../common/hooks";
import { updateTask, deleteTask} from "../../../../../../model/tasks-slice";
import {DomainTask} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "../../../../../../../common/enums/TaskStatus";


type Props ={
    todolist:DomainTodolist
    task: DomainTask
}
export const TaskItem =({task, todolist}:Props)=>{
    const dispatch = useAppDispatch()


    const onClickRemoveTaskHandler = () => {
        dispatch(deleteTask({taskId: task.id, todolistId: todolist.id}))
    }

        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
            const newTask = { ...task, status }
            dispatch(updateTask(newTask))

    }
    const setTaskNewTitle=(newTitle: string) => {
        const newtask={...task,  title:newTitle}
        dispatch(updateTask(newtask))

    }
    const isTaskCompleted = task.status === TaskStatus.Completed

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
                checked={isTaskCompleted}
            />

            <EditAbleSpan title={task.title} changeItemTitle={setTaskNewTitle} classes={isTaskCompleted?"task-done" : "task"}/>

        </ListItem>

    )
}