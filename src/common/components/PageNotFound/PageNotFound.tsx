import styles from "./PageNotFound.module.css"
import {Routing} from "../../routing";
import {Button} from "@mui/material";
import { Link } from 'react-router-dom';

export const PageNotFound = () => (
    <div className={styles.container}>

        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button component={Link} to="/" className={styles.button}>
            Go back
        </Button>
    </div>
)