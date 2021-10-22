from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Business
from colors import *

business_routes = Blueprint('business', __name__)


@business_routes.route('/<int:id>', methods=["GET"])
def business(id):
    business = Business.query.get(id)
    print(CGREEN + "\n business: \n", business.to_dict(), "\n" + CEND)
    return business.to_dict()
