import {ToDolistType} from "./app/App";
import {TaskType, TodoList} from "./todolist/TodoList";
import {Grid2, Paper} from "@mui/material";
import React from "react";

export const Todolists=()=>{

    return(
        <>
                { todolists.map((tl: ToDolistType) => {
                    let filteredTasks: Array<TaskType> = tasks[tl.id]
                    if (tl.filter === 'active') {
                        filteredTasks = tasks[tl.id].filter(task => task.isDone === false)
                    }

                    if (tl.filter === 'completed') {
                        filteredTasks = tasks[tl.id].filter(task => task.isDone === true)
                    }
                    return (
                        <Grid2 key={tl.id}>
                            <Paper elevation={8}>
                                <TodoList
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changetoDolistFilter={changeTodoListFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>

        </>

    )
}