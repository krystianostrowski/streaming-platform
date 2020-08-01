import styles from './nav.module.css'

function Nav(props)
{
    if(props.isLogged)
    {
        return(
            <ul className={styles.nav}>
                <li><a href="/">Main</a></li>
                <li><a href="/logout">Logout</a></li>
                <li>{props.user.login}</li>,
                <li>Other</li>
            </ul>
        )
    }
    else
    {
        return(
            <ul className={styles.nav}>
                <li><a href="/">Main</a></li>
                <li><a href="/login">LogIn</a></li>
                <li>Other</li>
            </ul>
        )
    }
}

export default Nav