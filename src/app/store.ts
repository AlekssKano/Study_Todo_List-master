import { combineReducers, legacy_createStore as createStore } from 'redux'
import {tasksReducer, tasksSlice} from "../features/model/tasks-slice";
import {todolistsReducer, todolistsSlice} from "../features/model/todolists-slice";
import {appReducer, appSlice} from "./app-slice";
import {configureStore} from "@reduxjs/toolkit";
import {createAppSlice} from "../common/utils";
import {authReducer, authSlice} from "../features/auth/model/authSlice";
import {todolistsApi} from "../features/todolists/api/todolistsApi";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

// непосредственно создаём store
// export const store = configureStore({
//     reducer:{
//         tasks: tasksReducer,
//         todolists: todolistsReducer,
//         app: appReducer,
//     }
// })
export const store = configureStore({
    reducer:{
        [tasksSlice.name]: tasksReducer,
        [todolistsSlice.name]: todolistsReducer,
        [appSlice.name]: appReducer,
        [authSlice.name]: authReducer,
        [todolistsApi.reducerPath]:todolistsApi.reducer

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

// определить автоматически тип всего объекта состояния

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store