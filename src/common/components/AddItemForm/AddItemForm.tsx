import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
type AddItemFormPropsType = {
    addItem:(title:string)=>void
    maxItemLength:number

}
const AddItemForm = ({addItem,
    maxItemLength

}:AddItemFormPropsType) => {
    //local states
    const [inputError, setInputError] = useState<boolean>(false)
    const [titleInputValue, setTitleInputValue] = useState<string>("")

//handler
    const onClickAddItemHandler = () => {
        const trimmedTitle = titleInputValue.trim()
        if (!isInputBtrDisabled && !userErrorMessage && trimmedTitle) {
            addItem(trimmedTitle)
            // addTask(titleInputValue) было так, я исправила, проверь потом
        } else {
            setInputError(true)

        }
        setTitleInputValue("")
    }
    const onKeyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isInputBtrDisabled && !userErrorMessage) {
            onClickAddItemHandler()
        }
    }
    const onChangeSetTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    }


//local variables
    const isInputBtrDisabled = !titleInputValue
    const userLengthMessage = `There are ${maxItemLength - titleInputValue.length}  character left to enter`
    const userErrorMessage = titleInputValue.length > maxItemLength


    return (
        <div>
            <TextField
                variant="outlined"
                size="small"
                value={titleInputValue}
                onChange={onChangeSetTitleInputValueHandler}
                onKeyDown={onKeyDownAddItemHandler}
                error={inputError}
                helperText={inputError &&'Title is required'}
            />


            {/*<input value={titleInputValue}*/}
            {/*       onChange={onChangeSetTitleInputValueHandler}*/}
            {/*       onKeyDown={onKeyDownAddItemHandler}*/}
            {/*       className={inputError ? 'input-error' : undefined}/>*/}
            <Button variant={'contained'}
                    // size={"small"}
                    color={"primary"}
                    sx={{m:' 0 15px'}}
                    disabled={isInputBtrDisabled || userErrorMessage}
                    onClick={onClickAddItemHandler}
                    endIcon={<AddCircleOutlineIcon/>}
            >add</Button>
            {isInputBtrDisabled && !inputError && <div>Max length task title is {maxItemLength} characters</div>}
            {!isInputBtrDisabled && !userErrorMessage && !inputError && <div>{userLengthMessage}</div>}
            {userErrorMessage && <div style={{color: "red"}}>Max length task title is too long</div>}
            {/*{inputError && <div style={{color: 'red'}}>Title is required</div>}*/}
        </div>
    );
};

export default AddItemForm;