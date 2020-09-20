import Nav from '../components/nav/nav';
import MediaPlayer from '../components/mediaPlayer/mediaPlayer';
import MediaInfo from '../components/MediaInfo/MediaInfo';
import InProgress from '../components/InProgress/InProgress'

const OnChange = e => {
    const str = e.target.value;
    console.log(str);
    const json = JSON.parse(str);
    console.log(json);
}

function Player({media})
{
    return (
        <>
            <InProgress />
            <Nav user={media.user}/>
            <div className="wrapper">
                <MediaPlayer id={media.id} type ={media.type} poster={media.poster} />
                <MediaInfo media={media} />
            </div>
        </>
    )
}

Player.getInitialProps = async ({query : media}) => {
    return {media}
}

export default Player

/*
<audio controls>
                <source src={`http://192.168.0.101:3001/play/${media.title}.mp3`}></source>
            </audio>
*/