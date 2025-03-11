import { createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {RequestStatus} from "../common/types";

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appSlice=createSlice({
    name: "app",
    initialState:{
        themeMode:"light" as ThemeMode,
        status: 'idle' as RequestStatus,
    },            //подредьюсур или actionCreator

    reducers:(create)=>({
        changeThemeModeAC: create.reducer<{themeMode:ThemeMode}>((state,action)=> {
            state.themeMode = action.payload.themeMode
        }),
        setStatus:create.reducer<{status:RequestStatus}>((state,action)=> {
            state.status=action.payload.status
        })
        }),
    selectors:{
        selectThemeMode:(state)=> state.themeMode,
        selectStatus:(state)=>state.status
// export const selectThemeMode = (state:RootState):ThemeMode=>state.app.themeMode
    }
    })


export const appReducer=appSlice.reducer;
export const {changeThemeModeAC,setStatus}=appSlice.actions
export const {selectThemeMode,selectStatus}=appSlice.selectors


// export const changeThemeModeAC = createAction<{themeMode:ThemeMode}>('app/changeThemeMode');
// export const appReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//             // логика мутабельного изменения стейта при изменении темы
//             state.themeMode=action.payload.themeMode
//         })
// })

export type ThemeMode = 'dark' | 'light'