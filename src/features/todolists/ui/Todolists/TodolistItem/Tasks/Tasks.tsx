import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import List from "@mui/material/List"
import { TaskItem } from "./TaskItem/TaskItem"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data, isLoading, error } = useGetTasksQuery(id)
  const dispatch = useAppDispatch()
  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
  }
  // if (isError) {
  //   dispatch(setAppErrorAC({ error: error.data.message }))
  // }
  useEffect(() => {
    if (!error) return
    if ('status' in error) {
      // FetchBaseQueryError
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppErrorAC({ error: errMsg }))
    } else {
      // SerializedError
      dispatch(setAppErrorAC({ error: error.message || 'Some error occurred' }))
    }
  }, [error])

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
      )}
    </>
  )
}
