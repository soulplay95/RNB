import React, { useState } from 'react'
import './Login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const loginHandler = () => {
        try {
            let data = { email: Email, password: Password }
            axios
                .post(
                    '/user/login',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': `application/json`,
                        },
                    }
                )
                .then((res) => {
                    localStorage.setItem('USER_NICKNAME', res.data.nickname);
                    localStorage.setItem('USER_PROFILE', res.data.profile_img);
                    localStorage.setItem('USER_UUID', res.data.userid);
                    localStorage.setItem('LOGIN_AUTH', true);
                    localStorage.setItem('JWT_TOKEN', 'Bearer ' + res.headers["authorization"].substring(7));
                    props.history.push('/recmain')
                })
                .catch((ex) => {
                    alert("아이디와 비밀번호를 확인해주세요")
                    console.log('login requset fail : ' + ex)
                })
                .finally(() => {
                    console.log('login request end')
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main>
            <div
                container
                spacing={0}
                style={{ height: '100vh', width: '100vw' }}
            >
                <div
                    style={{
                        backgroundColor: '#6FB1FF',
                        float: 'left',
                        width: '33%',
                        height: '100vh',
                    }}
                ></div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        float: 'left',
                        width: '34%',
                        height: '100vh',
                    }}
                >
                    <div className="loginContent" style={{ width: '50%' }}>
                        <Link to="/recmain">
                            <img
                                src="img/logo_theme.png"
                                style={{
                                    width: '100%',
                                    marginTop: '75px',
                                    marginBottom: '40px',
                                }}
                            ></img>
                        </Link>
                        <br></br>
                        <TextField
                            label="이메일 아이디"
                            id="standard-size-normal"
                            variant="standard"
                            value={Email}
                            onChange={onEmailHandler}
                            style={{ width: '100%', marginBottom: '20px' }}
                            margin="normal"
                            inputProps={{
                                style: {
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '20px',
                                },
                            }}
                        />
                        <TextField
                            label="비밀번호"
                            id="standard-size-normal"
                            variant="standard"
                            value={Password}
                            onChange={onPasswordHandler}
                            type="password"
                            style={{ width: '100%', marginBottom: '60px' }}
                            margin="normal"
                            inputProps={{
                                style: {
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '20px',
                                },
                            }}
                        />
                        <Button
                            onClick={loginHandler}
                            className="loginButton"
                            size="large"
                            variant="contained"
                            style={{ width: '100%', marginBottom: '10px' }}
                        >
                            로그인
                        </Button>
                        <Button
                            className="joinButton"
                            href="/join"
                            size="large"
                            variant="contained"
                            style={{
                                width: '100%',
                                float: 'left',
                                backgroundColor: '#3F51B5',
                            }}
                        >
                            회원가입
                        </Button>
                        
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: '#6FB1FF',
                        float: 'left',
                        width: '33%',
                        height: '100vh',
                    }}
                ></div>
            </div>
        </main>
    )
}

export default Login
