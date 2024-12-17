import {Button, List} from "@mui/material";
import AddItemForm from "../../../../../../common/components/AddItemForm/AddItemForm";
import React from "react";
import {filterValuesType, ToDolistType} from "../../../../../../app/App";
import {ChangeTodolistFilterAC} from "../../../../../../reducers/todolistsReducer";
import {useAppDispatch} from "../../../../../../app/hooks";

type ButtonFilterType= {
    title: string
    onClickHandler: ()=>void
    color: 'secondary' | 'primary'
}
type Props ={
    todolist:ToDolistType
}
export const FilterTasksButtons = ({todolist}:Props)=>{
    const dispatch = useAppDispatch()
    const changeTodoListFilter = (NewFilterValue: filterValuesType) => {
        dispatch(ChangeTodolistFilterAC({filter:NewFilterValue, todolistId:todolist.id}))

    }
    const buttonsData:ButtonFilterType[] = [
        {
            title: "All",
            onClickHandler:()=> changeTodoListFilter('all'),
            color: todolist.filter === "all" ? 'secondary':'primary'
        },
        {
            title: "Active",
            onClickHandler: ()=>changeTodoListFilter('active'),
            color: todolist.filter === "active" ? 'secondary' : 'primary'

        },
        {
            title: "Comleted",
            onClickHandler: ()=> changeTodoListFilter('completed'),
            color: todolist.filter === "completed" ? 'secondary' : 'primary'

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
  return (
      <>{filterButtons}</>
  )


}