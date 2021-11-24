import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rodal from 'rodal'
import Nav from '../Nav/Nav'
import Modal from '../Modal/Modal'
import NewGame from './NewGame'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'rodal/lib/rodal.css'

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
// import Swiper core and required modules
import './RecMain.css'
import SwiperCore, { Navigation, EffectCoverflow, Pagination } from 'swiper'
SwiperCore.use([Navigation, EffectCoverflow, Pagination])

const RecMain = (props) => {
    const [visible, setVisible] = useState(false)

    const [gameID, setGameID] = useState('')

    const [recGame, setRecGame] = useState([])
    const [newGame, setNewGame] = useState([])
    const [popGame, setPopGame] = useState([])

    const [isload, setIsload] = useState(false)

    const show = (index) => {
        setVisible(true)
        setGameID(index)
    }

    const hide = () => {
        setVisible(false)
    }

    useEffect(() => {
        if(localStorage.getItem("LOGIN_AUTH")){
            axios
            .get('/recommend/userRecommend', {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                setRecGame(response.data)
            })
            .catch(function (error) {})
            .then(function () {
                setIsload(true)
            })

        axios
            .get('/game/new', {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                setNewGame(response.data)
            })
            .catch(function (error) {})
            .then(function () {
                setIsload(true)
            })
        }

        else{
            axios
            .get('/recommend/ratingRecommend', {
            })
            .then(function (response) {
                console.log(response)
                setPopGame(response.data)
            })
            .catch(function (error) {})
            .then(function () {
                setIsload(true)
            })

        axios
            .get('/game/new', {
            })
            .then(function (response) {
                setNewGame(response.data)
            })
            .catch(function (error) {})
            .then(function () {
                setIsload(true)
            })
        }
    }, [])

    return (
        <main>
            <Rodal visible={visible} onClose={hide} width={800} height={650}>
                <Modal value={gameID}></Modal>
            </Rodal>
            <Nav></Nav>
            {recGame.length != 0 ? (
                <div>
                    <div
                        style={{
                            width: '66%',
                            margin: 'auto',
                            fontSize: '32px',
                            fontFamily: 'NotoSansKR-Regular',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        {localStorage.getItem('USER_NICKNAME')}님만을 위한 추천
                        보드게임
                    </div>
                    <Swiper
                        style={{ width: '66%' }}
                        effect={'coverflow'}
                        grabCursor={true}
                        autoHeight={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={true}
                        navigation
                        coverflowEffect={{
                            rotate: 65,
                            stretch: 0,
                            depth: 250,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        className="mySwiper"
                    >
                        {recGame.slice(0, 5).map((result) => (
                            <SwiperSlide
                                className="img-wrapper"
                                style={{ height: '30vw', width: '27vw' }}
                                onClick={() => show(result.originalId)}
                            >
                                <div className="content">
                                    <div
                                        style={{
                                            width: '84%',
                                            height: '9%',
                                            overflow: 'hidden',
                                            fontFamily: 'NotoSansKR-Bold',
                                            fontSize: '32px',
                                            padding: '8%',
                                        }}
                                    >
                                        {result.name}
                                    </div>
                                    <div
                                        style={{
                                            width: '84%',
                                            height: '59%',
                                            overflow: 'hidden',
                                            fontSize: '24px',
                                            padding: '8%',
                                        }}
                                    >
                                        {result.info.replace(
                                            /(&([^;]+);)/gi,
                                            ''
                                        )}
                                    </div>
                                </div>
                                <img
                                    style={{ width: '100%', height: '100%' }}
                                    src={result.image}
                                />
                                <div className="darkness"></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/** 추천 슬라이드 끝 */}
                    {/** 추천 바둑판 시작*/}
                    <br></br>
                    <>
                        <Swiper
                            slidesPerView={5}
                            slidesPerColumn={3}
                            slidesPerGroup={5}
                            spaceBetween={0}
                            slidesPerColumnFill="row"
                            grabCursor={true}
                            navigation
                            style={{
                                width: '65vw',
                                height: '42vw',
                                marginTop: '20px',
                            }}
                        >
                            {recGame.slice(5).map((result) => (
                                <SwiperSlide
                                    className="img-wrapper"
                                    style={{ width: '13vw', height: '14vw' }}
                                    onClick={() => show(result.originalId)}
                                >
                                    <div className="content">
                                        <div
                                            style={{
                                                width: '84%',
                                                height: '9%',
                                                overflow: 'hidden',
                                                fontFamily: 'NotoSansKR-Bold',
                                                fontSize: '24px',
                                                padding: '8%',
                                            }}
                                        >
                                            {result.name}
                                        </div>
                                        <div
                                            style={{
                                                width: '84%',
                                                height: '59%',
                                                overflow: 'hidden',
                                                fontSize: '18px',
                                                padding: '8%',
                                            }}
                                        >
                                            {result.info.replace(
                                                /(&([^;]+);)/gi,
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        src={result.image}
                                    />
                                    <div className="darkness"></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>

                    {newGame.length != 0 ? (
                        <div>
                            <div
                                style={{
                                    width: '66vw',
                                    margin: 'auto',
                                    fontSize: '28px',
                                    fontFamily: 'NotoSansKR-Bold',
                                    marginTop: '40px',
                                }}
                            >
                                신작 보드게임
                            </div>
                            <div>
                                <Swiper
                                    navigation
                                    loop={true}
                                    style={{
                                        width: '66vw',
                                        height: '50vh',
                                        marginTop: '20px',
                                    }}
                                >
                                    {newGame.map((result) => (
                                        <SwiperSlide>
                                            <div style={{cursor:'pointer', width:'100%', height:'100%'}}
                                            onClick={() => show(result.originalId)}>
                                            <NewGame
                                                value={result}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div style={{ height: '200px' }}></div>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}

            {popGame.length !=0 ? (<div>
                    <div
                        style={{
                            width: '66%',
                            margin: 'auto',
                            fontSize: '32px',
                            fontFamily: 'NotoSansKR-Regular',
                            marginTop: '20px',
                            marginBottom: '20px',
                            position:'relative'
                        }}
                    >
                        <a>인기 보드게임</a><a 
                        href="/login"
                        style={{
                            margin: 'auto',
                            fontSize: '20px',
                            fontFamily: 'NotoSansKR-Regular',
                            marginTop: '20px',
                            marginBottom: '20px',
                            position:'absolute',
                            right:'0px',
                            color:'#909090',
                            cursor:'pointer',
                            textDecoration:'none',
                        }}>지금 로그인하시고 취향에 딱 맞는 보드게임을 추천받으세요!</a>
                    </div>


                    <Swiper
                        style={{ width: '66%' }}
                        effect={'coverflow'}
                        grabCursor={true}
                        autoHeight={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={true}
                        navigation
                        coverflowEffect={{
                            rotate: 65,
                            stretch: 0,
                            depth: 250,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        className="mySwiper"
                    >
                        {popGame.slice(0, 5).map((result) => (
                            <SwiperSlide
                                className="img-wrapper"
                                style={{ height: '30vw', width: '27vw' }}
                                onClick={() => show(result.originalId)}
                            >
                                <div className="content">
                                    <div
                                        style={{
                                            width: '84%',
                                            height: '9%',
                                            overflow: 'hidden',
                                            fontFamily: 'NotoSansKR-Bold',
                                            fontSize: '32px',
                                            padding: '8%',
                                        }}
                                    >
                                        {result.name}
                                    </div>
                                    <div
                                        style={{
                                            width: '84%',
                                            height: '59%',
                                            overflow: 'hidden',
                                            fontSize: '24px',
                                            padding: '8%',
                                        }}
                                    >
                                        {result.info.replace(
                                            /(&([^;]+);)/gi,
                                            ''
                                        )}
                                    </div>
                                </div>
                                <img
                                    style={{ width: '100%', height: '100%' }}
                                    src={result.image}
                                />
                                <div className="darkness"></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/** 추천 슬라이드 끝 */}
                    {/** 추천 바둑판 시작*/}
                    <br></br>
                    <>
                        <Swiper
                            slidesPerView={5}
                            slidesPerColumn={3}
                            slidesPerGroup={5}
                            spaceBetween={0}
                            slidesPerColumnFill="row"
                            grabCursor={true}
                            navigation
                            style={{
                                width: '65vw',
                                height: '42vw',
                                marginTop: '20px',
                            }}
                        >
                            {popGame.slice(5).map((result) => (
                                <SwiperSlide
                                    className="img-wrapper"
                                    style={{ width: '13vw', height: '14vw' }}
                                    onClick={() => show(result.originalId)}
                                >
                                    <div className="content">
                                        <div
                                            style={{
                                                width: '84%',
                                                height: '9%',
                                                overflow: 'hidden',
                                                fontFamily: 'NotoSansKR-Bold',
                                                fontSize: '24px',
                                                padding: '8%',
                                            }}
                                        >
                                            {result.name}
                                        </div>
                                        <div
                                            style={{
                                                width: '84%',
                                                height: '59%',
                                                overflow: 'hidden',
                                                fontSize: '18px',
                                                padding: '8%',
                                            }}
                                        >
                                            {result.info.replace(
                                                /(&([^;]+);)/gi,
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        src={result.image}
                                    />
                                    <div className="darkness"></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>

                    {newGame.length != 0 ? (
                        <div>
                            <div
                                style={{
                                    width: '66vw',
                                    margin: 'auto',
                                    fontSize: '28px',
                                    fontFamily: 'NotoSansKR-Bold',
                                    marginTop: '40px',
                                }}
                            >
                                신작 보드게임
                            </div>
                            <div>
                                <Swiper
                                    navigation
                                    loop={true}
                                    style={{
                                        width: '66vw',
                                        height: '50vh',
                                        marginTop: '20px',
                                    }}
                                >
                                    {newGame.map((result) => (
                                        <SwiperSlide>
                                            <div style={{cursor:'pointer', width:'100%', height:'100%'}}
                                            onClick={() => show(result.originalId)}>
                                            <NewGame
                                                value={result}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div style={{ height: '200px' }}></div>
                            </div>
                        </div>
                    ) : null}
                </div>) : null}
        </main>
    )
}

export default RecMain
