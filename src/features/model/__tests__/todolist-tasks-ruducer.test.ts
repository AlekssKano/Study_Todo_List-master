import {nanoid} from '@reduxjs/toolkit'
import type {DomainTodolist} from '../../../app/App'
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    AddTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from '../todolists-slice'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {   //!
    const title = 'New todolist'
    const endState = todolistsReducer(startState, AddTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC({todolistId: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC({todolistId: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})
