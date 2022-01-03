import React, { useRef, useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getBusiness } from '../../store/business';
import { getReviewsByBusiness } from '../../store/review';
import { useParams, NavLink } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNlLWRlc2lnbiIsImEiOiJja3g4NmF5eXoxNnN5MnZxdXlpaWcxM3l3In0.A_7OTI9bVe-586aBwNWRSA';

function Directions() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business);
  const { review } = useSelector((state) => state.review);
  const sessionUser = useSelector(state => state.session.user);
  const [ userReviewed, setUserReviewed ] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9); // Sets LONGITUDE and default LONGITUDE
  const [lat, setLat] = useState(42.35); // Sets LATITUDE and default LATITUDE
  const [zoom, setZoom] = useState(9); // Sets ZOOM and default ZOOM

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
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mce-design/ckx882y3808wl15prli2yo0q5',
      center: [lng, lat],
      zoom: zoom
    });
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
