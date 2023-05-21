import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = ({ userData }) => {
    const navigate = useNavigate();
    const { setUserId, backend } = userData;
    const [ warning, setWarning ] = useState('');
    const userInputRef = useRef('');
    const passwordInputRef = useRef('');

    const postCredentials = async (signinType) => {
        const userInput = userInputRef.current.value;
        const passwordInput = passwordInputRef.current.value;
        if (!userInput || !passwordInput) setWarning('Please enter a username and password.');
        else {
            const response = await backend.post(`auth/${signinType}`, { 
                user: userInput, 
                password: passwordInput });
            if (response.data.userId) {
                setUserId(response.data.userId);
                sessionStorage.setItem('userId', response.data.userId);
                navigate('/');
            } else setWarning(response.data);
        }
    }

    return (
        <div className='section pt-2'>
            <Link to='/'>← Back</Link>
            <form className='form control mt-4 mb-2'>
                <div className='mb-2'>
                    <input ref={userInputRef} className='input mb-2' placeholder='Username'/>
                    <input ref={passwordInputRef} type='password' className='input' placeholder='Password'/>
                </div>
                <div className='buttons'>
                    <div 
                        className='button is-link'
                        onClick={() => postCredentials('login')}>
                        Login</div>
                    <div 
                        className='button'
                        onClick={() => postCredentials('signup')}>
                        Sign Up</div>
                </div>
            </form>
            <p className='has-text-danger'>{warning}</p>
        </div>
    );
}