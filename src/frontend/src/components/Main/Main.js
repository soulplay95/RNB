import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'

import "../User/Login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Main.css';

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
// import Swiper core and required modules
import SwiperCore, { Mousewheel } from 'swiper'
SwiperCore.use([Mousewheel])

const Main = (props) =>{

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
                    console.log('res.data.accessToken : ' + res.data)
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

    useEffect(() => {
      if(localStorage.getItem('LOGIN_AUTH')){
        props.history.push('/recmain')
      }
    },)

    return (
        <div style={{width:'100vw', height:'100vh'}}>
            <img src = 'img/logo_theme.png' style={{zIndex:'300', width:'180px', position:'absolute', top:'25px', left:'25px'}}></img>
            <Swiper direction={'vertical'} 
            className="mySwiper"
            mousewheel={true}
            allowTouchMove={false}
            speed={600}
            style={{height:'100vh', width:'100vw', float:'left'}}>
            <SwiperSlide>
                <img src="https://media2.giphy.com/media/ll08VYpfuX1rlW2bz3/giphy.gif?cid=ecf05e47m5663ouzvzlz78pkt28j49onzyugylrg8rcn0n0y&rid=giphy.gif&ct=g" style={{width:'100%', height:'100%'}}/>
                <div style={{width:'100%', height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)', position:'absolute', left:'0px', top:'0px', paddingLeft:'50px'}}>
                    <h1 style={{fontFamily:'NotoSansKR-Regular', color:'white', fontSize:'44px', marginTop:'200px'}}>이건 어떻게 하는거지?</h1>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px', marginTop:'30px'}}>세상엔 어려운 보드게임이 정말 많습니다.</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}> 재미있어 보이지만 손이 쉽게 가지 않는경우도 많고요,</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}> 그렇다면 R&B에서 손쉽게 검색하고 게임 룰을 영상으로 확인해보세요.</div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <img src="https://media1.giphy.com/media/McOrYvuFJDOZqLjWcB/giphy.gif?cid=ecf05e47gcy2o5oxx2o4a6a2uld2tlo0qpectlg10uv78rkk&rid=giphy.gif&ct=g" style={{width:'100%', height:'100%'}}/>
                <div style={{width:'100%', height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)', position:'absolute', left:'0px', top:'0px', paddingLeft:'50px'}}>

                    <h1 style={{fontFamily:'NotoSansKR-Regular', color:'white', fontSize:'44px', marginTop:'200px'}}>새로운 보드게임을 찾고있는 당신에게 </h1>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px', marginTop:'30px'}}>매번 같은 게임에 질리셨나요? R&B에서 맞춤형 게임을 추천받아보세요</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}>사용자의 보유 목록, 찜 목록을 토대로 </div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}>당신에게 꼭 맞는 보드게임을 추천해드립니다</div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <img src="https://media0.giphy.com/media/XF4jlOj2FS8M94f71X/giphy.gif?cid=ecf05e477wfecf4l9b30886yiurg2czbgxdxn7q1sloflomb&rid=giphy.gif&ct=g" style={{width:'100%', height:'100%'}}/>
                <div style={{width:'100%', height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)', position:'absolute', left:'0px', top:'0px', paddingLeft:'50px'}}>
                    <h1 style={{fontFamily:'NotoSansKR-Regular', color:'white', fontSize:'44px', marginTop:'200px'}}>보드게임 누구랑 하지?</h1>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px', marginTop:'30px'}}>같이 할 플레이어가 필요하시다면</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}>R&B에서 해결이 가능합니다!</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px',}}>유사도추천을 통해 나와 잘 맞는 플레이어와 새로운 인연을 맺어보세요</div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <img src="https://media2.giphy.com/media/Rk3RQkoVhLUwqpC7Dd/giphy.gif?cid=ecf05e47l0pg4710lc0uulcjxjb6m034htwx32ian05j2nhv&rid=giphy.gif&ct=g" style={{width:'100%', height:'100%'}}/>
                <div style={{width:'100%', height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)', position:'absolute', left:'0px', top:'0px', paddingLeft:'50px'}}>
                    <h1 style={{fontFamily:'NotoSansKR-Regular', color:'white', fontSize:'44px', marginTop:'200px'}}>즐길준비가 되셨나요?</h1>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px', marginTop:'30px'}}>당신만을 위한 맞춤 보드게임 추천 서비스 R&B</div>
                    <div style={{fontFamily:'NotoSansKR-Light', color:'white', fontSize:'32px'}}>지금 바로 시작해볼까요?</div>
                    <Link to="/recmain" style={{textDecoration:'none', fontFamily:'NotoSansKR-Light', color:'white', fontSize:'36px', marginTop:'30px'}}>지금 시작하기 →</Link>
                </div>
            </SwiperSlide>
            </Swiper>


            <div style={{ position:'absolute', right:'0px', backgroundColor:'#6FB1FF', display:'flex', alignItems: 'center', justifyContent:'center', float:'left', width:'30vw', height:'100vh', float:'left'}}>
            <div className='loginContent' style={{zIndex:'300', width:'60%', backgroundColor:'white', padding:'70px 40px', borderRadius:'4px'}}>
              <br></br>
              <TextField
                label="이메일 아이디"
                id="standard-size-normal"
                variant="standard"
                value = {Email} 
                onChange={onEmailHandler}
                style={{width:'100%', marginBottom:'20px'}}
                margin="normal"
                inputProps={{style:{fontFamily:'NotoSansKR-Light', fontSize: '18px'},}} 
                InputLabelProps={{
                  shrink: true,
                  style:{fontFamily:'NotoSansKR-Regular', fontSize: '20px'},
                }}
              />
              <TextField
                label="비밀번호"
                id="standard-size-normal"
                variant="standard"
                value = {Password} 
                onChange={onPasswordHandler}
                type="password"
                style={{width:'100%', marginBottom:'60px'}}
                margin="normal"
                inputProps={{style:{fontFamily:'NotoSansKR-Light', fontSize: '18px'},}} 
                InputLabelProps={{
                  shrink: true,
                  style:{fontFamily:'NotoSansKR-Regular', fontSize: '20px'},
                }}
              />
              <Button onClick={loginHandler} className='loginButton' size="large" variant="contained" style={{width:'100%', marginBottom:'10px'}}>로그인</Button>
              <Button href="/join" className='joinButton' size="large" variant="contained" style={{width:'100%', float:'left', backgroundColor:'#3F51B5'}}>회원가입</Button>
              
              <Link to="/recmain" style={{textDecoration:'none', float:'right', fontFamily:'NotoSansKR-Regular', fontSize:'20px', marginTop:'20px', color:'#bababa'}}>비회원으로 시작</Link>
              </div>
          </div>
        </div>
    );
}

export default Main