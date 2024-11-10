import React from 'react';
import {EditAbleSpan} from "../components/EditAbleSpan";
import {IconButton, Switch} from "@mui/material";
import DeletedIcon from '@mui/icons-material/Delete';
import { Checkbox } from "@mui/material"; // Правильный импорт

type TodolistHeaderPropsType={
title: string,
    removeTodolist:()=>void
    toggleTodolist:()=>void
    isCollapsed:boolean
    changeTodolistTitle:(title:string) => void

}
const TodolistHeader = (props:TodolistHeaderPropsType) => {

    return (
        <h3>
            <EditAbleSpan title={props.title} changeItemTitle={props.changeTodolistTitle}/>
            <IconButton size={'small'}
            onClick={props.removeTodolist}>
            <DeletedIcon/>
            </IconButton>
            <Switch onChange={props.toggleTodolist}
                    checked={props.isCollapsed}/>
            {/*<Checkbox*/}
            {/*    onChange={props.toggleTodolist}*/}
            {/*    checked={props.isCollapsed}*/}
            {/*/>*/}
            {/*<input type='checkbox'*/}
            {/*       onChange={props.toggleTodolist}*/}
            {/*       checked={props.isCollapsed}/>*/}
        </h3>
    );
};

export default TodolistHeader;