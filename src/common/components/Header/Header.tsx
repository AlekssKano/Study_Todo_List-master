import {AppBar, Box, Button, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {amber} from "@mui/material/colors";
import {getTheme} from "../../theme";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeThemeModeAC, selectThemeMode} from "../../../app/app-slice";

export const Header=()=> {
    const themeMode=useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch();
    //modeSelector
     const ChangeModeSelector =()=>{
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
    <AppBar position="static">
        <Toolbar sx={{justifyContent: 'space-between'}}>
            <IconButton color="inherit">
                <MenuIcon/>
            </IconButton>
            <Box>
                <Switch onChange={ChangeModeSelector}
                />
                <Button color="inherit">Login</Button>
                {/*<Button background={theme.palette.secondary}>Faq</Button>*/}
            </Box>

        </Toolbar>
    </AppBar>
    )
}