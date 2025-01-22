import React from 'react';

const Navigation = ({onRouteChange}) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <input onClick={()=>onRouteChange('signin')} className="b ma2 white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Sign Out" />
        </nav>
    );
}

export default Navigation;