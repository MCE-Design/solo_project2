import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./phototiler.css";
import { useParams, NavLink, useHistory } from 'react-router-dom';
import Modal from "../../modal";
import { deleteImage } from "../../../store/image";
import menuDots from '../../../images/menuDots.svg';
import deleteIcon from '../../../images/delete_black_24dp.svg';
import editIcon from '../../../images/edit_black_24dp.svg';

function PhotoTile({image}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ modalOpen, setModalOpen ] = useState(false);

  const handleDelete = () => {
    dispatch(deleteImage(image?.id))
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
      <div className="lightboxTrigger button" onClick={() => setModalOpen(true)} style={{ opacity: '1' }}>

      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} lightbox={true}>
        <div className="lightbox">
          <div className="lightboxLeft">
            <img src={image?.imageUrl} className="lightboxImage" alt=""/>
          </div>
          <div className="lightboxRight">
            <button className="modalButton lightButton button" onClick={(e) => history.push(`/images/${image?.id}/edit`)} style={{backgroundImage: `url(${editIcon})`}}>
              Edit
            </button>
            <button className="modalButton lightButton button" onClick={handleDelete} style={{backgroundImage: `url(${deleteIcon})`}}>
              Delete
            </button>
          </div>
        </div>

      </Modal>
    </div>
  )
}
export default PhotoTile;
