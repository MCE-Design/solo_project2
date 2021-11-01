import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBusinesses } from '../../store/business';
import "./splash.css";
import yap_logo from "../../images/yap_logo.svg"
import image1 from "../../images/splash_images/poodle_massage.jpg"

import business1_image from '../../images/business_hero_images/business1/page_image1.jpg';
import business2_image from '../../images/business_hero_images/business2/page_image1.jpg';
import business3_image from '../../images/business_hero_images/business3/page_image1.jpg';

function Splash() {
  const dispatch = useDispatch();
  const businesses = useSelector( (state) => (state.business.business))

  useEffect(() => {
    dispatch(getAllBusinesses());
  }, [dispatch])

  return (
    <>
      <div className="landingTop container" style={{backgroundImage: `url(${image1})`}}>
        <div className="landingTopContent">
          <div className="landingTopInner">
            <div className="landingLogo" style={{backgroundImage: `url(${yap_logo})`}}>
              <a href="/">Yap</a>
            </div>
            {/* Put This Back Later */}
            {/*
            <form className="landingSearchBar">
              <input className="searchInputLeft inputField" placeholder="nail salons, plumbers, takeout..."></input>
              <input className="searchInputRight inputField"></input>
            </form> */}

          </div>
        </div>
      </div>
      <div className="landingMiddle container">
        <div className="landingMiddleContent">
          <div className="mostBarked">
            <h1>Most Barked About in Your Area</h1>
            <div className="businessTileContainer">
              {businesses?.businesses?.map((business) => {
                return(
                  <div className="businessTile" key={business?.id}>
                    <div className="businessTileBody">
                      <div className="businessTileImage">
                        {/* <img src="" /> */}
                        {business?.id === 1 && (
                          <>
                            <img src={business1_image} alt="placholder1"/>
                          </>
                        )}
                        {business?.id === 2 && (
                          <>
                            <img src={business2_image} alt="placholder2"/>
                          </>
                        )}
                        {business?.id === 3 && (
                          <>
                            <img src={business3_image} alt="placholder3"/>
                          </>
                        )}
                      </div>
                      <div className = "businessTileInfo">
                        <div className = "businessTileTitle">
                          <h3>
                            <NavLink to={`/business/${business?.id}`}>
                              {business?.name}
                            </NavLink>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Splash;
