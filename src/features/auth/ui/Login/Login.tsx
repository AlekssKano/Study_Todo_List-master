
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from "@mui/material/Grid2"
import TextField from '@mui/material/TextField'
import {useAppDispatch, useAppSelector} from "../../../../common/hooks";
import {selectThemeMode} from "../../../../app/app-slice";
import {getTheme} from "../../../../common/theme";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import styles from "./Login.module.css"
import {Inputs, loginSchema} from "../../lib/schemas";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginTC, selectIsLoggedIn} from "../../model/authSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {Path} from '../../../../common/routing/Routing'
import {useEffect} from "react";

// type _Inputs = { это мы заменяем зодом
//     email: string
//     password: string
//     rememberMe: boolean
// }

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLogginIn = useAppSelector(selectIsLoggedIn)
const dispatch=useAppDispatch()
    const navigate = useNavigate();


    const theme = getTheme(themeMode)
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false } })


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(loginTC(data))
        // reset()
    }
    if(isLogginIn)
    {    return <Navigate to={Path.Main}/>
    }
    // useEffect(() => { //тоже возможнодный вариант
    //     if (isLogginIn) {
    //         navigate(Path.Main);
    //     }
    // }, [isLogginIn, navigate]);

    return (
        <Grid container justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>
                        To login get registered
                        <a
                            style={{color: theme.palette.primary.main, marginLeft: "5px"}}
                            href="https://social-network.samuraijs.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>
                        <b>Email:</b> free@samuraijs.com
                    </p>
                    <p>
                        <b>Password:</b> free
                    </p>
                </FormLabel>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...register("email")}
                            />
                        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                        <TextField type="password" label="Password" margin="normal" {...register('password')}/>
                        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
                        <FormControlLabel label="Remember me" control={<Controller
                            name={'rememberMe'}
                            control={control}
                            render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                        />}/>

                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
)
}