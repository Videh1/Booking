import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser, setToken, setReady } = useContext(UserContext);
    // const setUser = ()=>{};
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data.userDoc)
            setToken(data.token)
            setReady(true)
            alert('Login Successful')
            setRedirect(true);
        }
        catch (e) {
            console.log(e.message);
            alert('Login Failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='bg-gray-200 min-h-screen flex items-center justify-center'>
        <div className='max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg'>
            <h1 className='text-3xl text-center mb-4'>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700'>Email:</label>
                    <input type='email' id='email' value={email} onChange={ev => setEmail(ev.target.value)} className='form-input mt-1 block w-full rounded-lg border-gray-300 focus:border-pink-500' placeholder='your@gmail.com' required />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block text-gray-700'>Password:</label>
                    <input type='password' id='password' value={password} onChange={ev => setPassword(ev.target.value)} className='form-input mt-1 block w-full rounded-lg border-gray-300 focus:border-pink-500' placeholder='Password' required />
                </div>
                <button type='submit' className='w-full bg-primary hover:bg-[#d93151] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
            </form>
            <p className='text-center mt-4 text-gray-500'>Don't have an account? <Link to='/register' className='underline'>Register now</Link></p>
        </div>
    </div>
    )
}

export default LoginPage

