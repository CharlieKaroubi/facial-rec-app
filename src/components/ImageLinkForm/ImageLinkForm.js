import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className = 'f4'>
            <p className='f3' style={{color:'white'}}>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className = 'form center pa4 br3 shadow-5'>
                    <input className='ba f4 fr pa2 w-70 center' type='tex' placeholder='Enter Image URL' onChange={onInputChange}/>
                    <button className='className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"' onClick={onButtonSubmit} style={{marginLeft:'-40px'}}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;