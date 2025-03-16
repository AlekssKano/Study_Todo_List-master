import {setError, setStatus} from "../../app/app-slice";
import {Dispatch} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

export const handleServerNetworkError =(dispatch:Dispatch, error:unknown)=>{
let errorMessage

    if(axios.isAxiosError(error)){
        //проверяет ошибка ли эта серверная
        errorMessage = error.message;
    }else if(error instanceof Error){
        errorMessage = error.message;
    }else{
        errorMessage=JSON.stringify(error);
    }
    dispatch(setError({ error: errorMessage}))
    dispatch(setStatus({status: 'failed'}))
}