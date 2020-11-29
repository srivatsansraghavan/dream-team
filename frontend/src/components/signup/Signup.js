import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import {useHistory} from "react-router-dom"

const Signup = () => {
    let history = useHistory();
    const [username, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const getResponse = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/users/signup', {
            username: username,
            emailAddress: email,
            password: password,
            passwordCheck: passwordCheck,
            reviewer: false
        }).then((res) => {
            console.log(res.data.result);
            if (res.data.status == 'OK') {
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('email', res.data.emailAddress);
                sessionStorage.setItem('reviewer', res.data.reviewer);
                history.push('/home');
            } else {
                history.push('/signup');
            }
        })
    };

    const onChangeHandler = (event) => {
        if (event.target.id === "username") {
            setUser(event.target.value)
        } else if (event.target.id === "email") {
            setEmail(event.target.value)
        } else if (event.target.id === "password") {
            setPassword(event.target.value)
        } else if (event.target.id === "passwordCheck") {
            setPasswordCheck(event.target.value)
        }
    }

    return (
        <div className="signup">
            <h1 className="signup-title">Sign Up</h1>
            <form onSubmit={getResponse} className="signup-form">
                    <label htmlFor="username">Create a username</label>
                    <input id="username" type="text" name="username" placeholder="username" onChange={onChangeHandler}></input>

                    <label htmlFor="email">Enter an email</label>
                    <input id="email" type="email" name="email" placeholder="email" onChange={onChangeHandler}></input>

                    <label htmlFor="password">Create a password</label>
                    <input id="password" type="password" name="password" placeholder="password" onChange={onChangeHandler}></input>

                    <label htmlFor="passwordCheck">Re-enter the password</label>
                    <input id="passwordCheck" type="password" name="passwordCheck" placeholder="passwordCheck" onChange={onChangeHandler}></input>

                    <input type="submit" value="Submit"></input>

                    <a href="/" className="login-page">Already have an account?</a>
            </form>
        </div>
    );
}

export default Signup;