import {ToDolistType} from "../../app/App";
import {RootState} from '../../app/store'

export const selectTodolists = (state:RootState):ToDolistType[]=>state.todolists