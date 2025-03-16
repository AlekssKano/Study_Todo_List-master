import {EditAbleSpan} from "../../../../../../common/components/EditAbleSpan/EditAbleSpan";
import {IconButton, Switch} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {useAppDispatch} from "../../../../../../common/hooks";
import {DomainTodolist} from "../../../../../../app/App";
import {changeTodolistTitle, deleteTodolist} from "../../../../../model/todolists-slice";


type Props ={
    todolist:DomainTodolist
}
export const TodolistTitle = (props:Props) => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useAppDispatch()

    // const changeTodolistTitleHandler = (newTitle: string) => {
    //     dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId: props.todolist.id}))
    // }
    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitle({title:newTitle, id: props.todolist.id}))
    }

    const removeTodoList = () => {

        // dispatch(RemoveTodolistAC({todolistId: props.todolist.id}))
         dispatch(deleteTodolist( props.todolist.id))

    }

    return (
        <>
            <EditAbleSpan title={props.todolist.title} changeItemTitle={changeTodolistTitleHandler}/>
            <IconButton size={'small'}
                        disabled={props.todolist.entityStatus==='loading'}
                        onClick={removeTodoList}>
                <DeletedIcon/>
            </IconButton>
            <Switch onChange={()=>setCollapsed(!collapsed)}
                    checked={collapsed}/>
        </>
    )
}