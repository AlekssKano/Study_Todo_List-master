import {Navigate, Outlet} from "react-router-dom";
import {Path} from "../../routing/Routing";
import React from "react";
import {useAppSelector} from "../../hooks";
import {selectIsLoggedIn} from "../../../features/auth/model/authSlice";

type Props={
    children?: React.ReactNode
    isAllowed:boolean
    redirectPath?:string
}
export const ProtectedRoute = ({children,isAllowed,redirectPath=Path.Login}:Props)=>{

    if(!isAllowed)
{    return <Navigate to={redirectPath}/>
}
    // if(isLogginIn)
    // {    return <Navigate to={Path.Main}/>
    // }
    return children?<>children</>:<Outlet/>;
}