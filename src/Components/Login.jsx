import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import './login.css'
import {chatServices} from '../services/chat-services';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate  = useNavigate();
    const handleLogin = async () => {
        const res = await chatServices.login({username: username, password});
        if(res){
            setCookie('currentUser', res);
            if(res.role === 'admin'){
                navigate('/admin');
            } else {
                navigate('/chat');
            }

            setError(null);
        } else {
            setError("Invalid username or password");
        }

    };

    return (
        <Container component="main" className="login-container">
            <div className="form-container">
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <TextField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    className="form-input"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className="form-input"
                />
                <div className="login-error">{error}</div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    className="form-button"
                >
                    Login
                </Button>
            </div>
        </Container>
    );
};

export default Login;
