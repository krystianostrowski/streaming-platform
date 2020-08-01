import NavigationTemplate from '../templates/navigationTemplate'
import Media from '../components/media'

function HomePage({media, user}) 
{
    if(user.loggedIn)
    {
        return (
            <>
                <NavigationTemplate isLogged={user.loggedIn} user={user.user} />
                <div className="container">
                    {media.map((m) => (
                        <Media key={m.title} title={m.title} author={m.author} type={m.type} poster={m.poster} />
                    ))}
                </div>
            </>
        )
    }
    else
    {
        return (
            <>
                <NavigationTemplate isLogged={user.loggedIn}/>
                <div className="container">
                    <h1>You have to be logged in to see the content</h1>
                </div>
            </>
        )
    }
}

HomePage.getInitialProps = async ({query: user}) => {
    const res = await fetch('http://127.0.0.1:3001/api/media');
    const media = await res.json();
    return {user, media}
}

/*export async function getStaticProps() {
    const res = await fetch('http://127.0.0.1:3001/api/media');
    const media = await res.json();

    return {
        props: {
            media,
        },
    }
}*/

export default HomePage