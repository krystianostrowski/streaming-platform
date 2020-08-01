import Nav from '../components/nav'
import SearchBar from '../components/searchBar'
import styles from '../templates/navigationTemplate.module.css'

function NavigationTemplate(props)
{
    return(
        <div className={styles.navWrapper}>
            <SearchBar />
            <Nav isLogged={props.isLogged} user={props.user}/>
        </div>
    )
}

export default NavigationTemplate