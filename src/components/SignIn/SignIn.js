import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const SignIn = ({onRouteChange,loadUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Sign in failed');
            }
            return response.json();
        }).then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            }
        });
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw5 shadow-5 center" style={{width:'50%',maxWidth:'300px'}}> 
            <main className="pa4 black-80" style={{color:'white'}}>
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 mb3 lora">FaceDex</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmitSignIn} className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
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