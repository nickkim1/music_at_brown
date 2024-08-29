import Hero from '../components/Hero';
import ArtistListings from '../components/ArtistListings';
import ViewAllArtists from '../components/ViewAllArtists';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ArtistListings />
            <ViewAllArtists />
        </>
    ); 
}

export default HomePage;