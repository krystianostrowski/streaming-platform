import styles from './MediaInfo.module.css';

const renderDesc = desc => {
    let str = desc;
    let newString = str.split('\n').map(i => {
        return <p>{i}</p>
    })

    return newString;
};

const MediaInfo = ({ media }) => (
    <div className={styles.wrapper}>
        <h1>{media.title} - <small>{media.author}</small></h1>
        <small>Release: {media.releaseDate}</small>
        <div className={styles.description}>
            {renderDesc(media.description)}
        </div>
    </div>
);

export default MediaInfo;