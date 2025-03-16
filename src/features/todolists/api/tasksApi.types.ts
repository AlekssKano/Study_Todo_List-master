import {TaskPriority, Enums} from "../../../common/enums/enums";

export type Task = UpdateTaskModel & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModel = {
    description: string
    title: string
    status: Enums
    priority: TaskPriority
    startDate: string
    deadline: string

}

export type GetTasksResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}
export type DomainTask = {
    description: string
    title: string
    status: Enums
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}



export type DeleteTaskArgs = {
    todolistId: string
    taskId: string
}

export type CreateTaskArgs = {
    todolistId: string
    title: string
}
