import type { Dispatch } from "@reduxjs/toolkit"
import {setError, setStatus} from "../../app/app-slice";
import {BaseResponse} from "../types";

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    dispatch(setStatus({status: 'failed'}))
    dispatch(setError({ error: data.messages.length?  data.messages[0]:'Some error occurred'}))
}
