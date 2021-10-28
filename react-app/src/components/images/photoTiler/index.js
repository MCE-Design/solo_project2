import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./phototiler.css";
import { useParams, NavLink, useHistory } from 'react-router-dom';
import menuDots from '../../../images/menuDots.svg'
import Modal from "../../modal"
import { deleteImage } from "../../../store/image"

function PhotoTile({image}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ modalOpen, setModalOpen ] = useState(false);

  const handleDelete = () => {
    dispatch(deleteImage(image?.id))
    history.push("/")
  }

  return(
    <div className="imageTile">
      <img src={image?.imageUrl} alt="" draggable="false"/>
      {image?.imageCaption ? (
        <div className="captionBox">
          {image?.imageCaption}
        </div>
      ) : (
        <></>
      )}
      <div className="imageControls">
        <button className='modal' onClick={() => setModalOpen(true)} style={{ opacity: '1' }}><img src={menuDots} alt='options' className="menuDots" /></button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <button className='red' onClick={handleDelete}>Delete</button>
          {/* <button className='red' onClick={(e) => history.push(`/images/${image?.id}/edit`)}>Edit</button> */}
        </Modal>
      </div>
    </div>
  )
}
export default PhotoTile;
