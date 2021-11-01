import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBusinesses } from '../../store/business';
import "./splash.css";
import yap_logo from "../../images/yap_logo.svg"

function Splash() {
  const dispatch = useDispatch();
  const businesses = useSelector( (state) => (state.business.business))

  useEffect(() => {
    dispatch(getAllBusinesses());
  }, [dispatch])

  return (
    <>
      <div className="landingTop container">
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
                        <img src="" />
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
