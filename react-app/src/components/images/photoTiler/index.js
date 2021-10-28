import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./phototiler.css";
import { useParams, NavLink, useHistory } from 'react-router-dom';

function PhotoTile({image}) {
  const dispatch = useDispatch();

  return(
    <div className="imageTile">
      <img src={image?.imageUrl} alt="" />
      <div></div>
    </div>
  )
}
export default PhotoTile;
