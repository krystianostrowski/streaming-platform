import styles from './media.module.css'

function Media(props)
{
    //console.log(props)
    return (
        <div className={styles.mediaContainer}>
            <img src={`/${props.poster}`} className={styles.poster} />
            <a href={`/player/${props.title}`}>{props.title}</a>
        </div>
    )
}

export default Media