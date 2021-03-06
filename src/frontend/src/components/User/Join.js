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
                    alert('??????????????? ????????? ?????????')
                setEmailValid(true)
                }
                else{
                   alert('????????? ????????? ?????????.')
                setEmailValid(false) 
                }
            })
            .catch(function (error) {
                alert('???????????????????????????')
                setEmailValid(false)
            })
            .then(function () {
                // ?????? ??????
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
                alert('??????????????? ????????? ?????????')
                setNickNameValid(true)
            })
            .catch(function (error) {
                alert('????????? ????????? ?????????')
                setNickNameValid(false)
            })
            .then(function () {
                // ?????? ??????
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
                alert("??????????????? ????????? ????????????.")
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
                    alert('????????? ?????????????????????.')
                setValidCodeValid(true)
                }
                else{
                    alert('??????????????? ??????????????????.')
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
                                label="????????? ?????????"
                                id="standard-size-normal"
                                variant="standard"
                                helperText={
                                    hasError('emailInput')
                                        ? '????????? ???????????? ??????????????????'
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
                                ????????? ?????? ??????
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
                                ???&nbsp;????????????
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
                                ??????&nbsp;???
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
                                ??????&nbsp;???
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
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'12px', marginTop:'30px'}}>????????? ?????? ????????? ????????? ??????????????? ??????????????????</div>
                            <TextField
                                label="????????????"
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
                                ???????????? ????????????
                            </Button>) : (<Button
                                onClick={validCodeValidReq}
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%'}}
                            >
                                ???????????? ??????
                            </Button>)}
                    
                            <div style={{width:'100%', height:'30px', marginTop:'10px', marginBottom:'50px'}}>
                            <a onClick={resendCode} style={{fontFamily:'NotoSansKR-Light', fontSize:'12px', color:'#B2B2B2', cursor:'pointer'}}>???????????? ?????????</a>
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
                                ???&nbsp;????????????
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
                                ??????&nbsp;???
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
                                ??????&nbsp;???
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
                                label="?????????"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                placeholder="2?????? ??????, 8?????? ????????? ?????????"
                                helperText={
                                    hasErrorNickName('nickNameInput')
                                        ? '????????? ???????????? ??????????????????'
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
                                label="?????????"
                                size="small"
                                id="standard-size-normal"
                                variant="standard"
                                placeholder="2?????? ??????, 8?????? ????????? ?????????"
                                helperText={
                                    hasErrorNickName('nickNameInput')
                                        ? '????????? ???????????? ??????????????????'
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
                            {nickNameValid ? (<div style={{color : '#00DA30', fontFamily:'NotoSansKR-Light', fontSize:'14px'}}>?????? ????????? ????????? ?????????</div>) : hasErrorNickName(nickNameInput) ? (<Button
                                disabled
                                className="joinButtonUnValid"
                                size="large"
                                variant="contained"
                                style={{ width: '100%', marginBottom: '10px'}}
                            >
                                ????????? ?????? ??????
                            </Button>) : (<Button
                                onClick={nickNameValidReq}
                                className="loginButton"
                                size="large"
                                variant="contained"
                                style={{ width: '100%', marginBottom: '10px'}}
                            >
                                ????????? ?????? ??????
                            </Button>) }
                            </div>
                            
                            <TextField
                                label="????????????"
                                placeholder="8???????????? ???????????? ??????"
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
                                        ? '8??? ????????? ??????????????? ??????????????????'
                                        : ''
                                }
                            />

                            <TextField
                                label="???????????? ??????"
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
                                        ? '??????????????? ???????????? ????????????'
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
                                ???&nbsp;????????????
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
                                ????????????&nbsp;???
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
                                ????????????&nbsp;???
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
                            <a style={{fontFamily:'NotoSansKR-Regular', fontSize:'28px'}}>?????? ????????? <a style={{fontFamily:'NotoSansKR-Bold'}}>??????</a>???????????????</a>
                        </div>
                        <div
                            style={{ width:'100%', marginTop: '50px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'18px', color:'#7B7B7B'}}>{nickNameInput}?????? ??????????????? ???????????????.</div>
                        </div>
                        <div
                            style={{ width:'100%', marginTop: '10px' ,display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{fontFamily:'NotoSansKR-Regular', fontSize:'18px', color:'#7B7B7B'}}>????????? ??? ???????????? RNB??? ?????? ???????????? ???????????? ??? ????????????.</div>
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
                                ?????????
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
                                ?????????
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
