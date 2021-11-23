import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./phototiler.css";
import { NavLink, useHistory } from 'react-router-dom';
import Modal from "../../modal";
import { deleteImage, deleteBusinessImage, editImageCaption, editBusinessAndReviewImageCaption } from "../../../store/image";
import editIcon from '../../../images/edit_black_24dp.svg';
import deleteIcon from '../../../images/delete_black_24dp.svg';

function PhotoTile({image, user, isBusiness, businessId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ currentImageUser, setCurrentImageUser ] = useState();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ editPanel, setEditPanel ] = useState(false);

  const handleDelete = () => {
    if(isBusiness){
      console.log("DELETE BUSINESS PHOTO ID", businessId)
      dispatch(deleteBusinessImage(image?.id, businessId));
      history.push(`/business_photos/${businessId}`);
    } else {
      dispatch(deleteImage(image?.id));
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
    if(e){
      e.preventDefault();
    }
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    imageCaptionBox.setAttribute("contentEditable", "false");
    imageCaptionBox.classList.remove("active");
    setEditPanel(false);
    imageCaptionBox.textContent = image?.imageCaption;
  }

  const handleEditSubmit = () => {
    const imageCaptionBox = document.querySelector(".lightboxImageCaptionBox");
    if ( imageCaptionBox.textContent !== image?.imageCaption || imageCaptionBox.textContent === "") {
      console.log("SUBMITTABLE");
      console.log("EDIT CAPTION CONTENT", imageCaptionBox.textContent === "")
      if(imageCaptionBox.textContent === "") {

      }
      if(isBusiness){
        const editedCaption = {
          id: image?.id,
          userId: image?.userId,
          imageable_id: image?.imageable_id,
          imageable_type: image?.imageable_type,
          imageUrl: image?.imageUrl,
          imageCaption: imageCaptionBox.textContent,
          businessId: businessId,
        }
        dispatch(editBusinessAndReviewImageCaption(editedCaption));
        console.log("editedCaption", editedCaption);
      } else {
        const editedCaption = {
          id: image?.id,
          userId: image?.userId,
          imageable_id: image?.imageable_id,
          imageable_type: image?.imageable_type,
          imageUrl: image?.imageUrl,
          imageCaption: imageCaptionBox.textContent,
        }
        dispatch(editImageCaption(editedCaption));
        console.log("editedCaption", editedCaption);
      }
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
          let closeButtonIcon = document.querySelector(".closeButton .buttonIcon");
          if (event.target === overlay || event.target === closeButton || event.target === closeButtonIcon) {
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
              <button className="lightboxActionButton button" onClick={handleEditModeOpen}>
                <div className="lighboxButtonIcon" style={{backgroundImage: `url(${editIcon})`}}></div><div className="lightboxButtonText">Edit photo caption</div>
              </button>
              <button className="lightboxActionButton button" onClick={handleDelete}>
                <div className="lighboxButtonIcon" style={{backgroundImage: `url(${deleteIcon})`}}></div><div className="lightboxButtonText">Delete photo</div>
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
