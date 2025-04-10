import {
    createTodolist,
    deleteTodolist,
} from "./todolists-slice";
import {createAction, createReducer, createSlice, nanoid} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {tasksApi} from "../todolists/api/tasksApi";
import {createAppSlice, handleServerNetworkError} from "../../common/utils";
import {
    CreateTaskArgs,
    DeleteTaskArgs,
    DomainTask,
    DomainTaskSchema,
    UpdateTaskModel
} from "../todolists/api/tasksApi.types";
import {setError, setStatus} from "../../app/app-slice";
import {_todolistsApi} from "../todolists/api/todolistsApi";
import {ResultCode} from "../../common/enums/enums";
import {clearDataAC} from "../../common/actions";

export type TasksState = Record<string, DomainTask[]>


// const initialState: TasksStateType = {}
export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: create => ({
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
        // 📗 thunk
        fetchTasks: create.asyncThunk(
            async (todolistId: string, {rejectWithValue, dispatch}) => {
                try {
                    dispatch(setStatus({status: 'loading'}))

                    //waiter
                    const res = await tasksApi.getTasks(todolistId)
                    //ZOD
                    DomainTaskSchema.array().parse(res.data.items)
                    dispatch(setStatus({status: 'succeeded'}))
                    return {tasks: res.data.items, todolistId}
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                },
            },
        ),
        createTask: create.asyncThunk(
            async (args: CreateTaskArgs, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setStatus({status: 'loading'}))
                    //waiter
                    await new Promise(resolve => {
                        setTimeout(resolve, 2000)
                    })
                    const res = await tasksApi.createTask(args.todolistId, args.title)
                    debugger
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setStatus({status: 'succeeded'}))
                        return {task: res.data.data.item}
                    } else {
                        dispatch(setStatus({status: 'failed'}))
                        dispatch(setError({error: res.data.messages.length ? res.data.messages[0] : 'Some error occurred'}))
                        return rejectWithValue(null)

                    }
                } catch (error: any) {
                    // dispatch(setError({ error: error.message}))
                    // dispatch(setStatus({status: 'failed'}))
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                },
            },
        ),
        deleteTask: create.asyncThunk(
            async (args: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
                try {
                    const res = await tasksApi.deleteTask(args.todolistId, args.taskId)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setStatus({status: 'succeeded'}))
                        return args
                    } else {
                        dispatch(setStatus({status: 'failed'}))
                        dispatch(setError({error: res.data.messages.length ? res.data.messages[0] : 'Some error occurred'}))
                        return rejectWithValue(null)

                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const tasks = state[action.payload.todolistId]
                    const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                    if (index !== -1) {
                        tasks.splice(index, 1)
                    }
                },
            },
        ), updateTask: create.asyncThunk(
            async (task: DomainTask, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setStatus({status: 'loading'}))

                    //waiter
                    await new Promise(resolve => {
                        setTimeout(resolve, 2000)
                    })
                    const model: UpdateTaskModel = {
                        status: task.status,
                        title: task.title,
                        priority: task.priority,
                        deadline: task.deadline,
                        description: task.description,
                        startDate: task.startDate,
                    }

                    const res = await tasksApi.updateTask(task.todoListId, model, task.id)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setStatus({status: 'succeeded'}))
                        return task
                    } else {
                        dispatch(setStatus({status: 'failed'}))
                        dispatch(setError({error: res.data.messages.length ? res.data.messages[0] : 'Some error occurred'}))
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.todoListId].find((task) => task.id === action.payload.id)
                    if (task) {
                        task.title = action.payload.title
                        task.status = action.payload.status

                    }
                },
            },
        ),
    }),
    extraReducers: (builder) => {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.id] = []

        })
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id];

        })
        builder.addCase(clearDataAC, (state) => {
            return {}
        })
    },
    selectors: {
        selectTasksS: (sliceState) => sliceState
    }
})

export const {deleteTask, createTask, updateTask, fetchTasks} = tasksSlice.actions
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
