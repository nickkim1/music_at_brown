import { Link } from 'react-router-dom';

const ViewAllArtists = () => {
    return (
        <section className="view-all">
          <Link className="view-all-but" to={"artists"}>
            View All Artists
          </Link>
        </section>
    );
}

export default ViewAllArtists;