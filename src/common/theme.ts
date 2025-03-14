import {createTheme} from "@mui/material";
import {amber, pink} from "@mui/material/colors";
import {ThemeMode} from "../app/app-slice";


export const getTheme=(themeMode:ThemeMode)=>{

    return createTheme({
        palette:{
            primary:pink,
            secondary: amber,
            mode: themeMode
        }
    })

}
