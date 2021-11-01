import React from 'react';
import { NavLink } from 'react-router-dom';
import "./footer.css"
import octoCat from "../../images/GitHub-Mark-32px.png"
import linkedIn from "../../images/LI-In-Bug.png"

const Footer = () => {

  return(
    <div id="footer">
      <div className="footerContent">
        <h1>Created by Michael Eng</h1>
        <div className="footerLower">
          <div className="footerLinks">
            <a href="https://github.com/MCE-Design"><img src={octoCat} alt="Github Octo Logo" /> on Github</a>
          </div>
          <div className="footerLinks">
            <a href="https://www.linkedin.com/in/m5-design/"><img src={linkedIn} alt="Linkedin Logo"/> on LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;
