import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './SignUp.css';

const SignUp = ({onRouteChange,loadUser}) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFnameChange = (event) => {
        setFname(event.target.value);
    }

    const onLnameChange = (event) => {
        setLname(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignUp = () => {
        fetch('http://localhost:3000/signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Sign up failed');
            }
            return response.json();
        })
        .then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    return (
        <article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw5 shadow-5 center" style={{ width: '50%', maxWidth: '400px' }}> 
            <main className="pa4 black-80" style={{color:'white'}}>
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 mb3 lora">FaceDex</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                            <input onChange={onFnameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="fname" id="fname" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
                            <input onChange={onLnameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="lname" id="lname" />
                        </div>
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
                        <input onClick={onSubmitSignUp} className="b su white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Sign Up" />
                    </div>
                    <div className="mt3">
                        <p onClick={()=>onRouteChange('signin')} className="b ma2 white ph3 pv2  b--white bg-transparent grow pointer f6 " type="submit">Back</p>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default SignUp;