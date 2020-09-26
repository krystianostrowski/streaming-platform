import styles from './media.module.css'

function Media({ media })
{
    return (
        <div className={styles.mediaContainer}>
            <img src={`/${media.poster}`} className={styles.poster} />
            {
                media.released ? 
                    <a href={`/player/${media.id}`} className={styles.mediaLink}>
                        <span>{media.title}</span>
                    </a>
                :
                    <div className={styles.mediaOverlay}>
                        <span>{media.title}</span>
                        <span>Release date: {media.releaseDate}</span>
                    </div>
            }
        </div>
    )
}

export default Media