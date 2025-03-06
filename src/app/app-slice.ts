import { createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appSlice=createSlice({
    name: "app",
    initialState:{
        themeMode:"light" as ThemeMode,
    },            //подредьюсур или actionCreator

    reducers:(create)=>({
        changeThemeModeAC: create.reducer<{themeMode:ThemeMode}>((state,action)=> {
            state.themeMode = action.payload.themeMode
        }),
        }),
    selectors:{
        selectThemeMode:(state)=> state.themeMode
// export const selectThemeMode = (state:RootState):ThemeMode=>state.app.themeMode
    }
    })


export const appReducer=appSlice.reducer;
export const {changeThemeModeAC}=appSlice.actions
export const {selectThemeMode}=appSlice.selectors


// export const changeThemeModeAC = createAction<{themeMode:ThemeMode}>('app/changeThemeMode');
// export const appReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//             // логика мутабельного изменения стейта при изменении темы
//             state.themeMode=action.payload.themeMode
//         })
// })

export type ThemeMode = 'dark' | 'light'