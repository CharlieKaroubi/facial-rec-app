import React from 'react';

const Rank = ({user}) => {
    const { fname, entries } = user;
    return (
        <div>
            <div className='white f1'>
                {`Hey, ${fname}! ${entries}`}
            </div>
        </div>
    );
}

export default Rank;