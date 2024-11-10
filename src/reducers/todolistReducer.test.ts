import {
    AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterAC, ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
    ChangeTodolistTitleActionType, RemoveTodolistAC,
    RemoveTodolistActionType,
    TodolistsReducer
} from './TodolistsReducer';
import { v1 } from 'uuid'
import { ToDolistType } from '../App'
import {strict} from "node:assert";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: ToDolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
    // 2. Действие
    // const action:RemoveTodolistActionType = { var1
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         todolistId: todolistId1,
    //     },
    // }
    // const action:RemoveTodolistActionType = RemoveTodolistAC(todolistId1) // var 2, better and laconic

    const endState = TodolistsReducer(startState, RemoveTodolistAC(todolistId1) )//var 3 3 in1

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: ToDolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action: AddTodolistActionType = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         todolistId: v1(),
    //         title: 'New Todolist',
    //     },
    // }
    const newTitle='New Todolist'
    const endState = TodolistsReducer(startState, AddTodolistAC('New Todolist',v1()))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: ToDolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action: ChangeTodolistTitleActionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         todolistId: todolistId2,
    //         title: 'New Todolist',
    //     },
    // }
    const newTitle='New Todolist'

    const endState = TodolistsReducer(startState, ChangeTodolistTitleAC(todolistId2,newTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: ToDolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action:ChangeTodolistFilterActionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         todolistId: todolistId2,
    //         filter: 'completed',
    //     },
    // }
    const newFilter='completed'
    const endState = TodolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})