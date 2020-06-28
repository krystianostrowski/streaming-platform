import NavigationTemplate from '../templates/navigationTemplate'

function HomePage({videos}) 
{
    return (
        <>
            <NavigationTemplate />
            <ul>
                {videos.map((video) => (
                    <li>{video.title}</li>
                ))}
            </ul>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://127.0.0.1:3001/api/videos');
    const videos = await res.json();

    return {
        props: {
            videos,
        },
    }
}

export default HomePage