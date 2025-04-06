import {Container, Grid2, Paper} from "@mui/material";
import React from "react";
import AddItemForm from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppDispatch, useAppSelector} from "../common/hooks";
import {nanoid} from "@reduxjs/toolkit";
import {createTodolist} from "../features/model/todolists-slice";
import {Navigate} from "react-router-dom";
import {Path} from "../common/routing/Routing";
import {selectIsLoggedIn} from "../features/auth/model/authSlice";

export const Main = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn=useAppSelector(selectIsLoggedIn)
    const addTodoList = (title: string) => {
        dispatch(createTodolist(title))
    }
    if(!isLoggedIn)
    {    return <Navigate to={Path.Login}/>
    }
    return (
        <Container fixed>
            <Grid2 container sx={{m: '15px', justifyContent: 'center'}}>
                <AddItemForm
                    addItem={addTodoList}
                    maxItemLength={12}/>
            </Grid2>
            < Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}