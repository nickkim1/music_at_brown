from app import app
from flask import Flask, redirect, request, jsonify, url_for
import sqlalchemy as sa
from app import db
from models import User, Artist, Venue
from flask_login import login_user, current_user, logout_user, login_required
import logging

logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def index(): 
    return "Welcome! This is the server homepage" # Default route for the server, what you see on open

@app.route('/artistdashboard', methods=["GET", "POST"])
def artist_dashboard(): 

    if current_user.is_authenticated: # TODO: block users from seeing custom dashboard unless they're logged in fully
        print("IS LOGGED IN ALREADY", current_user.username)

    data = request.get_json()
    username = data.get('username')
    artist = db.session.scalar(sa.select(Artist).where(Artist.username==username)) # get the username and password of the artist 
    
    if artist: 
        return jsonify({"message": "Dashboard", "status": "Success", "profile": artist.serialize()}), 200

@app.route('/deleteartist', methods=["POST"])
def delete_artist(): 

    data = request.get_json()
    username = data.get('username')  # should just be username since it's meant to be a unique field 
    artist = db.session.scalar(sa.select(Artist).where(Artist.username==username))

    if not artist:
        print("Can't delete")
    else:
        db.session.delete(artist)

        # This removal of artist from Venues should be done, since it's a many-many relationship, probably needs a join
        # associated_venues = db.session.scalar(sa.select(Venue).where()) # fetch all the sasociated venues 
        # for venue in associated_venues:
        #     venue.artists.remove(artist) # if they're associated with that artist remove the relationship

        db.session.commit()

    return jsonify({"message": "Deleted profile", "status": "Success"}), 200

@app.route("/artistlogin", methods=["GET", "POST"])
def artist_login(): 

    # if they try to login but they're already in the system, no need for them to re-authenticate
    if current_user.is_authenticated: 
        return jsonify({"message": "Logged in", "status": "Success"}), 200

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    artist = db.session.scalar(sa.select(Artist).where(Artist.username==username))

    if not artist or not artist.check_password(password): 
        print("INVALID USERNAME OR PW")
        return jsonify({"message": "Invalid username or password", "status": "Invalid"}), 401
    else: 
        print("LOGGING IN USER")
        print(artist, artist.is_active)
        print(login_user(artist, remember=True))

    # if successful and doesn't hit bad request as in the above
    return jsonify({"message": "Logged in", "status": "Success"}), 200

@app.route("/artistlogout", methods=["POST"])
def artist_logout():
    logout_user()
    return jsonify({"message": "Logged out", "status": "Success"}), 200

@app.route("/artistsignup", methods=["GET", "POST"])
def artist_signup(): 

    if current_user.is_authenticated: 
        print("You're already logged in!")
        return jsonify({'message': 'Already logged in'}, 401)
    
    data = request.get_json()

    # conditionally add user or artist 
    username = data.get('username')
    password = data.get('password')
    img = data.get('img')
    name = data.get('name')
    twitter = data.get('twitter')
    insta = data.get('insta')
    spotify = data.get('spotify')
    facebook = data.get('facebook')
    location = data.get('location')
    booking = data.get('booking')
    venues = data.get('venues')
    description = data.get('description')

    artist = db.session.scalar(sa.select(Artist).where(Artist.username==username)) 
    
    if artist: 
        print("ARTIST ALREADY IN DB")
    if not artist:
        print("ARTIST NOT IN DB")
        artist = Artist(username=username, name=name, img=img, twitter=twitter,insta=insta, spotify=spotify, facebook=facebook, booking=booking, location=location, description=description)
        artist.set_password(password)
        db.session.add(artist)
        db.session.commit()

    for _, v in venues.items(): 
        existing_venue_that_matches = db.session.scalar(sa.select(Venue).where((Venue.loc==v['venue-loc']) & (Venue.link==v['venue-link']) & (Venue.date==v['venue-date']) & (Venue.time==v['venue-time'])))

        if not existing_venue_that_matches: 
            print("VENUE DOESN'T EXIST ALREADY")
            venue = Venue(loc=v['venue-loc'], link=v['venue-link'], date=v['venue-date'], time=v['venue-time'])
    
            if artist not in venue.artists: 
                venue.artists.append(artist)
                db.session.add(venue)
                db.session.commit()
            else:
                print("VENUE ALREADY IN ARTIST LIST DONT READD")
        else: 
            print("VENUE ALREADY EXISTS")
            if artist not in existing_venue_that_matches.artists: 
                existing_venue_that_matches.artists.append(artist)
                db.session.commit()
            else: 
                print("ARTIST ALREADY IN VENUE LIST DONT READD")

    return jsonify({"message": "Signed up"}), 200

@app.route('/editartist', methods=["POST"])
def edit_artist():
    data = request.get_json()
    username = data.get('username')
    artist = db.session.scalar(sa.select(Artist).where(Artist.username==username)) 

    if not artist:
        print("Can't edit")
    else:

        artist.name = data.get('name')
        artist.img = data.get('img')
        artist.location = data.get('loc')
        artist.spotify = data.get('spotify')
        artist.twitter = data.get('twitter')
        artist.facebook = data.get('facebook')
        artist.insta = data.get('insta')
        artist.description = data.get('description')
        artist.booking = data.get('booking')
        venues = data.get('venues')
        
        # Just delete the artist's association with those venues
        # TODO: delete the venues' associations with those artists, it's clutter? 
        # TODO: A better solution to all this would NOT be to store an association table bc that makes handling the relationships really difficult, maybe just store str ids where interference doesn't make you have to redo half the db?
        
        new_venues = []
        for _, v in venues.items(): 

            # TODO: Check if there's an existing venue--this really isn't perfect for some basic edge cases I thought of: 
            # - edge cases if they add in a venue with the same loc, same link but diff times and want to keep multiple
            # - the best way to avoid this is to keep track of the id's you modify and delete and map those patterns 
            # in the frontend exactly, but that's just not here for now 
            # - this just assumes a) uq location and b) uq link 
            existing_venue = db.session.scalar(sa.select(Venue).where((Venue.loc==v['venue-loc']) & (Venue.link==v['venue-link'])))
            if existing_venue: 
                existing_venue.date = v['venue-date']
                existing_venue.time = v['venue-time']

                # This is a bit of a weird case, but made sense to me: add artists that aren't already there. Doesn't work
                if artist not in existing_venue.artists: 
                    existing_venue.artists.append(artist)
                new_venues.append(existing_venue)

            else: 
                venue = Venue(loc=v['venue-loc'], link=v['venue-link'], date=v['venue-date'], time=v['venue-time'])
                venue.artists.append(artist)
                db.session.add(venue)
                db.session.commit()
                new_venues.append(venue)
            
        artist.venues = new_venues
        db.session.commit()
            
    return jsonify({"message": "Edited profile", "status": "Success"}), 200

# Other thoughts to implement: 
# require users to login before they access anything?
# workaround i did is to just render the dash conditionally based on loggedin status
# more complex logic could be implemented with redirects: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-v-user-logins 
# @login_required # <<- I couldn't get cookies to work so this is going to have to go