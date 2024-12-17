import {tasksReducer} from "./tasksReducer";
import {AddTodolistAC, todolistsReducer} from "./todolistsReducer";
import {TasksStateType, ToDolistType} from "../app/App";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: ToDolistType[] = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})