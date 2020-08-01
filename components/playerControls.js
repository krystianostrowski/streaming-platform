import styles from './playerControls.module.css'

const playBtn = node => {
    console.log(node);
}

function PlayerControls({mediaNode})
{
    return(
        <div id={styles.controlsWrapper}>
            <button onClick={playBtn(mediaNode)}>p</button>
        </div>
    )
}

export default PlayerControls