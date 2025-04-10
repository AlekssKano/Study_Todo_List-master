import { TodoList} from "./Todolist/TodoList";
import {Grid2, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks";
import {fetchTodolists, selectTodolistsS} from "../../../model/todolists-slice";
// import {selectTodolists} from "../../../model/todolists_selector";
import {useSelector} from "react-redux";
import {DomainTodolist} from "../../api/todolistsApi.types";
import {useGetTodolistsQuery} from "../../api/todolistsApi";


export const Todolists = () => {
    // const todolists = useAppSelector(selectTodolists)
    const todolists = useAppSelector(selectTodolistsS)
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     // dispatch(setTodolist())
    //     dispatch(fetchTodolists())
    // }, []); ВМЕСТО ЭТОГО ИСПОЛЬЗУЕМ ЭТО =>
    const res = useGetTodolistsQuery()
console.log(res)
    return (
        <>
            {res.data?.map((tl: DomainTodolist) => {
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
