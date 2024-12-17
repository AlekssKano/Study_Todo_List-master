import {ToDolistType} from "../../../../app/App";
import {TaskType, TodoList} from "./Todolist/TodoList";
import {Grid2, Paper} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../../../app/hooks";


export const Todolists = () => {
    const todolists = useAppSelector((state)=>state.todolists)
    console.log(todolists)

    return (
        <>
            {todolists.map((tl: ToDolistType) => {
                    return (
                        <Grid2 key={tl.id}>
                            <Paper elevation={8}>
                                <TodoList
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid2>
                    )
                }
            )
            }


        </>
    )
}
