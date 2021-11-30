
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import "./navbar.css";
import yap_logo from "../../images/yap_logo.svg";
import yap_logo_dark from "../../images/yap_logo_dark.svg";
import aboutMeIcon from "../../images/account_circle_black_24dp.svg";
import settingsIcon from "../../images/settings_black_24dp.svg";

const NavBar = () => {
  const currentPage = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const [ menuToggle, setMenuToggle ] = useState(false);
  console.log(currentPage)
  console.log("page match", /\/business\/\d+\/newreview/.test(currentPage.pathname));

  const handleMenu = () => {
    const navDropDown = document.querySelector(".navDropDownMenu")
    if( !menuToggle ){
      navDropDown.classList.add("active");
      setMenuToggle(true);
    } else {
      navDropDown.classList.remove("active");
      setMenuToggle(false);
    }
  }

  if(currentPage.pathname === "/")
  {
    return (
      <div className="landingContainer navContainer">
        <nav>
          <ul>
            <li>
              {/* <NavLink to='/writereview' exact={true} className="headerLink" activeClassName='active'>
                Write a Review
              </NavLink> */}
            </li>
            <li className="navSpacer">

            </li>
            {!sessionUser ? (
                <>
                  <li>
                    <NavLink to='/login' exact={true} className="headerLink" activeClassName='active'>
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup' exact={true} className="headerLink signUp button" activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="navDropDown">
                  <div className="navDropDownButton button" onClick={handleMenu}>
                    <img src={sessionUser?.avatar} alt="User Avatar"/>
                  </div>
                  <ul className="navDropDownMenu">
                    <li className="navItem">
                      <NavLink to="/user" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${aboutMeIcon})`}}></div>About Me</NavLink>
                    </li>
                    <li className="navItem">
                      <NavLink to="/user/details" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${settingsIcon})`}}></div>Account Settings</NavLink>
                    </li>
                    <li className="navItem">
                      <LogoutButton onClick={handleMenu}/>
                    </li>
                  </ul>
                </div>
              )
            }
            <li>

            </li>
          </ul>
        </nav>
      </div>
    );
  } else if (currentPage.pathname ==="/login" || currentPage.pathname ==="/signup"){
    return (
      <div className="loginAndSignUp navContainer">
        <div className="">
          <div className="loginLogo" style={{backgroundImage: `url(${yap_logo_dark})`}}>
            <a href="/">Yap</a>
          </div>
        </div>
      </div>
    )
  } else if (/\/business\/\d+\/newreview/.test(currentPage.pathname) || /\/business\/\d+\/editreview/.test(currentPage.pathname)){
    return (
      <div className="navContainer navGeneral">
        <nav>
          <ul>
            <li>
              <div className="navLogo" style={{backgroundImage: `url(${yap_logo})`}}>
                <NavLink to="/">Yap</NavLink>
              </div>
            </li>
            <li className="navSpacer">

            </li>
            {!sessionUser ? (
                <>
                  <li>
                    <NavLink to='/login' exact={true} className="headerLink" activeClassName='active'>
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup' exact={true} className="headerLink signUp button" activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="navDropDown">
                  <div className="navDropDownButton button" onClick={handleMenu}>
                    <img src={sessionUser?.avatar} alt="User Avatar"/>
                  </div>
                  <ul className="navDropDownMenu">
                    <li className="navItem">
                      <NavLink to="/user" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${aboutMeIcon})`}}></div>About Me</NavLink>
                    </li>
                    <li className="navItem">
                      <NavLink to="/user/details" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${settingsIcon})`}}></div>Account Settings</NavLink>
                    </li>
                    <li className="navItem">
                      <LogoutButton onClick={handleMenu}/>
                    </li>
                  </ul>
                </div>
              )
            }
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navContainer navGeneral">
        <nav>
          <ul>
            <li>
              <div className="navLogo" style={{backgroundImage: `url(${yap_logo})`}}>
                <NavLink to="/">Yap</NavLink>
              </div>
            </li>
            <li className="navSpacer">

            </li>
            {!sessionUser ? (
                <>
                  <li>
                    <NavLink to='/login' exact={true} className="headerLink backPageHeaderButton lightButton button" activeClassName='active'>
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup' exact={true} className="headerLink backPageHeaderButton redButton button" activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="navDropDown">
                  <div className="navDropDownButton button" onClick={handleMenu}>
                    <img src={sessionUser?.avatar} alt="User Avatar"/>
                  </div>
                  <ul className="navDropDownMenu">
                    <li className="navItem">
                      <NavLink to="/user" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${aboutMeIcon})`}}></div>About Me</NavLink>
                    </li>
                    <li className="navItem">
                      <NavLink to="/user/details" onClick={handleMenu} className="navItemContent"><div className="buttonIcon" style={{backgroundImage: `url(${settingsIcon})`}}></div>Account Settings</NavLink>
                    </li>
                    <li className="navItem">
                      <LogoutButton onClick={handleMenu}/>
                    </li>
                  </ul>
                </div>
              )
            }
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
