import PlayerControls from './playerControls'

let audioNode;

function GetAudioNode(){
    audioNode = document.querySelector('audio');
    console.log(audioNode);
    console.log("object");
}

function MediaPlayer(props)
{
    if(props.type == 'music')
    {
        return(
            <div onLoadStart={GetAudioNode}>
                <img src={`/${props.poster}`} />
                <audio controls>
                    <source src={`/play/${props.title}.mp3`} />
                </audio>
                <PlayerControls mediaNode={audioNode} />
            </div>
        )
    }
    else if(props.type == 'video')
    {
        return(
            <>
                <video controls poster={`/${props.poster}`}>
                    <source src={`http://192.168.0.101:3001/play/${props.title}.mp3`} />
                </video>
                <PlayerControls />
            </>
        )
    }
}

export default MediaPlayer