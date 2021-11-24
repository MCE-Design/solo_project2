import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import logoutIcon from "../../images/logout_black_24dp.svg";

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className="button"><div className="buttonIcon" style={{backgroundImage: `url(${logoutIcon})`}}></div>Logout</button>;
};

export default LogoutButton;
