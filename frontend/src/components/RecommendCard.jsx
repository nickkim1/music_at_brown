const RecommendCard = ({artist, recommendedArtists}) => {
    console.log(recommendedArtists);
    return (
      <>
        <p>If you like {artist}, also check out:</p>
        <ol>
          {recommendedArtists.map((x, index) => (
            <li key={index}>{x}</li>
          ))}
        </ol>
      </>
    );
}
export default RecommendCard; 