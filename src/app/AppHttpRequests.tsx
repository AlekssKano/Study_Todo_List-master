import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
// import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import {EditAbleSpan} from "../common/components/EditAbleSpan/EditAbleSpan";
import AddItemForm from "../common/components/AddItemForm/AddItemForm";
import axios from "axios";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";

const token = '16203159-05af-4caa-b112-e1c3159d626d'
const apiKey = '39d46fbc-6e06-4ed4-b36f-6088c630fe0d'

const config = {
    headers: {
        Authorization: `Bearer  ${token}`,
        'API-KEY': apiKey,
    }
}


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key:string]: Task[]}>({})

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
                            setTasks({...tasks, [tl.id]:res.data.items})
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
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, config)
            .then(res => {
                const newTask=res.data.data.item
                setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
        // update task status
        const model = {
            title:task.title,
            deadline:task.deadline,
            priority:task.priority,
            startDate:task.startDate,
            description:task.description,
            status:,

        }
        axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}/tasks/{taskId}`, {title}, config)
            .then(res => {
                console.log(res.data)
            })
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
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
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
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

type Task = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}