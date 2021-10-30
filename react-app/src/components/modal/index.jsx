import { createPortal } from 'react-dom'
import "./modal.css"
import cancelIcon from '../../images/cancel_black_24dp.svg'

const modalStyling = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
}

const overlayStyling = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Modal({ open, onClose, children, lightbox }) {
  if (!open) return null

  return createPortal(
    <>
      {lightbox === true ? (
        <>
          <div className="modalOverlay lightbox" style={overlayStyling} onClick={onClose}>
            <div className="lightboxContainer">
              <button onClick={onClose} className="closeButton modalButton button" style={{backgroundImage: `url(${cancelIcon})`}}>Close</button>
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={overlayStyling} onClick={onClose} />
          <div className="modalContainer" style={modalStyling}>
            {children}
            <button onClick={onClose} className="modalButton lightButton button" style={{backgroundImage: `url(${cancelIcon})`}}>Cancel</button>
          </div>
        </>
      )}
    </>,
    document.getElementById('modalPortal')
  )
}
