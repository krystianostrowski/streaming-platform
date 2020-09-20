import styles from './searchBar.module.css'

function searchBarInput(e) {
    const searched = e.target.value;

    if(searched != '')
    {
        const href = new URL(`http://${location.host}/search?q=${searched}`)
        history.pushState('search', "Test", href)
    }
    else
    {
        location.href = `http://${location.host}/browse`;
    }
}

function SearchBar() 
{
    return(
        <div className={styles.searchWrapper}>
            <input disabled onInput={(e) => searchBarInput(e)}></input>
            <div className={styles.searchBtn}></div>
        </div>
    )
}

export default SearchBar