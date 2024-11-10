import {filterValuesType, ToDolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId: string
        title: string
    },
}
export type ChangeTodolistFilterActionType={
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todolistId: string
        filter: filterValuesType
    },
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType|ChangeTodolistFilterActionType


export const TodolistsReducer = (todolists: Array<ToDolistType>, action: ActionType): Array<ToDolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            const {todolistId} = action.payload //var1
            return todolists.filter(tl => tl.id !== todolistId)

        case "ADD-TODOLIST":{
            const {todolistId, title}=action.payload
            const newTodo: ToDolistType = {
                id: todolistId,
                title: title,
                filter: 'all'}
            return [...todolists, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE":{
            const {todolistId, title}=action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER":{
            const {todolistId, filter}=action.payload
         return todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl)

        }


        default:
            return todolists
    }
}

export const RemoveTodolistAC=(todolistId:string):RemoveTodolistActionType=>({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId
    }
})

export const AddTodolistAC=(title:string,todolistId:string):AddTodolistActionType=>({
    type: "ADD-TODOLIST",
    payload: {
        title,
        todolistId
    }
})
export const ChangeTodolistTitleAC =(todolistId:string,title:string):ChangeTodolistTitleActionType=> ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId,
        title
    }
})
export const ChangeTodolistFilterAC=(todolistId:string,filter:filterValuesType):ChangeTodolistFilterActionType=>({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todolistId,
        filter
    },
})