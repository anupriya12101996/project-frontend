import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else {
            setCheck(e.target.checked);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (check) {
            axios.post('http://localhost:5000/user/login', {
                email: email,
                password: password
            }).then(res => {
                if (res.data.data) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Login Success',
                        icon: 'success',
                    });
                    setEmail("");
                    setPassword("");
                }
                else {
                    Swal.fire({
                        title: 'Failed',
                        text: 'Login Failed',
                        icon: 'info',
                    });
                }
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Failed',
                    text: 'Something went wrong..!!',
                    icon: 'error',
                });
            });
        }
        else {
            Swal.fire({
                title: 'Info',
                text: 'Please accept Terms and Conditions..!!',
                icon: 'info',
            });
        }
    }

    return (
        <div className='holder'>
            <div className='overlay'>
                <div className='card'>
                    <h1>SignIn Now</h1>
                    <input className='input-holder' type="email" name='email' value={email} onChange={(e) => handleChange(e)} placeholder="Email" />
                    <input className='input-holder' type="password" name='password' value={password} onChange={(e) => handleChange(e)} placeholder="Password" />
                    <div className='check-holder'>
                        <input type="checkbox" onChange={(e) => handleChange(e)} />
                        <p>I agree to the Term of Services</p>
                    </div>
                    <button onClick={handleSubmit}>Sign In</button>
                    <p className='already-user'>Don't have an account? <span><Link className='redirect' to="/">Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Login;