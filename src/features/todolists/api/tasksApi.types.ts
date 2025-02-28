import {TaskPriority, TaskStatus} from "../../../common/enums/TaskStatus";

export type Task = BaseTask & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type BaseTask = {
    description: string | null
    title: string
    status: TaskStatus;
    priority: TaskPriority
    startDate: string | null
    deadline: string | null

}

export type GetTasksResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}
