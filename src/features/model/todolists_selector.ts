import {DomainTodolist} from "../../app/App";
import {RootState} from '../../app/store'

export const selectTodolists = (state:RootState):DomainTodolist[]=>state.todolists