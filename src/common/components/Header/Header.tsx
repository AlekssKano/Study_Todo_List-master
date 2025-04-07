import {AppBar, Box, Button, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {getTheme} from "../../theme";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeThemeModeAC, selectStatus, selectThemeMode} from "../../../app/app-slice";
import LinearProgress from '@mui/material/LinearProgress'
import {logoutTC, selectIsLoggedIn} from "../../../features/auth/model/authSlice";

export const Header=()=> {
    const themeMode=useAppSelector(selectThemeMode)
    const status=useAppSelector(selectStatus)
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch();
    const isLogginIn = useAppSelector(selectIsLoggedIn)

    //modeSelector
     const ChangeModeSelector =()=>{
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    const logoutHandler=()=>{
         dispatch(logoutTC())


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
                <Button color="inherit" >Login</Button>
                {isLogginIn&&<Button color="inherit" onClick={() => logoutHandler()}>Logout</Button>}
                {/*<Button background={theme.palette.secondary}>Faq</Button>*/}
            </Box>

        </Toolbar>
        {  status === 'loading' && <LinearProgress />
        }


    </AppBar>
    )
}