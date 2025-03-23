import {TaskPriority, Enums} from "../../../common/enums/enums";
import {z} from "zod";

export type Task = UpdateTaskModel & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModel = {
    description: string | null
    title: string
    status: Enums
    priority: TaskPriority
    startDate: string | null
    deadline: string | null

}

export type GetTasksResponse = {
    items: Task[]
    totalCount: number
    error: string | null
}
export type _DomainTask = {
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
export const DomainTaskSchema = z.object({
    description: z.string().nullable(),
    title: z.string(),
    status: z.nativeEnum(Enums),
    priority: z.nativeEnum(TaskPriority),
    startDate: z.string().nullable(),
    deadline: z.string().nullable(),
    id: z.string(),
    todoListId: z.string(),
    order: z.number(),
    addedDate: z.string(),
})

export type DomainTask = z.infer<typeof DomainTaskSchema>



export type DeleteTaskArgs = {
    todolistId: string
    taskId: string
}

export type CreateTaskArgs = {
    todolistId: string
    title: string
}
