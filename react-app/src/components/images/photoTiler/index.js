import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./phototiler.css";
import { useParams, NavLink, useHistory } from 'react-router-dom';
import Modal from "../../modal";
import { deleteImage, editImageCaption } from "../../../store/image";

function PhotoTile({image, user}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ editPanel, setEditPanel ] = useState(false);

  const handleDelete = () => {
    dispatch(deleteImage(image?.id))
    history.push("/user/photos/add");
  }

  const handleEditModeOpen = () => {
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    if( editPanel === false ){
      imageCaptionBox.setAttribute("contentEditable", "true");
      imageCaptionBox.classList.add("active");
      setEditPanel(true);
    }
  }

  const handleEditModeClose = () => {
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    imageCaptionBox.setAttribute("contentEditable", "false");
    imageCaptionBox.classList.remove("active");
    setEditPanel(false);
    imageCaptionBox.textContent = image?.imageCaption;
  }

  const handleEditSubmit = () => {
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    if ( imageCaptionBox.textContent !== image?.imageCaption) {
      console.log("SUBMITTABLE");
      const editedCaption = {
        id: image?.id,
        userId: image?.userId,
        imageable_id: image?.imageable_id,
        imageable_type: image?.imageable_type,
        imageUrl: image?.imageUrl,
        imageCaption: imageCaptionBox.textContent,
      }
      dispatch(editImageCaption(editedCaption));
      console.log("editedCaption", editedCaption)
    }
    handleEditModeClose();
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
      <div className="lightboxTrigger button" onClick={() => setModalOpen(true)}>

      </div>
      <Modal open={modalOpen} onClose={
        (event) => {
          let overlay = document.querySelector(".modalOverlay");
          let closeButton = document.querySelector(".closeButton");
          if (event.target === overlay || event.target === closeButton) {
            setModalOpen(false);
          }
        }
        } lightbox={true}>
        <div className="lightboxBody">
          <div className="lightboxLeft">
            <img src={image?.imageUrl} className="lightboxImage" alt=""/>
          </div>
          <div className="lightboxRight">
            <div>
              <div className="lightboxAvatar">
                <NavLink to={`/users/${user?.id}`}>
                  <img src={user?.avatar} alt={`${user?.fname}'s Avatar'`}/>
                </NavLink>
              </div>
              <NavLink to={`/users/${user?.id}`}>
                {user?.fname} {user?.lname[0]}
              </NavLink>
            </div>
            <div className="lightboxActions">
              <button className="modalButton lightButton button" onClick={handleEditModeOpen}>
                Edit
              </button>
              <button className="modalButton lightButton button" onClick={handleDelete}>
                Delete
              </button>
            </div>
            <div className="lightboxImageCaptionBox">
              {image?.imageCaption}
            </div>
            {editPanel && (<div className="lightboxEditPanel">
              <button onClick={handleEditSubmit} className="redButton modalButton button">Update caption</button>
              <a onClick={handleEditModeClose} className="cancelButton button">Cancel</a>
            </div>)}
          </div>
        </div>

      </Modal>
    </div>
  )
}
export default PhotoTile;
