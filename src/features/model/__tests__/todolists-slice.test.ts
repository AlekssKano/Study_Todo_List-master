import {
    createTodolist, ChangeTodolistFilterAC, changeTodolistTitle, deleteTodolist,
    todolistsReducer
} from '../todolists-slice';
import { v1 } from 'uuid'
import {strict} from "node:assert";
import {DomainTodolist} from "../../../app/App";
import {nanoid} from "@reduxjs/toolkit";

let todolistId1=nanoid()
let todolistId2 = nanoid()
let startState: DomainTodolist[] = []
beforeEach(()=>{
    startState = [
        { id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus:'idle'},
        { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all',entityStatus:'idle' },
    ]
})
test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, deleteTodolist.fulfilled({id: todolistId1},
        'requestId',
        todolistId1 ))//var 3 3 in1

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {


   let NewTodolist = {
        id: '3',
        addedDate: '0',
        order: 0,
        title: 'New Todolist'
    }

    const newTitle='New Todolist'
    const endState = todolistsReducer(startState, createTodolist.fulfilled(NewTodolist,'requestId',NewTodolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].id).toBe('3');
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

    const endState = todolistsReducer(startState, changeTodolistTitle.fulfilled(
        {args:{id:todolistId2, title:newTitle}},
        'requestId',
        {id:todolistId2, title:newTitle}))

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