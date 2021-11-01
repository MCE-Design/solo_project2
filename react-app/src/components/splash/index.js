import React from 'react';
import "./splash.css";
import yap_logo from "../../images/yap_logo.svg"

function Splash() {

  return (
    <>
      <div className="landingTop container">
        <div className="landingTopContent">
          <div className="landingTopInner">
            <div className="landingLogo" style={{backgroundImage: `url(${yap_logo})`}}>
              <a href="/">Yap</a>
            </div>
            <form className="landingSearchBar">
              <input className="searchInputLeft inputField" placeholder="nail salons, plumbers, takeout..."></input>
              <input className="searchInputRight inputField"></input>
            </form>

          </div>
        </div>
      </div>
      <div className="landingMiddle container">

      </div>
    </>
  );
}
export default Splash;
