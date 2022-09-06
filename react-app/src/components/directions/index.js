import React, { useRef, useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getBusiness } from '../../store/business';
import { getReviewsByBusiness } from '../../store/review';
// import { getDirections } from '../../store/directions';
import { useParams, NavLink } from 'react-router-dom';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

// create a function to make a directions request
async function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  // add turn instructions here at the end
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  // this is where the code from the next step will go
});

function Directions() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business);
  const defaultLng = useSelector((state) => state.business.business?.lng);
  const defaultLat = useSelector((state) => state.business.business?.lat);
  const { review } = useSelector((state) => state.review);
  const sessionUser = useSelector(state => state.session.user);
  const [ userReviewed, setUserReviewed ] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9); // Sets LONGITUDE and default LONGITUDE
  const [lat, setLat] = useState(42.35); // Sets LATITUDE and default LATITUDE
  const [zoom, setZoom] = useState(9); // Sets ZOOM and default ZOOM
  const [travelType, setTravelType] = useState("driving"); // Sets travel type;

  window.document.title = `Yap - ${business?.name}`

  useEffect(() => {
    dispatch(getBusiness(businessId));
    dispatch(getReviewsByBusiness(businessId));
  }, [dispatch, businessId, review?.reviews?.length]);

  useEffect(() => {
    if (review?.reviews?.filter((ele) => ele?.userId === sessionUser?.id).length > 0) {
      setUserReviewed(true);
    } else {
      setUserReviewed(false);
    }
  }, [dispatch, review, sessionUser]);

  // Initialize the map
  useEffect(() => {
    console.log("MAP INIT")
    if (map.current) return; // initialize map only once
    if ( defaultLat ){
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mce-design/ckx882y3808wl15prli2yo0q5',
        // center: [lng, lat],
        center: [defaultLng, defaultLat],
        zoom: zoom
      });
    }
  });

  // STORE the new coordinates
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  console.log(business)
  console.log("sessionUser", sessionUser)
  console.log("Reviews", review?.reviews?.length)
  console.log("USER ID", sessionUser?.id)
  return (
    <>
      <div className="backPageMain">
        <div className="contentContainer">
          <div className="photoStatus">
            {/* <ul className={errors.length > 0 ? ("alertBox alert") : ("alertbox")}>
              {console.log("The Errors", errors)}
              {errors?.map((error) => {
                  return(
                  <li key={error} className="">
                    {error}
                  </li>
                  )
                })}
            </ul> */}
          </div>
          <div className="backPageTop">
            <div className="backPageLeft">
              <ul className="photoUploadBusinessInfo">
              </ul>
            </div>
            <div className="backPageRight">

            </div>
          </div>
          <div className="photoUploadBottom">
            <div className="photoUploadContainer backPageLowerContainer">
              <div className="photoUploadBody">

                <div ref={mapContainer} className="map-container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Directions;
