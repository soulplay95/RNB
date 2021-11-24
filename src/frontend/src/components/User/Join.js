import React, { useState } from 'react'
import './Join.css'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
// import Swiper core and required modules
import SwiperCore, { Navigation, EffectCoverflow, Pagination } from 'swiper'
SwiperCore.use([Navigation, EffectCoverflow, Pagination])

const Join = () => {
    const [swiper, setSwiper] = useState(null)
    const [emailInput, setEmailInput] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [nickNameInput, setNickNameInput] = useState('')
    const [nickNameValid, setNickNameValid] = useState(false)
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordValidInput, setPasswordValidInput] = useState('')
    const [validCode, setValidCode] = useState('')
    const [validCodeValid, setValidCodeValid] = useState(false)
    const [profileNum, setProfileNum] = useState(0);

    const hasError = () =>
        emailInput.includes('@') ? false : true

    const hasErrorNickName = () =>
        nickNameInput.length<2 || nickNameInput.length>8 ? true : false

    const hasErrorPassword = () =>
        passwordInput.length<8 ? true : false
    
    const hasErrorValidPassword = () =>
        passwordInput != passwordValidInput ? true : false

    const onEmailHandler = (event) => {
        setEmailInput(event.currentTarget.value)
    }

    const onNickNameHandler = (event) => {
        setNickNameInput(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPasswordInput(event.currentTarget.value)
    }

    const onPasswordValidHandler = (event) => {
        setPasswordValidInput(event.currentTarget.value)
    }

    const onValidCodeHandler = (event) => {
        setValidCode(event.currentTarget.value)
    }

    const emailValidReq = async () => {
        axios
            .get(
                '/user/idcheck?email=' +
                    emailInput,
                {}
            )
            .then(function (response) {
                console.log(response)
                if(response.data.statusCode === 200){
                    alert('사용가능한 이메일 입니다')
                setEmailValid(true)
                }
                else{
                   alert('중복된 이메일 입니다.')
                setEmailValid(false) 
                }
            })
            .catch(function (error) {
                alert('중복된이메일입니다')
                setEmailValid(false)
            })
            .then(function () {
                // 항상 실행
            })
    }

    const nickNameValidReq = async () => {
            axios
            .get(
                '/user/namecheck?nickname=' +
                    nickNameInput,
                {}
            )
            .then(function (response) {
                alert('사용가능한 닉네임 입니다')
                setNickNameValid(true)
            })
            .catch(function (error) {
                alert('중복된 닉네임 입니다')
                setNickNameValid(false)
            })
            .then(function () {
                // 항상 실행
            })
    }

    const resendCode = async () => {
            axios
            .get(
                '/user/resend?email=' +
                    emailInput,
                {}
            )
            .then(function (response) {
            })
            .catch(function (error) {
            })
            .then(function () {
                alert("인증코드를 재전송 했습니다.")
            })
    }

    const validCodeValidReq = async () => {
            axios
            .post(
                '/user/checkcode', {
                    email:emailInput,
                    token:validCode
                }
                
            )
            .then(function (response) {
                if(response.data.statusCode===200){
                    alert('인증이 완료되었습니다.')
                setValidCodeValid(true)
                }
                else{
                    alert('인증코드를 확인해주세요.')
                setValidCodeValid(false)
                }
            })
            .catch(function (error) {
            })
            .then(function () {
            })
    }



    const moveSecondPage = () => {
        axios
            .post(
                '/user/temp',
                {email:emailInput}
            )
            .then(function (response) {
            })
            .catch(function (error) {
            })
            .then(function () {
                swiper.slideTo(1)
            })
    }

    const moveThirdPage = () => {
        swiper.slideTo(2)
    }

    const cha = ['https://ifh.cc/g/8InGOH.png', 'https://ifh.cc/g/cE7q0C.png',  'https://ifh.cc/g/M4teqf.png', 'https://ifh.cc/g/g4CEBX.png', 'https://ifh.cc/g/8YIXU2.png']

    const moveLastPage = () =>{
        axios
            .post(
                '/user/signin',
                {
                email: emailInput,
                password: passwordInput,
                nickname: nickNameInput,
                profile_img: cha[profileNum],
                }
            )
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
            })
            .then(function () {
                swiper.slideTo(3)
            })
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
                <Swiper
                    className="mySwiper"
                    onSwiper={setSwiper}
                    allowTouchMove={false}
                    style={{ float: 'left', width: '34%', height: '100vh' }}
                >
                    <SwiperSlide
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div
                            className="loginContent"
                            style={{ width: '50%', marginTop: '100px' }}
                        >
                            <Link to="/recmain">
                                <img
                                    src="img/logo_theme.png"
                                    style={{
                                        width: '100%',
                                    }}
                                ></img>
                            </Link>
                            <br></br>
                            <TextField
                                label="이메일 아이디"
                                id="standard-size-normal"
                                variant="standard"
                                helperText={
                                    hasError('emailInput')
                                        ? '올바른 형식으로 입력해주세요'
                                        : ''
                                }
                                value={emailInput}
                                onChange={onEmailHandler}
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    marginBottom: '20px',
                                    marginTop: '100px',
                                }}
                                margin="normal"
                                error={hasError('emailInput')}
                                inputProps={{
                                    style: {
                                        fontFamily: 'NotoSansKR-Light',
                                        fontSize: '14px',
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
                                onClick={emailValidReq}
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%', marginBottom: '100px' }}
                            >
                                이메일 중복 확인
                            </Button>
                            <Button
                                className="joinButton2"
                                href="/login"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'left',
                                }}
                            >
                                ←&nbsp;처음으로
                            </Button>
                            {emailValid ? (<Button
                                onClick={moveSecondPage}
                                className="joinButton2"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                다음&nbsp;→
                            </Button>) : (<Button
                                className="joinButtonUnValid"
                                disabled
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                다음&nbsp;→
                            </Button>)}
                        </div>
                    </SwiperSlide>


                    <SwiperSlide
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div
                            className="loginContent"
                            style={{ width: '50%', marginTop: '100px' }}
                        >
                            <Link to="/recmain">
                                <img
                                    src="img/logo_theme.png"
                                    style={{
                                        width: '100%',
                                    }}
                                ></img>
                            </Link>
                            <br></br>
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'12px', marginTop:'30px'}}>입력한 메일 주소로 발송된 인증코드를 입력해주세요</div>
                            <TextField
                                label="인증코드"
                                id="standard-size-normal"
                                variant="standard"
                                value={validCode}
                                onChange={onValidCodeHandler}
                                style={{
                                    width: '100%',
                                    height: '60px',
                                    marginBottom: '20px',
                                    marginTop: '50px',
                                }}
                                margin="normal"
                                inputProps={{
                                    style: {
                                        fontFamily: 'NotoSansKR-Light',
                                        fontSize: '14px',
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
                            {validCodeValid ? (<Button
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%'}}
                            >
                                인증코드 확인완료
                            </Button>) : (<Button
                                onClick={validCodeValidReq}
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%'}}
                            >
                                인증코드 확인
                            </Button>)}
                    
                            <div style={{width:'100%', height:'30px', marginTop:'10px', marginBottom:'50px'}}>
                            <a onClick={resendCode} style={{fontFamily:'NotoSansKR-Light', fontSize:'12px', color:'#B2B2B2', cursor:'pointer'}}>인증코드 재전송</a>
                            </div>
                            <Button
                                className="joinButton2"
                                href="/login"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'left',
                                }}
                            >
                                ←&nbsp;처음으로
                            </Button>
                            {validCodeValid ? (<Button
                                onClick={moveThirdPage}
                                className="joinButton2"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                다음&nbsp;→
                            </Button>) : (<Button
                                className="joinButtonUnValid"
                                disabled
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                다음&nbsp;→
                            </Button>)}
                        </div>
                    </SwiperSlide>

                    



                    <SwiperSlide
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div
                            className="loginContent"
                            style={{ width: '50%', marginTop: '100px' }}
                        >
                            <Swiper
                                pagination
                                navigation
                                onSlideChange={(index) => setProfileNum(index.snapIndex)}
                                style={{width:'100%', height:'140px'}}>
                                    <SwiperSlide style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                        <img src="img/charac1.png"
                                        style={{width:'100px', height:'100px', borderRadius:'100px'}}/>
                                    </SwiperSlide>

                                    <SwiperSlide style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                        <img src="img/charac2.png"
                                        style={{width:'100px', height:'100px', borderRadius:'100px'}}/>
                                    </SwiperSlide>

                                    <SwiperSlide style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                        <img src="img/charac3.png"
                                        style={{width:'100px', height:'100px', borderRadius:'100px'}}/>
                                    </SwiperSlide>

                                    <SwiperSlide style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                        <img src="img/charac4.png"
                                        style={{width:'100px', height:'100px', borderRadius:'100px'}}/>
                                    </SwiperSlide>

                                    <SwiperSlide style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                        <img src="img/charac5.png"
                                        style={{width:'100px', height:'100px', borderRadius:'100px'}}/>
                                    </SwiperSlide>
                            </Swiper>
                            {nickNameValid ? (<TextField
                                disabled
                                label="닉네임"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                placeholder="2글자 이상, 8글자 이내의 닉네임"
                                helperText={
                                    hasErrorNickName('nickNameInput')
                                        ? '올바른 형식으로 입력해주세요'
                                        : ''
                                }
                                value={nickNameInput}
                                onChange={onNickNameHandler}
                                style={{
                                    width: '100%',
                                    height:'80px',
                                    marginBottom: '10px',
                                    marginTop: '10px',
                                }}
                                margin="dense"
                                error={hasErrorNickName('emailInput')}
                                inputProps={{
                                    style: {
                                        fontFamily: 'NotoSansKR-Light',
                                        fontSize: '14px',
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontFamily: 'NotoSansKR-Regular',
                                        fontSize: '20px',
                                    },
                                }}
                            />) : (<TextField
                                label="닉네임"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                placeholder="2글자 이상, 8글자 이내의 닉네임"
                                helperText={
                                    hasErrorNickName('nickNameInput')
                                        ? '올바른 형식으로 입력해주세요'
                                        : ''
                                }
                                value={nickNameInput}
                                onChange={onNickNameHandler}
                                style={{
                                    width: '100%',
                                    height:'80px',
                                    marginBottom: '10px',
                                    marginTop: '10px',
                                }}
                                margin="dense"
                                error={hasErrorNickName('emailInput')}
                                inputProps={{
                                    style: {
                                        fontFamily: 'NotoSansKR-Light',
                                        fontSize: '14px',
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontFamily: 'NotoSansKR-Regular',
                                        fontSize: '20px',
                                    },
                                }}
                            />)}
                            <div style={{width:'100%', height:'60px'}}>
                            {nickNameValid ? (<div style={{color : '#00DA30', fontFamily:'NotoSansKR-Light', fontSize:'14px'}}>사용 가능한 닉네임 입니다</div>) : hasErrorNickName(nickNameInput) ? (<Button
                                disabled
                                className="joinButtonUnValid"
                                size="large"
                                variant="contained"
                                style={{ width: '100%', marginBottom: '10px'}}
                            >
                                닉네임 중복 확인
                            </Button>) : (<Button
                                onClick={nickNameValidReq}
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%', marginBottom: '10px'}}
                            >
                                닉네임 중복 확인
                            </Button>) }
                            </div>
                            
                            <TextField
                                label="비밀번호"
                                placeholder="8자이상의 비밀번호 입력"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                value = {passwordInput} 
                                onChange={onPasswordHandler}
                                type="password"
                                style={{width:'100%', marginBottom:'0px'}}
                                margin="normal"
                                inputProps={{style:{fontFamily:'NotoSansKR-Light', fontSize: '14px'},}} 
                                InputLabelProps={{
                                shrink: true,
                                style:{fontFamily:'NotoSansKR-Regular', fontSize: '20px'},
                                }}
                                error={hasErrorPassword('passwordInput')}
                                helperText={
                                    hasErrorPassword('passwordInput')
                                        ? '8자 이상의 비밀번호를 입력해주세요'
                                        : ''
                                }
                            />

                            <TextField
                                label="비밀번호 확인"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                value = {passwordValidInput} 
                                onChange={onPasswordValidHandler}
                                type="password"
                                style={{width:'100%', marginBottom:'0px'}}
                                margin="normal"
                                inputProps={{style:{fontFamily:'NotoSansKR-Light', fontSize: '14px'},}} 
                                InputLabelProps={{
                                shrink: true,
                                style:{fontFamily:'NotoSansKR-Regular', fontSize: '20px'},
                                }}
                                error={hasErrorValidPassword('passwordValidInput')}
                                helperText={
                                    hasErrorValidPassword('passwordValidInput')
                                        ? '비밀번호가 일치하지 않습니다'
                                        : ''
                                }
                            />
                            
                            <div style={{marginTop:'100px'}}>
                            <Button
                                className="joinButton2"
                                href="/login"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'left',
                                }}
                            >
                                ←&nbsp;처음으로
                            </Button>
                            {nickNameValid && !hasErrorValidPassword() ? (<Button
                                onClick={moveLastPage}
                                className="joinButton2"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                가입완료&nbsp;→
                            </Button>) : (<Button
                                className="joinButtonUnValid"
                                disabled
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                가입완료&nbsp;→
                            </Button>)}
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            className="loginContent"
                            style={{ width:'100%', marginTop: '100px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <CheckCircleOutlineIcon style={{width:'100px', height:'100px', color:'#6FB1FF'}}></CheckCircleOutlineIcon>
                        </div>
                        <div
                            style={{ width:'100%', marginTop: '50px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <a style={{fontFamily:'NotoSansKR-Regular', fontSize:'28px'}}>회원 가입이 <a style={{fontFamily:'NotoSansKR-Bold'}}>완료</a>되었습니다</a>
                        </div>
                        <div
                            style={{ width:'100%', marginTop: '50px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'18px', color:'#7B7B7B'}}>{nickNameInput}님의 회원가입을 축하합니다.</div>
                        </div>
                        <div
                            style={{ width:'100%', marginTop: '10px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'18px', color:'#7B7B7B'}}>로그인 후 편리하게 RNB의 모든 서비스를 이용하실 수 있습니다.</div>
                        </div>
                        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: '80px'}}>
                        <div
                            style={{ width:'70%', }}
                        >
                           <Button
                           className="joinButton2"
                                href="/login"
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'left',
                                }}
                            >
                                로그인
                            </Button>

                            <Button
                            className="joinButtonUnValid"
                            href="/recmain"
                                onClick={moveSecondPage}
                                size="large"
                                variant="contained"
                                style={{
                                    width: '45%',
                                    float: 'right',
                                }}
                            >
                                홈으로
                            </Button> 
                        </div>
                        </div>
                        
                    </SwiperSlide>
                </Swiper>
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

export default Join
