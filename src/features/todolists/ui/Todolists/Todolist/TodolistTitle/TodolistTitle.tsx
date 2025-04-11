import {EditAbleSpan} from "../../../../../../common/components/EditAbleSpan/EditAbleSpan";
import {IconButton, Switch} from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {useAppDispatch} from "../../../../../../common/hooks";
import {changeTodolistTitle, deleteTodolist} from "../../../../../model/todolists-slice";
import {DomainTodolist} from "../../../../api/todolistsApi.types";
import {useChangeTodolistTitleMutation, useDeleteTodolistMutation} from "../../../../api/todolistsApi";


type Props ={
    todolist:DomainTodolist
}
export const TodolistTitle = ({todolist}:Props) => {
    const {id,title, entityStatus}=todolist
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useAppDispatch()

    // const changeTodolistTitleHandler = (newTitle: string) => {
    //     dispatch(ChangeTodolistTitleAC({title:newTitle, todolistId: props.todolist.id}))
    // }
    // const changeTodolistTitleHandler = (newTitle: string) => {
    //     dispatch(changeTodolistTitle({title:newTitle, id: props.todolist.id}))
    // }

    // const removeTodoList = () => {
    //
    //     // dispatch(RemoveTodolistAC({todolistId: props.todolist.id}))
    //      dispatch(deleteTodolist( props.todolist.id))
    //
    // } вместо этого=>>
    const [deleteTodolist]=useDeleteTodolistMutation()
    const [changeTodolistTitle]=useChangeTodolistTitleMutation()

    const deleteTodolistHandler=()=>{
        deleteTodolist(id)
    }
    const changeTodolistTitleHandler=(title:string)=>{
        changeTodolistTitle({id, title})
    }

    return (
        <>
            <EditAbleSpan title={title}
                          disabled={entityStatus==='loading'}
                          changeItemTitle={changeTodolistTitleHandler}/>
            <IconButton size={'small'}
                        disabled={entityStatus==='loading'}
                        onClick={deleteTodolistHandler}>
                <DeletedIcon/>
            </IconButton>
            <Switch onChange={()=>setCollapsed(!collapsed)}
                    checked={collapsed}/>
        </>
    )
}