import NavigationTemplate from '../templates/navigationTemplate'
import MediaPlayer from '../components/mediaPlayer'

function Player({media})
{
    return (
        <>
            <NavigationTemplate isLogged={media.loggedIn} />
            <MediaPlayer title={media.title} type ={media.type} poster={media.poster} />
            <h1>{media.title}</h1>
            {media.author}
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