import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const SignIn = ({onRouteChange}) => {
    return (
        <article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw5 shadow-5 center" style={{width:'50%',maxWidth:'300px'}}> 
            <main className="pa4 black-80" style={{color:'white'}}>
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 mb3 lora">FaceDex</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={()=>onRouteChange('home')} className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('signup')} className="b ma2 white ph3 pv2  b--white bg-transparent grow pointer f6 ">Sign Up</p>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default SignIn;