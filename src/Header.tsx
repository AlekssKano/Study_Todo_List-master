import {AppBar, Box, Button, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {amber} from "@mui/material/colors";
import {getTheme} from "./common/theme";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {changeModeAC} from "./app/app_reducer";

export const Header=()=> {
    const themeMode=useAppSelector(state =>state.app.themeMode);
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch();
    //modeSelector
     const ChangeModeSelector =()=>{
        dispatch(changeModeAC(themeMode==='light'?'dark':'light'))
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