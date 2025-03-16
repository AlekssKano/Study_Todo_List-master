import type { Dispatch } from "@reduxjs/toolkit"
import {setError, setStatus} from "../../app/app-slice";
import {BaseResponse} from "../types";

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    dispatch(setStatus({status: 'failed'}))
    dispatch(setError({ error: data.messages.length?  data.messages[0]:'Some error occurred'}))
}
export const numbers =[1,2,3,4,5]
const idEven =(num:number)=>num%2===0
export const filteredArr=(arr:number[], func:(item:number)=>boolean):number[]=>{
    return arr.filter(func)
}
console.log(filteredArr(numbers,idEven))

function filteredGenerArr<T>(arr:T[],func:(item:T)=>boolean):T[]{
    return arr.filter(func)

}

function mapArray(arr:number[],transform:(val:number)=>string):string[]{

    return arr.map(transform)
}