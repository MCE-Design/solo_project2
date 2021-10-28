import { createPortal } from 'react-dom'
import "./modal.css"

const modalStyling = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000
}

const overlayStyling = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1000
}

export default function Modal({ open, onClose, children }) {
  if (!open) return null

  return createPortal(
    <>
      <div style={overlayStyling} onClick={onClose} />
      <div className='modalContainer' style={modalStyling}>
        {children}
        <button onClick={onClose}>Cancel</button>
      </div>
    </>,
    document.getElementById('modalPortal')
  )
}
