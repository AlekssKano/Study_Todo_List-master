import {DomainTodolist} from "../../../../app/App";
import {TaskType, TodoList} from "./Todolist/TodoList";
import {Grid2, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks";
import {selectTodolists} from "../../../model/todolists_selector";
import { setTodolist} from "../../../model/todolists-slice";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTodolist())
    }, []);

    return (
        <>
            {todolists.map((tl: DomainTodolist) => {
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
