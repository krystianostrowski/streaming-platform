import Nav from '../components/nav'
import SearchBar from '../components/searchBar'
import styles from '../templates/navigationTemplate.module.css'

function NavigationTemplate()
{
    return(
        <div className={styles.navWrapper}>
            <SearchBar />
            <Nav />
        </div>
    )
}

export default NavigationTemplate