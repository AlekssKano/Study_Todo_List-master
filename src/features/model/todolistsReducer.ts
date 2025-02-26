import {filterValuesType, ToDolistType} from "../../app/App";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {v1} from "uuid";

const initialState: ToDolistType[] = []

export const RemoveTodolistAC = createAction<{ todolistId: string }>("todolists/RemoveTodolistAC");
export const AddTodolistAC = createAction('todolists/AddTodolistAC', (title: string) => {
    return {payload: {title, id: nanoid()}}
});
export const ChangeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>("todolists/changeTodolistTitle");
export const ChangeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: filterValuesType
}>("todolists/changeTodolistFilter");

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(RemoveTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(AddTodolistAC, (state, action) => {
            state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
        })
        .addCase(ChangeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(ChangeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.filter //another way for finding
            }
        })
})


