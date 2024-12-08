import {filterValuesType, ToDolistType} from "../AppWithUseState";
import {v1} from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;

export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>

export type ChangeTodolistFilterActionType= ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType|ChangeTodolistFilterActionType

const initialState: ToDolistType[]=[]
export const todolistsReducer = (state: Array<ToDolistType> = initialState, action: ActionType): Array<ToDolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            const {todolistId} = action.payload //var1
            return state.filter(tl => tl.id !== todolistId)

        case "ADD-TODOLIST":{
            const {todolistId, title}=action.payload
            const newTodo: ToDolistType = {
                id: todolistId,
                title: title,
                filter: 'all'}
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE":{
            const {todolistId, title}=action.payload
            return state.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER":{
            const {todolistId, filter}=action.payload
         return state.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl)

        }


        default:
            return state
    }
}

//action creators
export const RemoveTodolistAC=(todolistId:string)=>({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId
    }
}as const)

export const AddTodolistAC=(title:string)=>({
    type: "ADD-TODOLIST",
    payload: {
        title,
        todolistId:v1()
    }
}as const)
export const ChangeTodolistTitleAC =(payload: {todolistId:string,title:string})=> ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload
}as const)
export const ChangeTodolistFilterAC=(payload:{todolistId:string,filter:filterValuesType})=>({
    type: 'CHANGE-TODOLIST-FILTER',
    payload
}as const)