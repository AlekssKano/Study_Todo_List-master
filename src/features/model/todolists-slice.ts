import {createAction, createAsyncThunk, createReducer, createSlice, current, nanoid} from "@reduxjs/toolkit";
import {DomainTodolist, DomainTodolistSchema, filterValuesType, Todolist} from "../todolists/api/todolistsApi.types";
import {todolistsApi} from "../todolists/api/todolistsApi";
import {RootState} from "../../app/store";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {setError, setStatus} from "../../app/app-slice";
import {RequestStatus} from "../../common/types";
import {ResultCode} from "../../common/enums/enums";
import {tasksApi} from "../todolists/api/tasksApi";
import {DomainTaskSchema} from "../todolists/api/tasksApi.types";


export const todolistsSlice = createAppSlice({
    name: "Todolists",
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({


        ChangeTodolistFilterAC: create.reducer<{ todolistId: string, filter: filterValuesType }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.filter //another way for finding
            }
        }),ChangeTodolistEntityStatusAC: create.reducer<{ todolistId: string, entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus //another way for finding
            }
        }),

        fetchTodolists: create.asyncThunk(
            async (_arg, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setStatus({status: 'loading'}))

                    //waiter
                    const res = await todolistsApi.getTodolists()
                    DomainTodolistSchema.array().parse(res.data)

                    thunkAPI.dispatch(setStatus({status: 'succeeded'}))

                    return {todolists: res.data}
                } catch (error) {
                    handleServerNetworkError(thunkAPI.dispatch, error)
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    // action.payload?.todolists.forEach((tl) => {
                    //     state.push({...tl, filter: "all", entityStatus:'idle'})
                    // })
                    return action.payload.todolists.map((tl)=>{
                        return {...tl, filter: "all", entityStatus:'idle'}
                    })
                },
            },
        ),

        changeTodolistTitle: create.asyncThunk(
             async (args: { id: string, title: string }, {dispatch,rejectWithValue}) => {
                try {
                    dispatch(setStatus({ status: 'loading' }))
                    const res =await todolistsApi.changeTodolist(args)
                    dispatch(setStatus({ status: 'succeeded' }))
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setStatus({status: 'succeeded'}))
                        return {args}
                    }
                    else{
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
                    const index = state.findIndex(todolist => todolist.id === action.payload.args.id);
                    if (index !== -1) {
                        state[index].title = action.payload.args.title
                    }
                },
            },
        ),
        createTodolist: create.asyncThunk(
             async (title: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setStatus({ status: 'loading' }))

                    const res = await todolistsApi.createTodolist(title)
                    thunkAPI.dispatch(setStatus({ status: 'succeeded' }))


                    if(res.data.resultCode===ResultCode.Success){
                        thunkAPI.dispatch(setStatus({status: 'succeeded'}))
                        return res.data.data.item;
                    }
                    else{
                        handleServerAppError(res.data,thunkAPI.dispatch)
                        // thunkAPI.dispatch(setStatus({status: 'failed'}))
                        // thunkAPI.dispatch(setError({ error: res.data.messages.length?  res.data.messages[0]:'Some error occurred'}))
                        return thunkAPI.rejectWithValue(null)

                    }
                } catch (error) {
                    handleServerNetworkError(thunkAPI.dispatch,error )
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({...action.payload, filter: "all",entityStatus:'idle'})

                },
            },
        ),
        deleteTodolist: create.asyncThunk(
             async (id: string, thunkAPI) => {
                        try {
                            thunkAPI.dispatch(setStatus({ status: 'loading' }))
                            thunkAPI.dispatch(ChangeTodolistEntityStatusAC({entityStatus:'loading',todolistId:id}))

                            const res =await todolistsApi.deleteTodolist(id)
                            thunkAPI.dispatch(setStatus({ status: 'succeeded' }))
                            if(res.data.resultCode===ResultCode.Success){
                                thunkAPI.dispatch(setStatus({status: 'succeeded'}))
                                return {id}
                            }
                            else{
                                thunkAPI.dispatch(setStatus({status: 'failed'}))
                                thunkAPI.dispatch(setError({error: res.data.messages.length ? res.data.messages[0] : 'Some error occurred'}))
                                return thunkAPI.rejectWithValue(null)
                            }
                } catch (error) {
                            handleServerNetworkError(thunkAPI.dispatch,error )
                            thunkAPI.dispatch(ChangeTodolistEntityStatusAC({entityStatus:'idle',todolistId:id}))
                            return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                },
            },
        ),


    }),

    selectors: {
        selectTodolistsS: (state) => state
    }
})
export const todolistsReducer = todolistsSlice.reducer
export const {deleteTodolist,createTodolist,changeTodolistTitle,fetchTodolists, ChangeTodolistFilterAC,ChangeTodolistEntityStatusAC} = todolistsSlice.actions


export const {selectTodolistsS} = todolistsSlice.selectors



// export const setTodolist = createAsyncThunk(`${todolistsSlice.name}/setTodolist`,
//     async (_arg, {rejectWithValue}) => {
//
//         try {
//             const res = await todolistsApi.getTodolists()
//             return {todolists: res.data}
//         } catch (error) {
//             return rejectWithValue(null)
//         }
//     })
//
// export const changeTodolistTitle = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitle`,
//     async (args: { id: string, title: string }, {rejectWithValue}) => {
//         try {
//             await todolistsApi.changeTodolist(args)
//             return args
//         } catch (e) {
//             return rejectWithValue(null)
//         }
//     })

// export const createTodolistTC = createAsyncThunk(`${todolistsSlice.name}/AddTodolistAC`,
//     async (title: string, thunkAPI) => {
//         try {
//             // await todolistsApi.createTodolist(title)
//             // return title
//             const res = await todolistsApi.createTodolist(title)
//             // {  res.data.data.item }
//             return res.data.data.item;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(null)
//         }
//     })

// export const deleteTodolistTC = createAsyncThunk(
//     `${todolistsSlice.name}/deleteTodolistTC`,
//     async (id: string, thunkAPI) => {
//         try {
//             await todolistsApi.deleteTodolist(id)
//             return {id}
//         } catch (error) {
//             return thunkAPI.rejectWithValue(null)
//         }
//     },
// )

//
// export const _todolistsReducer = createReducer(initialState, builder => {
//     builder
// .addCase(RemoveTodolistAC, (state, action) => {
//     const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
//     if (index !== -1) {
//         state.splice(index, 1)
//     }
// })
// .addCase(AddTodolistAC, (state, action) => {
//     state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
// })
// .addCase(ChangeTodolistTitleAC, (state, action) => {
//     const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
//     if (index !== -1) {
//         state[index].title = action.payload.title
//     }
// })
// .addCase(ChangeTodolistFilterAC, (state, action) => {
//     const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
//     if (todolist) {
//         todolist.filter = action.payload.filter //another way for finding
//     }
// })
// })


// const initialState: ToDolistType[] = []

// export const RemoveTodolistAC = createAction<{ todolistId: string }>("todolists/RemoveTodolistAC");
// export const AddTodolistAC = createAction('todolists/AddTodolistAC', (title: string) => {
//     return {payload: {title, id: nanoid()}}
// });
// export const ChangeTodolistTitleAC = createAction<{
//     todolistId: string,
//     title: string
// }>("todolists/changeTodolistTitle");
// export const ChangeTodolistFilterAC = createAction<{
//     todolistId: string,
//     filter: filterValuesType
// }>("todolists/changeTodolistFilter");