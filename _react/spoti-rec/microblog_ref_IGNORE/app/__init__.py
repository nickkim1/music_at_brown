from flask import Flask
from config import Config

# __name__: predefined var, set to the name of the module it's used in 

app = Flask(__name__)

# Can specify your own config options like follows, directly 
app.config['SECRET_KEY'] = 'you-will-never-guess'

# more extensible <see config.py file in top level> 
app.config.from_object(Config)

# Put at the bottom to avoid circular routes
from app import routes