
import type { Todolist } from "./todolistsApi.types"
import {instance} from "../../../common/instance";
import {TasksStateType} from "../../../app/App";
import {BaseTask, GetTasksResponse, Task} from "./tasksApi.types";
import {BaseResponse} from "../../../common/types";

export const tasksApi = {
    getTasks(id: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${id}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, model: BaseTask, taskId: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}