import os 

class Config: 
    # Flask uses the secret key to gen signatures, tokens, it's a cryptographic key
    # this aprticular hardcoded alternate isn't great but suffices for this app in dev mode 
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'