import styles from './searchBar.module.css'

function SearchBar() 
{
    return(
        <div className={styles.searchWrapper}>
            <input></input>
            <div className={styles.searchBtn}></div>
        </div>
    )
}

export default SearchBar