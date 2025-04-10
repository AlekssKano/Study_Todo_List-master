
import type {DomainTodolist, Todolist} from "./todolistsApi.types"
import {instance} from "../../../common/instance";
import {BaseResponse} from "../../../common/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "../../../common/constants";

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
  baseUrl:  process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const apiKey = process.env.REACT_APP_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is not defined");
      }
      headers.set("API-KEY", apiKey);  // Проверяем на undefined
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
    },
  }),
  endpoints: (build) => ({
        // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
        // `query` по умолчанию создает запрос `get` и указание метода необязательно
        getTodolists: build.query<DomainTodolist[], void>({
          query: () => {
            return {
              method: "GET",
              url:'/todo-lists'
            }
          }
  })
    })
})


export const {useGetTodolistsQuery} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return  instance.get<Todolist[]>('/todo-lists')
  },
  changeTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {

    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })

  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
