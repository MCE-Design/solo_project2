
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useLocation } from 'react-router';
import "./navbar.css"

const NavBar = () => {
  const currentPage = useLocation();
  console.log(currentPage)

  if(currentPage.pathname === "/")
  {
    return (
      <div className="landingContainer navContainer">
        <nav>
          <ul>
            <li>
              <NavLink to='/writereview' exact={true} className="headerLink" activeClassName='active'>
                Write a Review
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' exact={true} className="headerLink" activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} className="headerLink" activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to='/users' exact={true} className="headerLink" activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navContainer">
        <nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
