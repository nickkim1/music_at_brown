import app
from flask import render_template

@app.errorhandler(404)
def not_found_error(error):
    pass
    # return render_template, 404

@app.errorhandler(500)
def internal_error(error):
    pass
    # db.session.rollback()
    # return render_template(), 500