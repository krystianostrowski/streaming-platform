import styles from './nav.module.css'

function Nav()
{
    return(
        <ul className={styles.nav}>
            <li>Main</li>
            <li>Secondary</li>
            <li>Other</li>
        </ul>
    )
}

export default Nav