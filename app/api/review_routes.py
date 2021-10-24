from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review
from colors import *

review_routes = Blueprint('review', __name__)


@review_routes.route('/<int:id>', methods=["GET"])
def review(id):
    review = Review.query.get(id)
    print(CGREEN + "\n review: \n", review.to_dict(), "\n" + CEND)
    return review.to_dict()

@review_routes.rout('/', methods=["GET"])
def review():
    review = Review.query.get()
