import { useState } from "react";

export const SignIn = ({ userData }) => {
    const { userId, setUserId, backend } = userData;
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const postCredentials = async (signinType) => {
        const response = signinType === 'login' 
            ? await backend.post('auth/login', { 
                user: userInput, 
                password: passwordInput 
        }) : await backend.post('auth/signup', { 
                user: userInput, 
                password: passwordInput 
        })
        if (response.status === 200) {
            setUserId(response.data.userId);
        }
    }

    return userId
        ? <button className='button is-warning' onClick={() => setUserId('')}>Logout</button>
        : (
        <>
            <form className='form control' onSubmit={e => {
                e.preventDefault();
                postCredentials();
                }}>
                <div className='mb-2'>
                    <input id='user' className='input is-inline mr-3' placeholder='Username' 
                        onChange={e => setUserInput(e.target.value)}/>
                    <input id='password' type='password' className='input is-inline' placeholder='Password' 
                        onChange={e => setPasswordInput(e.target.value)}/>
                </div>
                <div className='buttons'>
                    <div 
                        className='button'
                        onClick={() => postCredentials('login')}>
                        Login</div>
                    <div 
                        className='button'
                        onClick={() => postCredentials('signup')}>
                        Sign Up</div>
                </div>
            </form>
        </>
    );
}