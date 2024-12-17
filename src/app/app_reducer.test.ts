import {removeTaskAC, tasksReducer} from "../reducers/tasksReducer";
import {appReducer, changeModeAC} from "./app_reducer";
export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}
test('themModeShouldBeAlternative', () => {

    const initialState = {
        themeMode: 'light' as ThemeMode,
    }
    const endState= appReducer(initialState, changeModeAC('dark'))

    expect(endState.themeMode).toBe('dark')
})