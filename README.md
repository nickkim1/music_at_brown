### Music@Brown

## Overview: 
- This is a minimal application that uses the Spotify API to recommend 
artists based on shared genre tastes to students at Brown (or any college). It is comprised of a React frontend + Flask backend + SQLite database. The Flask backend serves a REST API to the React frontend and there are several supported endpoints e.g. recommend that support the content-filtering recommendation mechanism. 

- Currently the recommender is a K-nearest neighbors algorithm. Artists from the database
are compiled into an all-pairs matrix: their representative genres are one-hot-encoded and the cosine distance between each of the genre vectors between every pair of artists is inputted 
into said matrix for training of kNN. Users' top Spotify artists are then extracted and 
top k-nearest artists for each of their top artists are fetched, filtered, and displayed. 

## Instructions for running the dev version: 
- Frontend: 
- cd into fronted => npm run dev
- Backend: 
- cd into backend => flask run

## Places for improvement: 
- Lots of improvement for user authentication, the cookie storage is bugging out a lot but for now just took a few workarounds.
- kNN algorithm in the backend is super basic, need to advance it and/or get an algorithm with a better runtime or adopt a different method that isn't so taxing on fetching recs.
- Move past placeholder mocks for choice areas in the frontend-it would be good to expand out the database. 
- Organizationally error handling and middleware needs to be built out further. 
