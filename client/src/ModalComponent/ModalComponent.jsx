import React from 'react';
import './ModalComponent.css';

export default function ModalComponent({ isOpen}) {
  return (
      <div className={`modal ${isOpen ? 'open' : 'close'}`}>
        <div className="text-container">
          <p>Download finished!</p>
          <p>Hoorah!</p>
        </div>
      </div>
    // <div className={`modal-container ${isOpen ? 'open' : 'closed'}`}>
    //   <div className='modal-inner'>
    //     Downloading is finished!  
    //   </div>
    // </div>
  )
}
