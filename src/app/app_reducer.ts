export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light'  as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE-MODE':
            return {...state, themeMode: action.payload.status}
        default:
            return state
    }
}

// Action types
export const changeModeAC = (status:ThemeMode) => {
    return {
        type: "CHANGE-MODE",
        payload: {status}
    } as const
}
type ActionsType = ChangeModeActionType
export type ChangeModeActionType = ReturnType<typeof changeModeAC>
