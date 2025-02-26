import {TaskType} from "../todolists/ui/Todolists/Todolist/TodoList";
import {
    AddTodolistAC,
    RemoveTodolistAC,
} from "./todolistsReducer";
import {TasksStateType} from "../../app/App";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
const initialState: TasksStateType = {}

export const RemoveTaskAC= createAction<{taskId: string, todolistId: string}>('tasks/RemoveTaskAC');
export const addTaskAC= createAction<{title: string, todolistId: string}>('tasks/AddTaskAC');
export const changeTaskStatusAC= createAction<{taskId: string, isDone: boolean, todolistId: string}>('tasks/ChangeTaskStatusAC');
export const changeTaskTitleAC= createAction<{taskId: string, title: string, todolistId: string}>('tasks/changeTaskTitleAC');



export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];

        })
        .addCase(AddTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(RemoveTaskAC, (state, action) => {
            // state[action.payload.todolistId] = state[action.payload.todolistId].filter(task => {
            //     return task.id !== action.payload.taskId;
            // });
const index = state[action.payload.todolistId].findIndex(tasks => tasks.id === action.payload.taskId);
if (index !== -1) {
    state[action.payload.todolistId].splice(index, 1);
}
        })
        .addCase(addTaskAC, (state, action) => {
            // state[action.payload.todolistId] = [{
            //     id: nanoid(),
            //     title: action.payload.title,
            //     isDone : false
            // }, ...state[action.payload.todolistId]]
            state[action.payload.todolistId].unshift({    id: nanoid(), title: action.payload.title, isDone : false})
        })


        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const task = tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.title = action.payload.title;
            }


        })

})

// export type RemoveTasksActionType = ReturnType<typeof RemoveTaskAC>
// export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
//
//
// type ActionType =
//     RemoveTasksActionType
//     | AddTaskActionType
//     | ChangeTaskStatus
//     | ChangeTaskTitleAC}
