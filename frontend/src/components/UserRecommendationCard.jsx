import { useState, useEffect } from "react";
import RecommendCard from "./RecommendCard";

// **** 
// Client-side PKCE authorization flow -> fetch recommendations
// Credit for a lot of these functions (everything to do with tokens):
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
// https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js

const UserRecommendationCard = ({ userUsername, userPassword}) => {

    const clientId = "774dc15a55b64ea6b612c6ab1cc7b017";
    const redirectUrl = "http://localhost:5173/dashboard/"; // your redirect URL - must be localhost URL and/or HTTPS
    const authorizationEndpoint = "https://accounts.spotify.com/authorize";
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const scope ="user-read-private user-read-email user-follow-read user-top-read";

    localStorage.setItem("user_username", userUsername);
    localStorage.setItem("user_password", userPassword);
    localStorage.setItem("logged_in", true);

    // Data structure that manages the current active token, caching it in localStorage
    const currentToken = {
      get access_token() {
        return localStorage.getItem("access_token") || null;
      },
      get refresh_token() {
        return localStorage.getItem("refresh_token") || null;
      },
      get expires_in() {
        return localStorage.getItem("refresh_in") || null;
      },
      get expires() {
        return localStorage.getItem("expires") || null;
      },

      save: function (response) {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expires_in", expires_in);
        const now = new Date();
        const expiry = new Date(now.getTime() + expires_in * 1000);
        localStorage.setItem("expires", expiry);
      },
    };

    // On page load, try to fetch auth code from current browser search URL
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");

    // If we find a code, we're in a callback, do a token exchange
    if (code) {
      getToken(code).then((r) => {
        const token = r;
        currentToken.save(token);
      });

      // Remove code from URL so we can refresh correctly.
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      const updatedUrl = url.search ? url.href : url.href.replace("?", "");
      window.history.replaceState({}, document.title, updatedUrl);
    }

    // Redirect function
    async function redirectToSpotifyAuthorize() {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const randomValues = crypto.getRandomValues(new Uint8Array(64));
      const randomString = randomValues.reduce(
        (acc, x) => acc + possible[x % possible.length],
        ""
      );

      const code_verifier = randomString;
      const data = new TextEncoder().encode(code_verifier);
      const hashed = await crypto.subtle.digest("SHA-256", data);

      const code_challenge_base64 = btoa(
        String.fromCharCode(...new Uint8Array(hashed))
      )
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      window.localStorage.setItem("code_verifier", code_verifier);

      const authUrl = new URL(authorizationEndpoint);
      const params = {
        response_type: "code",
        client_id: clientId,
        scope: scope,
        code_challenge_method: "S256",
        code_challenge: code_challenge_base64,
        redirect_uri: redirectUrl,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
    }

    // Token
    async function getToken(code) {
      const code_verifier = localStorage.getItem("code_verifier");
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUrl,
          code_verifier: code_verifier,
        }),
      });
      return await response.json();
    }

    // API calls
    async function getUserData() {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: "Bearer " + currentToken.access_token },
      });
      return await response.json();
    }

    async function getArtistGenres(id) {
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + currentToken.access_token },
      });
      return await response.json();
    }

    // Click handlers
    async function loginWithSpotifyClick() {
      await redirectToSpotifyAuthorize();
    }

    async function handleClick() {
      if (!currentToken.access_token) {
        loginWithSpotifyClick();
      }
    }

    const [recs, setRecs] = useState({});

    const fetchRecs = async() => {
      try {

        // Get user top Spotify artists
        const userTopArtists = await fetch(
          "https://api.spotify.com/v1/me/top/artists",
          {
            method: "GET",
            headers: { Authorization: "Bearer " + currentToken.access_token },
          }
        );
        const userTopArtistsJson = await userTopArtists.json(); 

        // Process the user top Spotify artists into a dict
        let userArtistsToGenres = {}
        for (const [key, value] of Object.entries(userTopArtistsJson["items"])) {
          userArtistsToGenres[value["name"].toLowerCase().replace(/[^a-zA-Z0-9]/g, '')]=value["genres"]; //lowercase, strip of punc, whitespaces
        }

        // Get collated artists from the database and turn into a similar dict
        const collatedArtistsToIDs = await fetch("http://127.0.0.1:5000/collate");
        const collatedJson = await collatedArtistsToIDs.json();
        let dbArtistToGenres = {}
        for (const [key, value] of Object.entries(collatedJson["payload"])) {
          const artistProfile = await getArtistGenres(value); // Fetch genres for all the artists in the DB
          dbArtistToGenres[key]=artistProfile["genres"];
        }

        // Submit a post request for recommendation generation using both dicts
        const formData = {"userdata": userArtistsToGenres, "artistdata": dbArtistToGenres}; 
        const recommendations = await fetch("http://127.0.0.1:5000/recommend", 
          { method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            }
          }
        ); 
        const recommendationsJson = await recommendations.json(); 
        console.log(recommendationsJson);
        setRecs(recommendationsJson["payload"]);
        console.log(recs)
      } catch(err) {
        console.log("Error", err);
      }
    }

    useEffect(() => {
      // Log the updated state when `recs` changes
      console.log("Updated recs:", recs);
    }, [recs]);

  return (
    <div className="recommendation-card">
      <h2>Your Statistics</h2>
      <div className="form-separator"></div>
      <p>View platform x Spotify recommendation stats</p>
      <div className="recommendation-card-buttons">
        <button className="dashboard-fetch" onClick={async () => handleClick()}>
          Authorize spotify to fetch data!
        </button>
        <button className="dashboard-fetch" onClick={fetchRecs}>
          Fetch recommendations
        </button>
      </div>
      <div className="form-separator"></div>
      <div>
        {/* Only render the first 5 or so artists */}
        {Object.keys(recs).map((key, index) => (
          index <= 5 ? <RecommendCard key={index} artist={key} recommendedArtists={recs[key]}/> : <></>
        ))}
      </div>
    </div>
  );
};

export default UserRecommendationCard;


// Old Refresh Token Code
// async function refreshToken() {
//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       grant_type: 'refresh_token',
//       refresh_token: currentToken.refresh_token
//     }),
//   });
//   return await response.json();
// }
// async function refreshTokenClick() {
//   const token = await refreshToken();
//   currentToken.save(token);
// }