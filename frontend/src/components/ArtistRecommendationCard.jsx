import { useState } from "react";

const ArtistRecommendationCard = ({ artistUsername, artistPassword, accessToken }) => {
  
    // Credit for functions to : https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

    const [spotifytId, setSpotifyId] = useState("");

    const onSpotifyFetch = async (e) => {
      e.preventDefault();

      const generateRandomString = (length) => {
        const possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce(
          (acc, x) => acc + possible[x % possible.length],
          ""
        );
      };

      const codeVerifier = generateRandomString(64); //=random string

      const sha256 = async (plain) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest("SHA-256", data);
      }; //hash the random string using SHA encryption

      const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
      }; //sha->base 64 representation

      try {
        let payload = { username: artistUsername, password: artistPassword };
        await fetch("http://127.0.0.1:5000/artistdashboard", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json", // Add this header
          },
        })
          .then((prom) => prom.json())
          .then((data) => {
            console.log(data["profile"]["spotify"]);
            setSpotifyId(data["profile"]["spotify"]);
          });
      } catch(err){
        console.log(err)
      }

      const clientId = "YOUR CLIENT ID";
      const redirectUri = "http://localhost:5173/login"; // Redirect back to the original URL
      const scope = "user-read-private user-read-email";
      const authUrl = new URL("https://accounts.spotify.com/authorize");

    };

  return (
    <div className="recommendation-card">
      <h2>Your Statistics</h2>
      <div className="form-separator"></div>
      <p>View platform x Spotify profile stats</p>
      <button className="dashboard-fetch" onClick={onSpotifyFetch}>
        Customized stats coming soon!
      </button>
      <div className="form-separator"></div>
    </div>
  );
}

export default ArtistRecommendationCard;