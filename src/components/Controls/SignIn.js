import { useState } from "react";

export const SignIn = ({ userData }) => {
    const { userId, setUserId, backend } = userData;
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [signinType, setSigninType] = useState('login');
    const postCredentials = async () => {
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
            <button className='button is-danger mb-3' onClick={() => setUserId('642da0fb02e85e64261c13c6')}>Quick Sign In (Developer Mode)</button>
            <form className='form control' onSubmit={e => {
                e.preventDefault();
                postCredentials();
                }}>
                <input id='user' className='input is-inline mr-3' placeholder='Username' 
                    onChange={e => setUserInput(e.target.value)}/>
                <input id='password' type='password' className='input is-inline mr-3' placeholder='Password' 
                    onChange={e => setPasswordInput(e.target.value)}/>
                <div className='buttons is-inline has-addons mr-3'>
                    <button 
                        className={'button ' + (signinType === 'login' && 'is-primary')}
                        onClick={() => setSigninType('login')}>
                        Login</button>
                    <button 
                        className={'button ' + (signinType === 'signup' && 'is-primary')}
                        onClick={() => setSigninType('signup')}>
                        Sign Up</button>
                </div>
                <button type='submit is-inline' className='button'>Submit</button>
            </form>
        </>
    );
}