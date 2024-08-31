from app import app

"""
- flask run looks for Flask application instance referenced in FLASK_APP env var
- output idnicates what ip address ur server is running on (addr of ur own computer), localhost
- network servers listen for connects on a spec port number, bc we're in dev it's 5k here
- enter routes into addr, will error if app doesn't recognize otherwise redirect and show output of corr func
- python-dot-env makes convenient to not have to set env vars just psecificy .flask-envi n top level dir
- change port number if in use flask run--port=<ur port number>
"""