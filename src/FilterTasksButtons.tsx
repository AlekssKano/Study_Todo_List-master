import {Button, List} from "@mui/material";
import AddItemForm from "./components/AddItemForm";
import React from "react";

type ButtonFilterType= {
    title: string
    onClickHandler: ()=>void
    color: 'secondary' | 'primary'
}

export const FilterTasksButtons = ()=>{
    const buttonsData:ButtonFilterType[] = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator('all'),
            color: filter === "all" ? 'secondary':'primary'
        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator('active'),
            color: filter === "active" ? 'secondary' : 'primary'

        },
        {
            title: "Comleted",
            onClickHandler: setFilterHandlerCreator('completed'),
            color: filter === "completed" ? 'secondary' : 'primary'

        },
    ]

    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button
                size='small'
                variant='contained'
                disableElevation={true} //отключает тени у кнопки
                color={btn.color}
                onClick={btn.onClickHandler}>

                {btn.title}</Button>
        )
    })
    //handler
    const addNewTask
        = (newTaskTitle: string) => {
        addTask(newTaskTitle, todolistId)
    }

    return (
        <div>
            <AddItemForm addItem={addNewTask} maxItemLength={9}/>
            <List >
                {tasksList}
            </List>
            <div>{filterButtons}</div>
        </div>
    );


}