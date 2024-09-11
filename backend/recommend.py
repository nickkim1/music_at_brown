import numpy as np 
import pandas as pd
from sklearn.neighbors import NearestNeighbors

class GenreRecommender(): 
    def __init__(self, user_data, artist_data): 
        """
        potentially useful stuff: 
        - Get artist
        - Get user's top artists
        - Check if user follows artist or users
        - Get (user's) followed artists
        """
        self.user_data, self.user_genres = self.preprocess_json(user_data)
        self.artist_data, self.artist_genres = self.preprocess_json(artist_data)
        self.all_pairs_m, self.collated_data = self.postprocess_data(self.user_data, self.artist_data, self.user_genres, self.artist_genres)
        self.model_knn = self.k_nearest_basic_setup(self.all_pairs_m)
        
        # the ideas are kind of here but the order is messsed up
        # - if the stuff is stratified then the set definitely makes it unordered, it should be recs by artist then not overall
        # - and if i just took out the whole list reordering in that sense doesn't make sense either

        self.final_recs = {}
        for i, row in enumerate(self.all_pairs_m):
            artist_recs = self.k_nearest_basic_rec(model_knn=self.model_knn, item=row, item_idx=i) # <- pass in the genre vector
            username = self.collated_data.loc[i, "username"]
            self.final_recs[username] = artist_recs


    def preprocess_json(self, data): 
        """
        - Weird to be doing this in the backend but process the JSON 
        format input data sent from Spotify API
        - User data comes in same format as artist data
        - {user/artist: { artist1: [genres], artist2: [genres], ...}}
        """
        usernames, genres, all_genres = [], [], []
        for k, v in data.items(): 
            usernames.append(k)
            genres.append(v)
            for genre in v: 
                all_genres.append(genre)
        return pd.DataFrame({"username": pd.Series(usernames), "genres": pd.Series(genres)}), all_genres

    def postprocess_data(self, user_data, artist_data, user_genres, artist_genres): 
        """
        - We want to collate these so that we can create the all-pairs matrix
        """
        collated_data = pd.concat([user_data, artist_data]).reset_index(drop=True)

        # create reverse-lookup table of artist->index
        reverse_artist_to_idx = {}
        for i in range(len(collated_data)): 
            reverse_artist_to_idx[collated_data.loc[i, "username"]] = i

        # create a vocabulary of genres
        c = list(set(user_genres + artist_genres)) # genre vocabulary

        # another reverse-lookup for util purpsoes
        reverse_lookup = {}
        for i in range(len(c)):
            reverse_lookup[c[i]]=i 

        # one-hot-encode genre vectors
        ohe_artist_genres = {"username": [], "genres": []}
        for i, genres in enumerate(list(collated_data["genres"])): 
            username = collated_data.loc[i, "username"]
            ohe_vec = np.zeros((len(c)))
            for genre in genres:
                ohe_vec[reverse_lookup[genre]]=1 
            ohe_artist_genres["username"].append(username)
            ohe_artist_genres["genres"].append(ohe_vec)
        ohe_artist_genres = pd.DataFrame(ohe_artist_genres)

        # generate all-pairs distance matrix from one-hot
        m = len(ohe_artist_genres["genres"])
        all_pairs=np.zeros((m, m))
        for i in range(len(ohe_artist_genres["genres"])): 
            for j in range(len(ohe_artist_genres["genres"])):
                all_pairs[i][j] = self.cosine_distance(ohe_artist_genres["genres"][i], ohe_artist_genres["genres"][j])
        
        # expectation: should be a pretty sparse similarity matrix, in our case it's just going to be a bunch of 1s 
        return all_pairs, collated_data
    
    def k_nearest_basic_setup(self, all_pairs): 
        """
        - This just fits a knn model to our all-pairs distance matrix
        - TQDM would probably make this nicer to look at, with some kind of frontend loading display
        """
        model_knn = NearestNeighbors(metric='precomputed', algorithm='brute', n_neighbors=3, n_jobs=-1)
        model_knn.fit(all_pairs)
        return model_knn
    
    def k_nearest_basic_rec(self, model_knn, item, item_idx): 
        """
        - Right now: retrieve 3-most similar artists for every artist that's in our collated results
        - Notably this really isn't what we want--we'd ideally want recs from the database exclusively, informed by Spotify taste and for the user artists alone?
        - Just put this in to demonstrate 'recommendation' abilities alone, will work on in future
        """
        distances, indices = model_knn.kneighbors(item.reshape(1,-1), n_neighbors=3)
        sorted_artist_indices = sorted(zip(distances, indices), key=lambda x:x[0]) # sort by distances in increasing order (most similar first)
        
        # we can use our original table to retrieve the corresponding usernames
        res = []
        for entry in sorted_artist_indices:
            for idx in entry[1]:  
                username = self.collated_data.loc[idx, "username"]
                if idx != item_idx: #don't recommend yourself
                    res.append(username)
        
        return res

    def return_recs(self):
        """
        Return final recommendations
        """
        return self.final_recs

    def cosine_distance(self, arr1, arr2):
        """
        Cosine distance per formula 
        """ 
        return max(1 - (np.dot(arr1, arr2) / (np.sqrt(np.sum(arr1)) + np.sqrt(np.sum(arr2)))), 0)