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
                    <button className='detect ba w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} style={{marginLeft:'10px'}}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;