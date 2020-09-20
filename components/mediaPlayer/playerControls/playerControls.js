import styles from './playerControls.module.css';

function PlayerControls(props)
{
    return (
        <div className={ (props.type == 'music') ? styles.musicControls : styles.videoControls }>
            <button id="play-pause__button" className={styles.playButton} onClick={props.play}><i className="fas fa-play" /></button> 
            <div className={styles.time}>
                <input 
                    type="range" 
                    className="timeRange" 
                    onChange={props.timeChange}
                    value={props.timeValue}
                    step={0.1}
                    min={0}
                    max={props.mediaLength}
                />
                <span className="time">
                    <span className="media-time">{props.time}</span>
                    <span>/</span>
                    <span className="media-length">{props.length}</span>
                </span>
            </div>
            <div className={styles.audioControls}>
                <input
                    type="range"
                    className="volumeRange"
                    onChange={props.volChange}
                    step={0.1}
                    min={0}
                    max={1}
                />
                <button id="mute__button" className={styles.muteButton} onClick={props.mute}><i className="fas fa-volume-up" /></button>
            </div>
        </div>
    )
}

export default PlayerControls;