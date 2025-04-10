import {Box, Button, List, SxProps} from "@mui/material";
import AddItemForm from "../../../../../../common/components/AddItemForm/AddItemForm";
import React from "react";
import {useAppDispatch} from "../../../../../../common/hooks";
import {ChangeTodolistFilterAC} from "../../../../../model/todolists-slice";
import {DomainTodolist, filterValuesType} from "../../../../api/todolistsApi.types";

type ButtonFilterType= {
    title: string
    onClickHandler: ()=>void
    color: 'secondary' | 'primary'
}
type Props ={
    todolist:DomainTodolist
}
// export const FilterTasksButtons = ({todolist}:Props)=> {
//     const dispatch = useAppDispatch()
//     const changeTodoListFilter = (NewFilterValue: filterValuesType) => {
//         console.log(NewFilterValue)
//         dispatch(ChangeTodolistFilterAC({filter: NewFilterValue, todolistId: todolist.id}))
//
//     }
//     const buttonsData: ButtonFilterType[] = [
//         {
//             title: "All",
//             onClickHandler: () => changeTodoListFilter('all'),
//             color: todolist.filter === "all" ? 'secondary' : 'primary'
//         },
//         {
//             title: "Active",
//             onClickHandler: () => changeTodoListFilter('active'),
//             color: todolist.filter === "active" ? 'secondary' : 'primary'
//
//         },
//         {
//             title: "Comleted",
//             onClickHandler: () => changeTodoListFilter('completed'),
//             color: todolist.filter === "completed" ? 'secondary' : 'primary'
//
//         },
//     ]
//
//
//     const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
//         return (
//             <Button
//                 size='small'
//                 variant='contained'
//                 disableElevation={true} //отключает тени у кнопки
//                 color={btn.color}
//                 onClick={btn.onClickHandler}>
//                 {btn.title}</Button>
//         )
//     })
//     return (
//         <>{filterButtons}</>
//     )
//
// }
    export const FilterTasksButtons = ({ todolist }: Props) => {
        const {id, filter} = todolist

        const dispatch = useAppDispatch()

        const changeFilter = (filter: filterValuesType) => {
            dispatch(ChangeTodolistFilterAC({filter: filter, todolistId: todolist.id}))
        }

        return (
            <Box sx={containerSx}>
                <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"}
                        onClick={() => changeFilter("all")}>
                    All
                </Button>
                <Button
                    variant={filter === "active" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={() => changeFilter("active")}
                >
                    Active
                </Button>
                <Button
                    variant={filter === "completed" ? "outlined" : "text"}
                    color={"secondary"}
                    onClick={() => changeFilter("completed")}
                >
                    Completed
                </Button>
            </Box>
        )

}
export const containerSx: SxProps = {
    display: "flex",
    justifyContent: "space-between",
}
