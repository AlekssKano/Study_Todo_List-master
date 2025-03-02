import {Container, Grid2, Paper} from "@mui/material";
import React from "react";
import AddItemForm from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {AddTodolistAC} from "../features/model/todolists-slice";
import {useAppDispatch} from "../common/hooks";
import {nanoid} from "@reduxjs/toolkit";

export const Main=()=>{

    const dispatch = useAppDispatch();
    const addTodoList = (title: string) => {

        dispatch(AddTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid2 container sx={{m:'15px', justifyContent: 'center'}}>
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