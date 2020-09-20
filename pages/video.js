import Nav from '../components/nav/nav'
import Media from '../components/media/media'
import InProgress from '../components/InProgress/InProgress';

function Video({media, user}) 
{
    return (
        <>
            <InProgress />
            <Nav user={user.user} />
            <div className="container">
                {media.length > 0 ? media.map((m) => (
                    <Media key={m.id} media={m} />
                )) : <h1>Nothing was found!</h1>}
            </div>
        </>
    )
}

Video.getInitialProps = async ({query: user}) => {
    const res = await fetch('http://127.0.0.1:3000/api/media/video');
    const media = await res.json();
    return {user, media}
}

export default Video;