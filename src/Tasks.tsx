import {TaskType} from "./todolist/TodoList";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import {EditAbleSpan} from "./components/EditAbleSpan";

export const Tasks=()=>{


    return(

        {tasks.length !== 0
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

                        <EditAbleSpan title={task.title} changeItemTitle={setTaskNewTitle} classes={task.isDone?"task-done" : "task"}/>

                    </ListItem>

                )
            })
            : <span>Your tasks list is empty</span>

}
    )
}