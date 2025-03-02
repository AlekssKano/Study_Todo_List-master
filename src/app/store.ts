import { combineReducers, legacy_createStore as createStore } from 'redux'
import {tasksReducer} from "../features/model/tasks-slice";
import {todolistsReducer} from "../features/model/todolists-slice";
import {appReducer} from "./app-slice";
import {configureStore} from "@reduxjs/toolkit";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

// непосредственно создаём store
export const store = configureStore({
    reducer:{
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
    }
})

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store