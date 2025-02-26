import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
// import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import {EditAbleSpan} from "../common/components/EditAbleSpan/EditAbleSpan";
import AddItemForm from "../common/components/AddItemForm/AddItemForm";
import axios from "axios";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {TaskStatus} from "../common/enums/TaskStatus";

const token = '8ba0cea1-8992-4c55-ba76-4d8b5d75a72a'
const apiKey = 'e4843da7-ecf0-496a-b18c-07e675523c2f'

const config = {
    headers: {
        Authorization: `Bearer  ${token}`,
        'API-KEY': apiKey,
    }
}


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        // get todolists
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer  ${token}`,
            }
        })
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach((tl) => {
                    axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, config)
                        .then(res => {
                            setTasks(tasks=>({...tasks, [tl.id]: res.data.items}))
                        })
                })

            })
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<Response<{
            item: Todolist
        }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, config)
            .then(res => {
                const newTodo = res.data.data.item
                setTodolists([newTodo, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, config)
            .then(() => {
                setTodolists(todolists.filter(tl => tl.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        const body = { title }
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,body, config)
            .then(() => {
                setTodolists(todolists.map(tl => tl.id === id?{...tl, title}:tl))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, config)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, config)
            .then(res => {
                // const newTasks = tasks.map(td=>{})
setTasks({...tasks, [todolistId]:tasks[todolistId].filter(tl=>tl.id!==taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
        // update task status
        const model: BaseTask = {
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status: e.currentTarget.checked ? 2 : 0,

        }
        axios.put<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${task.todoListId}/tasks/${task.id}`, model, config)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t=>t.id ===task.id?newTask:t)})
            })
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
        const model: BaseTask = {
            title: title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            status: task.status

        }
        axios.put<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${task.todoListId}/tasks/${task.id}`, model, config)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map(t=>t.id ===task.id?newTask:t)})
            })
    }



    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler} maxItemLength={20}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditAbleSpan
                                title={tl.title}
                                changeItemTitle={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)} maxItemLength={20}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditAbleSpan
                                            title={task.title}
                                            changeItemTitle={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

type Todolist = {
    id: string
    addedDate: string
    order: number
    title: string
}
type Response<T = {}> = {
    data: T
    fieldErrors: {}[]
    messages: string[]
    resultCode: number
}

type FieldError = {
    error: string
    field: string
}

type GetTasksResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}

type Task = BaseTask & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type BaseTask = {
    description: string | null
    title: string
    status: TaskStatus;
    priority: number
    startDate: string | null
    deadline: string | null

}

