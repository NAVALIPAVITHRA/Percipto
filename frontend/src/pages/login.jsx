import React, { useState } from 'react';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
                <div>
                    <p>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                    <p>Please {state === 'Sign Up' ? "Sign up" : "Log in"} to book appointment</p>
                </div>
            </form>
        </div>
    );
};

export default Login;
