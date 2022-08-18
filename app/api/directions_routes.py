from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db
from colors import *

directions_routes = Blueprint('directions', __name__)


@directions_routes.route("", methods=["POST"])
def directions():
  print(CGREEN + "\n REQUEST HIT \n", "\n" + CEND)
  if "image" not in request.files:
    return {"errors": ["Image required"]}, 400

  image = request.files["image"]
  print(CGREEN + "\n CLEARED IMAGE: \n", "\n" + CEND)

  # https://api.mapbox.com/directions/v5/mapbox/{profile}/{coordinates}
  # walking, cycling, driving
  # https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1IjoibWNlLWRlc2lnbiIsImEiOiJja3g4NmF5eXoxNnN5MnZxdXlpaWcxM3l3In0.A_7OTI9bVe-586aBwNWRSA

  if "url" not in upload: # Basically if it's missing the "url" key there was some kind of error
    print(CGREEN + "\n upload error \n", upload,"\n" + CEND)
    return {"errors":["AWS Uploaded Failed"]}, 400

  print(CGREEN + "\n HIT \n", "\n" + CEND)
  url = upload["url"]

  new_image = Image(
    userId=current_user.id,                          # We'll use the current user as the one who uploaded the image
    imageable_id = request.form["imageable_id"],
    imageable_type = request.form["imageable_type"],
    imageUrl=url,
    imageCaption = request.form["imageCaption"]
  )
  db.session.add(new_image)
  db.session.commit()
  return {"url": url}
