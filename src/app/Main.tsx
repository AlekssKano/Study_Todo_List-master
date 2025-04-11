import {Container, Grid2} from "@mui/material";
import React from "react";
import AddItemForm from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks";
import {createTodolist} from "../features/model/todolists-slice";
import {useCreateTodolistMutation} from "../features/todolists/api/todolistsApi";


export const Main = () => {

    // const dispatch = useAppDispatch();
    // // const isLoggedIn=useAppSelector(selectIsLoggedIn)
    // const addTodoList = (title: string) => {
    //     dispatch(createTodolist(title))
    // }
    const [createTodolist, res]=useCreateTodolistMutation()

    const createTodolistHandler=(title:string)=>{
        createTodolist(title)
    }
    return (
        <Container fixed>
            <Grid2 container sx={{m: '15px', justifyContent: 'center'}}>
                <AddItemForm
                    addItem={createTodolistHandler}
                    maxItemLength={12}/>
            </Grid2>
            < Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}