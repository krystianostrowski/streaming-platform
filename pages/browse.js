import Nav from '../components/nav/nav'
import Media from '../components/media/media'
import InProgress from '../components/InProgress/InProgress';

function HomePage({media, user}) 
{
    return (
        <div className="page-wrapper">
            <Nav user={user.user} />
            <InProgress />
            <div className="container">
                {media.length > 0 ? media.map((m) => (
                    <Media key={m.id} media={m} />
                )) : <h1>Nothing was found!</h1>}
            </div>
        </div>
    )
}

HomePage.getInitialProps = async ({query: user}) => {
    const res = await fetch('http://127.0.0.1:3000/api/media');
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