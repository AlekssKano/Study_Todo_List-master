import {createTask, updateTask, deleteTask, fetchTasks, tasksReducer, TasksState} from '../tasks-slice'
import {createTodolist, deleteTodolist, todolistsReducer} from "../todolists-slice";
import {v1} from "uuid";
import {TasksStateType} from "../../../app/App";
import {TaskPriority, TaskStatus} from "../../../common/enums/TaskStatus";
let startState:TasksState={}
const taskDefaultValues = {
    description: '',
    deadline: '',
    addedDate: '',
    startDate: '',
    priority: TaskPriority.Low,
    order: 0,
}
beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.Completed,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatus.Completed,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
        ],
    }
})
test('correct task should be deleted from correct array', () => {


    const endState = tasksReducer(
        startState,
        deleteTask.fulfilled({ todolistId: 'todolistId2', taskId: '2' },
            'requestId',
            { todolistId: 'todolistId2', taskId: '2' })
    );

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})
test('correct task should be added to correct array', () => {

    const newTask = {
        id: 'some-id',
        title: 'juce',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: ''
    };

    const endState = tasksReducer(startState, createTask.fulfilled(
        { task: newTask },
        'requestId',
        { title: 'juce', todolistId: 'todolistId2' }
    ));

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe("juce")
    expect(endState['todolistId2'][0].status).toBeFalsy()
})
test('status of specified task should be changed', () => {
    const newTask = {
        id: '2',
        title: 'juce',
        status: TaskStatus.InProgress,
        todoListId: 'todolistId2',
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: ''
    };

     const endState = tasksReducer(
        startState,
        updateTask.fulfilled(newTask ,'requestId',newTask))


    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][1].status).toBe(TaskStatus.InProgress);
    expect(endState['todolistId1'][1].status).toBe(TaskStatus.Completed);
})
test('title of specified task should be changed', () => {
    const newTask = {
        id: '2',
        title: 'Olala',
        status:  TaskStatus.Completed,
        todoListId: 'todolistId2',
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: ''
    };
    const endState = tasksReducer(
        startState,
        updateTask.fulfilled(newTask ,'requestId',newTask))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatus.InProgress);     expect(endState['todolistId1'][1].title).toBe('Olala')
    expect(endState['todolistId2'][1].title).not.toBe('Olala')
})
test('property with todolistId should be deleted', () => {


    // const endState = todolistsReducer(
    //     startState,
    //     deleteTodolist.fulfilled({ id: todolistId1 }, 'requestId', 'todolistId1'))
    //
    // const keys = Object.keys(endState);
    //
    // expect(keys.length).toBe(1)
    // expect(endState['todolistId1']).not.toBeDefined()
    // // or
    // expect(endState['todolistId2']).toBeUndefined()
})
test('new array should be added when new todolist is added', () => {


    // const endState = tasksReducer(startState, createTodolist.fulfilled({'new todolist'},'requestId',{ todolistId: 'todolistId2' }))
    //
    // const keys = Object.keys(endState)
    // const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    // if (!newKey) {
    //     throw Error('new key should be added')
    // }
    //
    // expect(keys.length).toBe(3)
    // expect(endState[newKey]).toEqual([])
})