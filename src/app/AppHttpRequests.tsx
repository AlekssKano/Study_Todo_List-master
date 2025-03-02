import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from "axios";
import {TaskStatus} from "../common/enums/TaskStatus";
import {AddItemForm, EditAbleSpan} from "../common/components";
import {BaseResponse} from "../common/types";
import {instance} from "../common/instance";
import {Todolist} from "../features/todolists/api/todolistsApi.types";
import {todolistsApi} from "../features/todolists/api/todolistsApi";
import {tasksApi} from "../features/todolists/api/tasksApi";
import {BaseTask, Task} from "../features/todolists/api/tasksApi.types";

const token = '8ba0cea1-8992-4c55-ba76-4d8b5d75a72a'
const apiKey = '83e43bd2-9e89-42d2-8135-607b0ab959e1'

const config = {
    headers: {
        Authorization: `Bearer  ${token}`,
        'API-KEY': apiKey,
    }
}


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<Record<string, Task[]>>({})


    useEffect(() => {
        todolistsApi.getTodolists().then(res=> {
            const todolist = res.data
            setTodolists(todolist)
            todolist.map(todolist =>{
                tasksApi.getTasks(todolist.id).then(res=> {
                    setTasks(tasks => ({
                        ...tasks, [todolist.id]: res.data.items}))
                })
            })
        })
    }, []);

    const createTodolistHandler = (title: string) => {
        // create todolist
        todolistsApi.createTodolist(title).then(res => {
                const newTodo = res.data.data.item
                setTodolists([newTodo, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        todolistsApi.deleteTodolist(id).then(() => {
                setTodolists(todolists.filter(tl => tl.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        todolistsApi.changeTodolist({id, title}).then(() => {
                setTodolists(todolists.map(tl => tl.id === id?{...tl, title}:tl))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        tasksApi.createTask(todolistId,title).then(res => {
                const newTask = res.data.data.item
                // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            setTasks(prevTasks => ({
                ...prevTasks,
                [todolistId]: prevTasks[todolistId] ? [newTask, ...prevTasks[todolistId]] : [newTask]
            }))
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
       tasksApi.deleteTask(todolistId, taskId).then(res => {
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
        tasksApi.updateTask(task.todoListId,model,task.id).then(res => {
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
        tasksApi.updateTask(task.todoListId,model,task.id).then(res => {
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





