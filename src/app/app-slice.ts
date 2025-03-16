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
        error: null as string|null
    },            //подредьюсур или actionCreator

    reducers:(create)=>({
        changeThemeModeAC: create.reducer<{themeMode:ThemeMode}>((state,action)=> {
            state.themeMode = action.payload.themeMode
        }),
        setStatus:create.reducer<{status:RequestStatus}>((state,action)=> {
            state.status=action.payload.status
        }),
        setError:create.reducer<{error:string|null}>((state,action)=> {
            state.error=action.payload.error
        })
        }),
    selectors:{
        selectThemeMode:(state)=> state.themeMode,
        selectStatus:(state)=>state.status,
        selectError:(state)=>state.error
// export const selectThemeMode = (state:RootState):ThemeMode=>state.app.themeMode
    }
    })


export const appReducer=appSlice.reducer;
export const {changeThemeModeAC,setStatus,setError}=appSlice.actions
export const {selectThemeMode,selectStatus, selectError}=appSlice.selectors


// export const changeThemeModeAC = createAction<{themeMode:ThemeMode}>('app/changeThemeMode');
// export const appReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//             // логика мутабельного изменения стейта при изменении темы
//             state.themeMode=action.payload.themeMode
//         })
// })

export type ThemeMode = 'dark' | 'light'