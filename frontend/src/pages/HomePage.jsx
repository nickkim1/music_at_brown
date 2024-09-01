import Hero from '../components/Hero';
import ArtistListings from '../components/ArtistListings';
import ViewAllArtists from '../components/ViewAllArtists';

const HomePage = ({isLoggedIn, isArtist}) => {
    return (
        <>
            <Hero isLoggedIn={isLoggedIn} isArtist={isArtist} />
            <ArtistListings />
            <ViewAllArtists />
        </>
    ); 
}

export default HomePage;