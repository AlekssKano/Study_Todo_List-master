import React from 'react';

type TodolistHeaderPropsType={
title: string,
    removeTodolist:()=>void
    toggleTodolist:()=>void
    isCollapsed:boolean

}
const TodolistHeader = (props:TodolistHeaderPropsType) => {
    return (
        <h3>{props.title}
            <button onClick={props.removeTodolist}>x</button>
            <input type='checkbox'
                   onChange={props.toggleTodolist}
                   checked={props.isCollapsed}/>
        </h3>
    );
};

export default TodolistHeader;