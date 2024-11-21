import {tasksReducer} from "./tasksReducer";
import {TasksStateType, ToDolistType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolistsReducer";

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