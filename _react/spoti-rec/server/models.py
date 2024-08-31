# general purpose database functions & classes e.g. types, query-building helpers
import sqlalchemy as sa
from typing import Optional
# provides support for building models
import sqlalchemy.orm as so
from app import db 
from datetime import datetime, timezone
# cryptographic hashes for secure passwords 
from werkzeug.security import generate_password_hash, check_password_hash
# login utils
from flask_login import UserMixin
from app import login_manager
import logging
logging.basicConfig(level=logging.DEBUG)


@login_manager.user_loader
def load_user(id):
    """
    NOTES:
    - flask login stores uq id for logged in user in flask's user session : every time user that's logged in navs to new page, retrieve user's id from session, load user into memory
    - all server-side storage when it comes to storing user session info
    - load user given an id since otherwise no info
    - i couldn't get the cookies to work here, TBD for a later date. workaround was to just specify username and password from dashboard side manually
    """
    return Artist.get(int(id))

class User(UserMixin, db.Model):
    
    """
    NOTES: 
    - extends from db.Model: base class for all models
    - represents generic user & initial db structure/schema for this app
    - migration scripts will use this as a comparison to the existing db schema, makes it convenient bc you don't have to redo the entire db every time you apply change to schema
    - one thing to note: app.db <- SQLite, but other stuff like postgres mysql need to create dbn in server before running upgrade from migration script
    - fields defined below are the columns created in the corres. database table
    - field types are assigned using Python type hints (str, etc.) wrapped in so.Mapped generic type that REQUIRE values unless Optional is specified 
    - https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database
    """
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    spotify: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256)) # defining a column sometimes rqeuires more than the column type, provide specs with so.mapped_column()

    def __repr__(self):
        """
        - tells Python how to print objects of this class (useful for debug)
        """
        return '<User {}>'.format(self.username)
    
    def set_password(self, password): 
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.id)


artist_venue_assoc = db.Table('artist_venue', 
                         db.Model.metadata,
                         db.Column('artist_id', db.Integer, db.ForeignKey('artist.id'), primary_key=True), 
                         db.Column('venue_id', db.Integer, db.ForeignKey('venue.id'), primary_key=True))
    
class Artist(UserMixin, db.Model): 
    """
    NOTES:
    - Representation for an artist
    - Technically other info doesn't really matter besides spotify? Still incldued
    - artists - venues have a many-many relationship 
    - We need to create an association table to represent this
    ->> reference: https://stackoverflow.com/questions/5756559/how-to-build-many-to-many-relations-using-sqlalchemy-a-good-example 
    """

    __tablename__ = 'artist'

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    insta: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    spotify: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    twitter: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    facebook: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    booking: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    img: so.Mapped[str] = so.mapped_column(sa.String(140), index=True)
    location: so.Mapped[str] = so.mapped_column(sa.String(140), index=True)
    description: so.Mapped[str] = so.mapped_column(sa.String(500), index=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))

    # [[Many-Many]]
    venues = db.relationship('Venue', secondary=artist_venue_assoc, back_populates='artists')
    
    def __repr__(self): 
        return '<Artist {}>'.format(self.username)
    
    def set_password(self, password): 
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def serialize(self): 
        """
        serialize into a dictionary representation 
        """
        venues = []
        for i in range(len(self.venues)): 
            venue = {'loc': self.venues[i].loc, 'link': self.venues[i].link, 'date': self.venues[i].date, 'time': self.venues[i].time}
            venues.append(venue)

        return {
            'username': self.username, 
            'name': self.name,
            'img': self.img,
            'insta': self.insta,
            'spotify': self.spotify,
            'twitter': self.twitter,
            'facebook': self.facebook, 
            'booking': self.booking,
            'location': self.location,
            'description': self.description,
            'venues': venues
        }

class Venue(db.Model):
    """
    NOTES
    - For mapping an artist back to their venues 
    - note: adding an index makes retrieval faster but stuff like writes slower
    - artists - venues have a many-many relationship 
    - We need to create an association table to represent this
    ->> reference: https://stackoverflow.com/questions/5756559/how-to-build-many-to-many-relations-using-sqlalchemy-a-good-example 
    """ 
    __tablename__ = 'venue'

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    loc: so.Mapped[str] = so.mapped_column(sa.String(140), index=True) # essentially the body of venue text, we just want to headline the location on display
    link: so.Mapped[str] = so.mapped_column(sa.String(500), index=True)
    date: so.Mapped[str] = so.mapped_column(sa.String(32), index=True)
    time: so.Mapped[str] = so.mapped_column(sa.String(32), index=True)

    # [[Many-Many]]
    artists = db.relationship('Artist', secondary=artist_venue_assoc, back_populates='venues')

    def __repr__(self): 
        return '<Venue {}>'.format(self.loc)


# Old code and notes
# not a field: high level of the relationship-connects entries across tables
# venues: so.WriteOnlyMapped['Venues'] = so.relationship(back_populates='performer')

# timestamp is configured to be indexed, good for retrieving venues in chronological order but idk if I'll use
# like i could do recently-added venues
# utc to avoid local timezone issues, will be auto-converted to user's local timezone
# timestamp: so.Mapped[datetime] = so.mapped_column(
# index=True, default=lambda: datetime.now(timezone.utc))

# from tutorial, scratch for many-many
# artist_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Artist.id), index=True)
# performer: so.Mapped[Artist] = so.relationship(back_populates='venues')