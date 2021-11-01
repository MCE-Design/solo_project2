
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import "./navbar.css"
import yap_logo from "../../images/yap_logo_dark.svg"

const NavBar = () => {
  const currentPage = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  console.log(currentPage)
  const path = currentPage.pathname
  console.log("page match", /\/business\/\d+\/newreview/.test(currentPage.pathname));
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
                <LogoutButton />
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
          <div className="loginLogo" style={{backgroundImage: `url(${yap_logo})`}}>
            <a href="/">Yap</a>
          </div>
        </div>
      </div>
    )
  } else if (/\/business\/\d+\/newreview/.test(currentPage.pathname) || /\/business\/\d+\/editreview/.test(currentPage.pathname)){
    return (
      <div className="navContainer">
        <nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
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
                    <NavLink to='/signup' exact={true} activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <LogoutButton />
                </>
              )
            }
          </ul>
        </nav>
      </div>
    )
  } else {
    return (
      <div className="navContainer navGeneral">
        <nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
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
                <LogoutButton />
              )
            }
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
