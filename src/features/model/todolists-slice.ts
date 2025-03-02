import {filterValuesType, DomainTodolist} from "../../app/App";
import {createAction, createAsyncThunk, createReducer, createSlice, current, nanoid} from "@reduxjs/toolkit";
import {Todolist} from "../todolists/api/todolistsApi.types";
import {todolistsApi} from "../todolists/api/todolistsApi";


export const todolistsSlice = createSlice({
    name: "Todolists",
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        // setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
        //     // return action.payload.todolists
        //     action.payload.todolists.forEach((todolist) => {
        //         state.push({...todolist, filter:'all'});
        //     })
        // }),
        RemoveTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        // ChangeTodolistTitleAC: create.reducer<{ todolistId: string, title: string }>((state, action) => {
        //     const index = state.findIndex(todolist => todolist.id === action.payload.todolistId);
        //     if (index !== -1) {
        //         state[index].title = action.payload.title
        //     }
        // }),
        ChangeTodolistFilterAC: create.reducer<{ todolistId: string, filter: filterValuesType }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.filter //another way for finding
            }
        }),
        AddTodolistAC: create.preparedReducer((title: string) => { //второй вариант
            return {
                payload: {
                    title,
                    id: nanoid()
                }
            }
        }, (state, action) => {
            const newTodolist: DomainTodolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            state.push(newTodolist)
        })


    }),
    extraReducers: (builder) => {
        builder
            .addCase(setTodolist.fulfilled, (state, action) => {
            action.payload?.todolists.forEach((todolist) => {
                state.push({...todolist, filter: 'all'});
            })
        })
        .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id);
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
        })


    }
})

export const setTodolist = createAsyncThunk(`${todolistsSlice.name}/setTodolist`,
    async (_arg, {rejectWithValue}) => {

        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
            // dispatch(setTodolistsAC({todolists:res.data}))

        } catch (error) {
            return rejectWithValue(null)
        }
    })

export const changeTodolistTitle = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitle`,
    async (args: { id: string, title: string }, {rejectWithValue}) => {
        try {
            await todolistsApi.changeTodolist(args)
            return args
        } catch (e) {
            return rejectWithValue(null)
        }
    })

export const todolistsReducer = todolistsSlice.reducer
export const {AddTodolistAC, RemoveTodolistAC, ChangeTodolistFilterAC} = todolistsSlice.actions

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