import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const RegisterPage = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function registerUser(ev)
    {
        ev.preventDefault();
        try {
            await axios.post('/register',{
                name,
                email,
                password,
            });
             alert("Registration Successful. Now you can log in")
        }
        catch(e)
        {
            alert("Registration Failed.Please try again later");
            console.log(e.message);
        }
    }
    return (
        <div className='flex items-center justify-center h-screen bg-gray-200'>
        <div className='mt-4 flex items-center bg-white p-8 rounded-lg shadow-md' style={{ width: '320px' }}>
            <div className='mb-4'>
                <h1 className='text-3xl text-center'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type='text' 
                            placeholder='John Doe' 
                            value={name} 
                            onChange = {ev => setName(ev.target.value)}/>
                    <input type='email' 
                            placeholder='your@gmail.com' 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)}/>
                    <input type='password' 
                            placeholder='password' 
                            value={password} 
                            onChange={ev => setPassword(ev.target.value)}/>
                    <button className='primary w-full'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link className='underline text-black' to='/login'>Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    
    )
}

export default RegisterPage