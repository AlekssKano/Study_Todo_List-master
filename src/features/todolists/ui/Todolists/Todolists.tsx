import {ToDolistType} from "../../../../app/App";
import {TaskType, TodoList} from "./Todolist/TodoList";
import {Grid2, Paper} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../../../common/hooks";
import {selectTodolists} from "../../../model/todolists_selector";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
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
