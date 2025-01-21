import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, boxes}) => {
    const handleImageLoad = () => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(`Image loaded with dimensions: ${width}x${height}`);
    };

    return (
        <div className='center ma'>
            <div className = 'absolute mt2'>
                <img id='inputimage' alt='' src={imageURL} width='500px' height='auto' onLoad={handleImageLoad}/>
                {boxes.map((box, index) => {
                    return <div key={index} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                })}
            </div>
        </div>
    );
}

export default FaceRecognition;