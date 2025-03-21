import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditAbleSpanProps = {
    title: string
    changeItemTitle:(newTitle:string) => void
    classes?:string
    disabled?:boolean

}
export const EditAbleSpan = ({
                                 title,
                                 changeItemTitle,
    classes,disabled
                             }: EditAbleSpanProps) => {
    //state
    const [titleInputValue, setTitleInputValue] = useState<string>(title)
    const [editMode, setEditMode] = React.useState(false);
    //handler
    const onChangeSetTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    }
    //Modes
    const onEditMode = () => {
        setEditMode(true);
    }
    const offEditMode = () => {
        changeItemTitle(titleInputValue)
        setEditMode(false);
    }
    return (
        editMode
            ? <TextField
            variant={'standard'}
                value={titleInputValue}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitleInputValueHandler}
            disabled={disabled}
            />
            : <span
                className={classes}
                onDoubleClick={onEditMode}>{title}</span>

    );
};
