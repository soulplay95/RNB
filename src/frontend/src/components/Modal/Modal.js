import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'

import GroupsIcon from '@mui/icons-material/Groups'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import StarIcon from '@mui/icons-material/Star'

import SwiperCore, { Navigation } from 'swiper'
SwiperCore.use([Navigation])

const Modal = (props) => {
    const [isLike, setIsLike] = useState(false)
    const [isHave, setIsHave] = useState(false)
    const [isYoutube, setIsYoutube] = useState(true)

    useEffect(() => {
        axios
            .get('/game/info?gameId=' + props.value, {})
            .then(function (response) {
                if (!response.data.game.youtube) {
                    setIsYoutube(false)
                }
                var tempString = response.data.game.info
                tempString = tempString.replace(/(&([^;]+);)/gi, '')
                var tempURL = response.data.game.youtube
                tempURL = tempURL.replace('/watch?v=', '/embed/')
                setInfo(tempString)
                setYoutubeURL(tempURL)
                setGame(response.data.game)
                setShop(response.data.shop)
            })
            .catch(function (error) {})
            .then(function () {})

        axios
            .get('/game/ishave?gameId=' + props.value, {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                setIsHave(response.data.check)
            })
            .catch(function (error) {})
            .then(function () {})

        axios
            .get('/game/islike?gameId=' + props.value, {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                setIsLike(response.data.check)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [props.value])

    const [game, setGame] = useState([])
    const [shop, setShop] = useState([])
    const [info, setInfo] = useState('')
    const [youtubeURL, setYoutubeURL] = useState('')

    const like = () => {
        axios
            .post(
                '/game/like',
                { gameId: props.value },
                {
                    headers: {
                        Authorization: localStorage.getItem('JWT_TOKEN'),
                    },
                }
            )
            .then(function (response) {})
            .catch(function (error) {})
            .then(function () {
                setIsLike(true)
            })
    }

    const unlike = () => {
        console.log(props.value)
        axios
            .delete(
                '/game/unlike',

                {
                    headers: {
                        Authorization: localStorage.getItem('JWT_TOKEN'),
                    },
                    data: { gameId: props.value },
                }
            )
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                setIsLike(false)
            })
    }

    const have = () => {
        axios
            .post(
                '/game/add',
                { gameId: props.value },
                {
                    headers: {
                        Authorization: localStorage.getItem('JWT_TOKEN'),
                    },
                }
            )
            .then(function (response) {})
            .catch(function (error) {})
            .then(function () {
                setIsHave(true)
            })
    }

    const unhave = () => {
        axios
            .delete(
                '/game/remove',

                {
                    headers: {
                        Authorization: localStorage.getItem('JWT_TOKEN'),
                    },
                    data: { gameId: props.value },
                }
            )
            .then(function (response) {})
            .catch(function (error) {})
            .then(function () {
                setIsHave(false)
            })
    }

    return (
        <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '80px',
                    marginBottom: '80px',
                }}
            >
                <h1
                    style={{ fontFamily: 'NotoSansKR-Black', fontSize: '36px' }}
                >
                    {game.name}
                </h1>
            </div>
            <div style={{ width: '100%', height: '40vh' }}>
                <div style={{ width: '40%', height: '35vh', float: 'left' }}>
                    <img
                        src={game.image}
                        style={{ width: '80%', height: '100%' }}
                    />
                </div>

                <div style={{ width: '60%', height: '35vh', float: 'left' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '8vh',
                            backgroundColor: '#EBEBEB',
                            marginBottom: '1vh',
                            borderRadius: '5px',
                            color: '#6D6D6D',
                        }}
                    >
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <GroupsIcon fontSize="medium" />
                        </div>
                        <div
                            style={{
                                width: '20%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '18px',
                                }}
                            >
                                인원
                            </a>
                        </div>
                        <div
                            style={{
                                width: '60%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: '18px',
                                }}
                            >
                                {game.minPeople}-{game.maxPeople}인
                            </a>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: '8vh',
                            backgroundColor: '#EBEBEB',
                            marginBottom: '1.25vh',
                            borderRadius: '7px',
                            color: '#6D6D6D',
                        }}
                    >
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <AccessAlarmIcon fontSize="medium" />
                        </div>
                        <div
                            style={{
                                width: '20%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '18px',
                                }}
                            >
                                시간
                            </a>
                        </div>
                        <div
                            style={{
                                width: '60%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: '18px',
                                }}
                            >
                                {game.minTime}-{game.maxTime}분
                            </a>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: '8vh',
                            backgroundColor: '#EBEBEB',
                            marginBottom: '1.25vh',
                            borderRadius: '7px',
                            color: '#6D6D6D',
                        }}
                    >
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '7%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '6px',
                                }}
                            >
                                Genre
                            </a>
                        </div>
                        <div
                            style={{
                                width: '20%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '18px',
                                }}
                            >
                                장르
                            </a>
                        </div>
                        <div
                            style={{
                                width: '60%',
                                height: '100%',
                                float: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                overflowX: 'auto',
                            }}
                        >
                            <a
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: '12px',
                                    width: '100%',
                                    overflowX: 'auto',
                                    maxHeight: '30px',
                                }}
                            >
                                {game.genre}
                            </a>
                        </div>
                    </div>
                    
                    <div
                        style={{
                            width: '100%',
                            height: '8vh',
                            borderRadius: '7px',
                            color: '#6D6D6D',
                        }}
                    >
                        {isLike ? (
                            <div
                                onClick={unlike}
                                style={{
                                    width: '49%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#CECECE',
                                    color: '#6D6D6D',
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                    borderRadius: '5px',
                                    float: 'left',
                                    cursor: 'pointer',
                                    boxShadow:
                                        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                찜해제
                            </div>
                        ) : (
                            <div
                                onClick={like}
                                style={{
                                    width: '49%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#3F51B5',
                                    color: 'white',
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                    borderRadius: '5px',
                                    float: 'left',
                                    cursor: 'pointer',
                                    boxShadow:
                                        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                찜하기
                            </div>
                        )}
                        {isHave ? (
                            <div
                                onClick={unhave}
                                style={{
                                    width: '49%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#CECECE',
                                    color: '#6D6D6D',
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                    borderRadius: '5px',
                                    float: 'right',
                                    cursor: 'pointer',
                                    boxShadow:
                                        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                소유 리스트 해제
                            </div>
                        ) : (
                            <div
                                onClick={have}
                                style={{
                                    width: '49%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#98D4FF',
                                    color: 'white',
                                    fontFamily: 'NotoSansKR-Light',
                                    fontSize: '18px',
                                    borderRadius: '5px',
                                    float: 'right',
                                    cursor: 'pointer',
                                    boxShadow:
                                        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                소유 리스트 등록
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                style={{
                    borderBottom: '2px solid #363636',
                    paddingBottom: '1%',
                    color: '#363636',
                    marginTop: '50px',
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                }}
            >
                상세설명
            </div>
            <html
                style={{
                    paddingBottom: '1%',
                    color: '#363636',
                    marginTop: '50px',
                    fontFamily: 'NotoSansKR-Light',
                    fontSize: '18px',
                }}
            >
                {info}
            </html>
            <div
                style={{
                    borderBottom: '2px solid #363636',
                    paddingBottom: '1%',
                    color: '#363636',
                    marginTop: '50px',
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                }}
            >
                룰 설명 영상
            </div>
            {isYoutube ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe
                        style={{
                            width: '80%',
                            height: '40vh',
                            marginTop: '50px',
                        }}
                        src={youtubeURL}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: 'NotoSansKR-Regular',
                        fontSize: '24px',
                        color: '#CECECE',
                    }}
                >
                    설명영상이 존재하지 않습니다.
                </div>
            )}
            <div
                style={{
                    borderBottom: '2px solid #363636',
                    paddingBottom: '1%',
                    color: '#363636',
                    marginTop: '50px',
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                }}
            >
                구매 링크
            </div>
            {shop.map((result) => {
                const title = result.title.replace(/(<([^>]+)>)/gi, '')
                const price = result.lprice.replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                )

                return (
                    <div
                        style={{
                            position: 'relative',
                            padding: '20px',
                            backgroundColor: '#F2FAFF',
                            marginTop: '18px',
                            borderRadius: '7px',
                            cursor: 'pointer',
                        }}
                        onClick={() => window.open(result.link)}
                    >
                        <div
                            style={{
                                fontFamily: 'NotoSansKR-Medium',
                                fontSize: '18px',
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                fontFamily: 'NotoSansKR-Medium',
                                fontSize: '18px',
                                color: '#FF1515',
                            }}
                        >
                            {price}원
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                width: '80px',
                                height: '70px',
                            }}
                        >
                            <img
                                src={result.image}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Modal
