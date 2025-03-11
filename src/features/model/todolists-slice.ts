import {filterValuesType, DomainTodolist} from "../../app/App";
import {createAction, createAsyncThunk, createReducer, createSlice, current, nanoid} from "@reduxjs/toolkit";
import {Todolist} from "../todolists/api/todolistsApi.types";
import {todolistsApi} from "../todolists/api/todolistsApi";
import {RootState} from "../../app/store";
import {createAppSlice} from "../../common/utils";
import {setStatus} from "../../app/app-slice";


export const todolistsSlice = createAppSlice({
    name: "Todolists",
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({


        ChangeTodolistFilterAC: create.reducer<{ todolistId: string, filter: filterValuesType }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.filter //another way for finding
            }
        }),

        fetchTodolists: create.asyncThunk(
            async (_arg, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setStatus({status: 'loading'}))

                    //waiter
                    await new Promise(resolve =>  {
                        setTimeout(resolve, 2000)
                    })
                    const res = await todolistsApi.getTodolists()
                    thunkAPI.dispatch(setStatus({status: 'succeeded'}))

                    return {todolists: res.data}
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach((tl) => {
                        state.push({...tl, filter: "all"})
                    })
                },
            },
        ),
        changeTodolistTitle: create.asyncThunk(
             async (args: { id: string, title: string }, {dispatch,rejectWithValue}) => {
                try {
                    dispatch(setStatus({ status: 'loading' }))

                    await todolistsApi.changeTodolist(args)
                    dispatch(setStatus({ status: 'succeeded' }))

                    return {args}
                } catch (error) {
                    return rejectWithValue(null)
                    return {args}
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

                    return res.data.data.item;
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({...action.payload, filter: "all"})

                },
            },
        ),
        deleteTodolist: create.asyncThunk(
             async (id: string, thunkAPI) => {
                        try {
                            thunkAPI.dispatch(setStatus({ status: 'loading' }))

                            await todolistsApi.deleteTodolist(id)
                            thunkAPI.dispatch(setStatus({ status: 'succeeded' }))

                            return {id}
                } catch (error) {
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
export const todolistsReducer = todolistsSlice.reducer
export const {deleteTodolist,createTodolist,changeTodolistTitle,fetchTodolists, ChangeTodolistFilterAC} = todolistsSlice.actions


export const {selectTodolistsS} = todolistsSlice.selectors

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