import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./phototiler.css";
import { NavLink, useHistory } from 'react-router-dom';
import Modal from "../../modal";
import { deleteImage, editImageCaption } from "../../../store/image";
import editIcon from '../../../images/edit_black_24dp.svg';
import deleteIcon from '../../../images/delete_black_24dp.svg';

function PhotoTile({image, user, isBusiness}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ currentImageUser, setCurrentImageUser ] = useState();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ editPanel, setEditPanel ] = useState(false);

  const handleDelete = () => {
    dispatch(deleteImage(image?.id));
    if(isBusiness){
      history.push("/business/photos");
    } else {
      history.push("/user/photos/add");
    }
  }

  const handleEditModeOpen = () => {
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    if( editPanel === false ){
      imageCaptionBox.setAttribute("contentEditable", "true");
      imageCaptionBox.classList.add("active");
      setEditPanel(true);
    }
  }

  const handleEditModeClose = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    if (!image?.userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${image?.userId}`);
      const currentUser = await response.json();
      setCurrentImageUser(currentUser);
    })();
  }, [image?.userId]);

  console.log("user", user)
  console.log("currentImageUser", currentImageUser)

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
        }

        lightbox={true}>
        <div className="lightboxBody">
          <div className="lightboxLeft">
            <img src={image?.imageUrl} className="lightboxImage" alt=""/>
          </div>
          <div className="lightboxRight">
            <div className="lightboxInfo">
              <div className="lightboxAvatar">
                <NavLink to={`/users/${currentImageUser?.id}`}>
                  <img src={currentImageUser?.avatar} alt={`${currentImageUser?.fname}'s Avatar'`}/>
                </NavLink>
              </div>
              <NavLink to={`/users/${currentImageUser?.id}`} className="lightboxUserName">
                {currentImageUser?.fname} {currentImageUser?.lname[0]}.
              </NavLink>
            </div>
            {currentImageUser?.id === user?.id && (
            <div className="lightboxActions">
              <button className="modalButton button" onClick={handleEditModeOpen} style={{backgroundImage: `url(${editIcon})`}}>
                Edit
              </button>
              <button className="modalButton button" onClick={handleDelete} style={{backgroundImage: `url(${deleteIcon})`}}>
                Delete
              </button>
            </div>
            )}
            <div className="lightboxImageCaptionBox">
              {image?.imageCaption}
            </div>
            {editPanel && (<div className="lightboxEditPanel">
              <button onClick={handleEditSubmit} className="redButton modalButton button">Update caption</button>
              <a href="/" onClick={handleEditModeClose} className="cancelButton button">Cancel</a>
            </div>)}
          </div>
        </div>

      </Modal>
    </div>
  )
}
export default PhotoTile;
