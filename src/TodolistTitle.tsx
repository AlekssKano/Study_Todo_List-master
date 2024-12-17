import {EditAbleSpan} from "./components/EditAbleSpan";
import {IconButton, Switch} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolistsReducer";
import {useAppDispatch} from "./app/hooks";
import {ToDolistType} from "./app/App";


type Props ={
    todolist:ToDolistType
}
export const TodolistTitle = (props:Props) => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useAppDispatch()

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId: props.todolist.id}))
    }

    const removeTodoList = () => {

        dispatch(RemoveTodolistAC(props.todolist.id))
    }

    return (
        <>
            <EditAbleSpan title={props.todolist.title} changeItemTitle={changeTodolistTitle}/>
            <IconButton size={'small'}
                        onClick={removeTodoList}>
                <DeletedIcon/>
            </IconButton>
            <Switch onChange={()=>setCollapsed(!collapsed)}
                    checked={collapsed}/>
        </>
    )
}