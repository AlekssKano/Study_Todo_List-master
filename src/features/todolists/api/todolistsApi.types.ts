import {z} from "zod";
import {RequestStatus} from "../../../common/types";
import {TaskPriority} from "../../../common/enums/enums";

export type _Todolist = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type _DomainTodolist = Todolist &{
  filter: filterValuesType
  entityStatus: RequestStatus
}
export type filterValuesType = 'all' | 'active' | 'completed';


export const TodolistSchema  = z.object({
  id: z.string(),
  addedDate: z.string(),
  order: z.number(),
  title: z.string(),
})

export type Todolist = z.infer<typeof TodolistSchema>
export const DomainTodolistSchema = TodolistSchema.extend({
  filter: z.enum(["all", "active", "completed"]).optional(), //check IT!
  entityStatus: z.enum(["idle", "loading", "succeeded", "failed"]).optional(),
});

export type DomainTodolist = z.infer<typeof DomainTodolistSchema>;