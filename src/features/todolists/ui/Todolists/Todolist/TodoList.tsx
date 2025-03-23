import React, {useRef, useState, KeyboardEvent, ChangeEvent} from "react";
import {todolistSX} from "../../../../../todolist/Todolist.styles";
import {Box} from "@mui/material";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTaskButton/FilterTasksButtons";
import AddItemForm from "../../../../../common/components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../../../../common/hooks";
import {createTask} from "../../../../model/tasks-slice";
import {DomainTodolist} from "../../../api/todolistsApi.types";

type TodoListProps = {

    todolist: DomainTodolist

}

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//

export const TodoList = ({
                             todolist
                         }: TodoListProps) => {
    // const [collapsed, setCollapsed] = useState(false)
    //
    // const setTodolistNewTitle = (newTitle: string) => {
    //     changeTodolistTitle(newTitle, todolistId)
    // }

    //JSX
    const dispatch = useAppDispatch();
    const addTask = (title: string) => {
        dispatch(createTask({title:title, todolistId:todolist.id}))
    }

    return (
        <Box sx={todolistSX}>
            {/*<TodolistHeader title={title}*/}
            {/*                isCollapsed={collapsed}*/}

            {/*                toggleTodolist={()=>setCollapsed(!collapsed)}*/}

            {/*                removeTodolist={()=>removeTodoList(todolistId)}*/}
            {/*                changeTodolistTitle={setTodolistNewTitle}*/}


            {/*                />*/}
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask} maxItemLength={120} disabled={todolist.entityStatus==='loading'}/>
            <Tasks todolist={todolist}/>
            <div>
                <FilterTasksButtons todolist={todolist}/>

            </div>
                {/*<TodolistBody*/}
                {/*    tasks={tasks}*/}
                {/*    key={todolist.id} // была ошибка на недостачу ключ, исправила сама. уточнить*/}
                {/*    filter={todolist.filter}*/}
                {/*    todolistId={todolist.id}*/}
                {/*    changetoDolistFilter={changetoDolistFilter}*/}
                {/*    removeTask={removeTask}*/}
                {/*    changeTaskStatus={changeTaskStatus}*/}
                {/*    addTask={addTask}*/}
                {/*    changeTaskTitle={changeTaskTitle}*/}
                {/*/>*/}

        </Box>

    )
}
