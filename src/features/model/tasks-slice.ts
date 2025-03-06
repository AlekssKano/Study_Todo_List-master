import {TaskType} from "../todolists/ui/Todolists/Todolist/TodoList";
import {
    AddTodolistAC,
    RemoveTodolistAC,
} from "./todolists-slice";
import {DomainTodolist, TasksStateType} from "../../app/App";
import {createAction, createReducer, createSlice, nanoid} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {tasksApi} from "../todolists/api/tasksApi";
import {createAppSlice} from "../../common/utils";

const initialState: TasksStateType = {}
export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: create => ({
        RemoveTaskAC: create.reducer<{ taskId: string, todolistId: string }>((state, action) => {
            const index = state[action.payload.todolistId].findIndex(tasks => tasks.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        }),
        addTaskAC: create.reducer<{ title: string, todolistId: string }>((state, action) => {
            state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})

        }),
        changeTaskStatusAC: create.reducer<{ taskId: string, isDone: boolean, todolistId: string }>((state, action) => {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        }),
        changeTaskTitleAC: create.reducer<{ taskId: string, title: string, todolistId: string }>((state, action) => {
            const tasks = state[action.payload.todolistId];
            const task = tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.title = action.payload.title;
            }
        }),
        fetchTasks: create.asyncThunk(
            async (todolistId: string, { rejectWithValue }) => {
                try {
                    const res = await tasksApi.getTasks(todolistId)
                    return { tasks: res.data.items, todolistId }
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    // state[action.payload.todolistId] = action.payload.tasks

                },
            },
        ),

    }),
    extraReducers: (builder) => {
        builder.addCase(AddTodolistAC, (state, action) => {
            state[action.payload.id] = []

        })
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];

        })
    },
    selectors:{
        selectTasksS: (sliceState)=>sliceState
    }
})

export const {RemoveTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasksS} = tasksSlice.selectors






// //     export const RemoveTaskAC= createAction<{taskId: string, todolistId: string}>('tasks/RemoveTaskAC');
// // export const addTaskAC= createAction<{title: string, todolistId: string}>('tasks/AddTaskAC');
// // export const changeTaskStatusAC= createAction<{taskId: string, isDone: boolean, todolistId: string}>('tasks/ChangeTaskStatusAC');
// // export const changeTaskTitleAC= createAction<{taskId: string, title: string, todolistId: string}>('tasks/changeTaskTitleAC');
// //
//
//
// export const _tasksReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(RemoveTodolistAC, (state, action) => {
//             delete state[action.payload.todolistId];
//
//         })
//         .addCase(AddTodolistAC, (state, action) => {
//             state[action.payload.id] = []
//         })
//         .addCase(RemoveTaskAC, (state, action) => {
//             // state[action.payload.todolistId] = state[action.payload.todolistId].filter(task => {
//             //     return task.id !== action.payload.taskId;
//             // });
//             const index = state[action.payload.todolistId].findIndex(tasks => tasks.id === action.payload.taskId);
//             if (index !== -1) {
//                 state[action.payload.todolistId].splice(index, 1);
//             }
//         })
//         .addCase(addTaskAC, (state, action) => {
//             // state[action.payload.todolistId] = [{
//             //     id: nanoid(),
//             //     title: action.payload.title,
//             //     isDone : false
//             // }, ...state[action.payload.todolistId]]
//             state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})
//         })
//
//
//         .addCase(changeTaskStatusAC, (state, action) => {
//             const tasks = state[action.payload.todolistId]
//             const task = tasks.find(t => t.id === action.payload.taskId)
//             if (task) {
//                 task.isDone = action.payload.isDone
//             }
//         })
//         .addCase(changeTaskTitleAC, (state, action) => {
//             const tasks = state[action.payload.todolistId];
//             const task = tasks.find(t => t.id === action.payload.taskId);
//             if (task) {
//                 task.title = action.payload.title;
//             }
//
//
//         })
//
// })

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
