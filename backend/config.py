import os 
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    CORS_HEADERS = 'Content-Type'

    # flask-sql alchemy extension takes the location of the app db from this config var
    # app.db is llocated in the main dir of the app, stored in basedir var
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or "sqlite:///" + os.path.join(basedir, "app.db")
