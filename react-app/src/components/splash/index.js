import React from 'react';
import "./splash.css";

function Splash() {

  return (
    <>
      <div className="landingTop container">
        <div className="landingTopContent">
          <div className="landingTopInner">
            <div className="landingLogo">
              <a href="/">YAP LOGO PLACEHOLDER</a>
            </div>
            <form className="landingSearchBar">
              <input className="searchInputLeft inputField" placeholder="nail salons, plumbers, takeout..."></input>
              <input className="searchInputRight inputField"></input>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
export default Splash;
