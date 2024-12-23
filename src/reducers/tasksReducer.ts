import {v1} from "uuid";
import {TaskType} from "../features/todolists/ui/Todolists/Todolist/TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";
import {TasksStateType} from "../app/App";

const initialState: TasksStateType = {}
type ActionType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatus
    | ChangeTaskTitleAC
    | RemoveTodolistActionType
    | AddTodolistActionType


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TASKS":
            // const {todolistId, tasksId} = action.payload //var1
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => {
                    return task.id !== action.payload.taskId
                })
            };
        case "ADD-TASK":
            let newTask: TaskType =
                {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                };

            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]};
        case "CHANGE-TASK_STATUS":

            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        case "CHANGE-TASK_TITLE":

            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]:[]}
        }
        default:
            return state
    }
}


//action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => ({
    type: "REMOVE_TASKS",
    payload
} as const)


export const addTaskAC = (payload: { title: string, todolistId: string }) => ({
    type: "ADD-TASK",
    payload
} as const)

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => ({
    type: "CHANGE-TASK_STATUS",
    payload
} as const)

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => ({
    type: "CHANGE-TASK_TITLE",
    payload
} as const)
//action types

export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
