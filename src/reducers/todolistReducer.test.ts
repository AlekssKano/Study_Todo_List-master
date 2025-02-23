import {
    AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterAC, ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
    ChangeTodolistTitleActionType, RemoveTodolistAC,
    RemoveTodolistActionType,
    todolistsReducer
} from './todolistsReducer';
import { v1 } from 'uuid'
import {strict} from "node:assert";
import {ToDolistType} from "../app/App";
import {nanoid} from "@reduxjs/toolkit";

let todolistId1=nanoid()
let todolistId2 = nanoid()
let startState: ToDolistType[] = []
beforeEach(()=>{
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})
test('correct todolist should be removed', () => {

    // 2. Действие
    // const action:RemoveTodolistActionType = { var1
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         todolistId: todolistId1,
    //     },
    // }
    // const action:RemoveTodolistActionType = RemoveTodolistAC(todolistId1) // var 2, better and laconic

    const endState = todolistsReducer(startState, RemoveTodolistAC({todolistId: todolistId1}) )//var 3 3 in1

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {


    // const action: AddTodolistActionType = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         todolistId: v1(),
    //         title: 'New Todolist',
    //     },
    // }
    const newTitle='New Todolist'
    const endState = todolistsReducer(startState, AddTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})
test('correct todolist should change its name', () => {

    // const action: ChangeTodolistTitleActionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         todolistId: todolistId2,
    //         title: 'New Todolist',
    //     },
    // }
    const newTitle='New Todolist'

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC({todolistId:todolistId2, title:newTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})
test('correct filter of todolist should be changed', () => {


    // const action:ChangeTodolistFilterActionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         todolistId: todolistId2,
    //         filter: 'completed',
    //     },
    // }
    const newFilter='completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC({todolistId:todolistId2, filter:'completed'}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
export const a = 0;