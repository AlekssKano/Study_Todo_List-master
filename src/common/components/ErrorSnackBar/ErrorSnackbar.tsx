import { SyntheticEvent, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectError, setError} from "../../../app/app-slice";

export const ErrorSnackbar = () => {
    // const [open, setOpen] = useState(true)

    const error = useAppSelector(selectError)
    const dispatch= useAppDispatch()
    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setError({error:null}))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}            </Alert>
        </Snackbar>
    )
}