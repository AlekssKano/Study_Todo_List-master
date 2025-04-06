import {Route, Routes} from "react-router"
import {Main} from "../../app/Main";
import {Login} from '../../features/auth/ui/Login/Login'
import {PageNotFound} from "../components";
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "../hooks";
import {selectIsLoggedIn} from "../../features/auth/model/authSlice";
import {Dangerous, Dashboard} from "@mui/icons-material";

export const Path = {
    Main: '/',
    Login: '/login',
    NotFound: '*',
    DashBoard: '/dashboard'
} as const


export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <Routes>
            {/*Privet routes*/}
            {/*<Route path={Path.Main}*/}
            {/*       element={*/}
            {/*           <ProtectedRoute isAllowed={isLoggedIn}>*/}
            {/*               <Main/>*/}
            {/*           </ProtectedRoute>*/}
            {/*       }*/}
            {/*/>*/}
            {/*<Route path={Path.DashBoard}*/}
            {/*       element={*/}
            {/*           <ProtectedRoute isAllowed={isLoggedIn}>*/}
            {/*               <h2>Dashboard</h2>*/}
            {/*           </ProtectedRoute>*/}
            {/*       }*/}
            {/*/>*/}
            <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
                <Route path={Path.Main} element={<Main/>}/>
                <Route path={Path.DashBoard} element={<h2>Dashboard</h2>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>

            <Route path={Path.Login} element={<Login/>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}