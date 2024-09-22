import React, {ChangeEvent, useState} from 'react';

type EditAbleSpanProps = {
    title: string
    changeItemTitle:(newTitle:string) => void

}
export const EditAbleSpan = ({
                                 title,
                                 changeItemTitle
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
            ? <input
                value={titleInputValue}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitleInputValueHandler}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>

    );
};
