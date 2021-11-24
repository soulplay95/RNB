import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../Nav/Nav'
import './FindPeople.css'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'


import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
// import Swiper core and required modules
import SwiperCore, { Navigation, EffectCoverflow, Pagination } from 'swiper'
SwiperCore.use([Navigation, EffectCoverflow, Pagination])

const FindPeople = (props) => {
    const marks = [
        {
            value: 20,
            label: '평균',
        },
    ]

    const [info, setInfo] = useState([])
    const [users, setUsers] = useState([])
    const [host, setHost] = useState([])
    const [hostGame, setHostGame] = useState([])
    const [hostLoad, setHostLoad] = useState(false)
    const [isHost, setIsHost] = useState(false)

    useEffect(() => {
        axios
            .get('recruit/detail/' + props.match.params.id, {})
            .then(function (response) {
                console.log(response)
                setInfo(response.data)
                setUsers(response.data.participants)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [])

    useEffect(() => {
        if (info.userId === localStorage.getItem('USER_UUID')) {
            setIsHost(true)
        }
        axios
            .get('user/show/' + info.userId, {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                setHost(response.data)
                setHostGame(response.data.haveList.haveList)
                setHostLoad(true)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [info.userId])

    const joinRoom = () => {
        axios
            .post('recruit/join', {
                userId: localStorage.getItem('USER_UUID'),
                recruitmentId: info.recruitmentId,
            })
            .then(function (response) {
                console.log(response)
                setInfo(response.data)
            })
            .catch(function (error) {})
            .then(function () {})
    }

    const endRoom = () => {
        axios
            .put('recruit/host/end/' + info.recruitmentId, {})
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {})
            .then(function () {})
    }

    return (
        <main>
            <Nav></Nav>
            <div className="FindBoxWrapper">
                <div className="FindBox">
                    <main style={{ width: '100%', height: '100%' }}>
                        <div
                            style={{
                                width: '100%',
                                height: '12%',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '24px',
                                    marginLeft: '20px',
                                    position: 'absolute',
                                    left: '0px',
                                    bottom: '0px',
                                    borderBottom: '1px solid black',
                                }}
                            >
                                {info.title}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '0px',
                                    bottom: '0px',
                                }}
                            >
                                {isHost ? (
                                    <Button
                                        onClick={endRoom}
                                        className="joinButton"
                                        size="large"
                                        variant="contained"
                                    >
                                        구인완료
                                    </Button>
                                ) : (
                                    <div style={{ float: 'left' }}>
                                        {info.maxParticipant >
                                        info.nowParticipant ? (
                                            <Button
                                                onClick={joinRoom}
                                                className="joinButton"
                                                size="large"
                                                variant="contained"
                                            >
                                                참가
                                            </Button>
                                        ) : (
                                            <Button
                                                className="joinButtonCant"
                                                size="large"
                                                variant="contained"
                                            >
                                                참가
                                            </Button>
                                        )}
                                    </div>
                                )}

                                <Button
                                    href="/findpeople"
                                    className="backButton"
                                    size="large"
                                    variant="contained"
                                    style={{
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                    }}
                                >
                                    이전
                                </Button>
                            </div>
                        </div>

                        <div
                            style={{
                                width: '100%',
                                height: '88%',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    float: 'left',
                                    width: '25%',
                                    height: '100%',
                                }}
                            >
                                <Grid
                                    container
                                    rowSpacing={0}
                                    columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                                    justifyContent="center"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        textAlign: 'center',
                                        fontFamily: 'NotoSansKR-Regular',
                                        marginLeft: '12px',
                                    }}
                                    alignItems="center"
                                >
                                    <Grid item xs={6}>
                                        <img
                                        
                                            src={host.profileImg}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '150px',
                                                marginTop: '15px',
                                            }}
                                        />
                                        <h3
                                            style={{
                                                marginTop: '5px',
                                                marginBottom: '5px',
                                            }}
                                        >
                                            {host.nickname}
                                        </h3>
                                    </Grid>

                                    {users.map((result) => (
                                        <Grid item xs={6}>
                                            <img
                                                src={result.profileImg}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '150px',
                                                    marginTop: '15px',
                                                }}
                                            />
                                            <h3
                                                style={{
                                                    marginTop: '5px',
                                                    marginBottom: '5px',
                                                }}
                                            >
                                                {result.nickname}
                                            </h3>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                            <div
                                style={{
                                    float: 'left',
                                    width: '75%',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '20%',
                                        fontFamily: 'NotoSansKR-Regular',
                                        fontSize: '24px',
                                        color: '#616161',
                                        marginLeft: '5%',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                        }}
                                    >
                                        <a style={{ fontSize: '18px' }}>
                                            모집 :{' '}
                                        </a>
                                        <a>서울특별시 {info.place}</a>
                                        <div
                                            style={{
                                                fontFamily:
                                                    'NotoSansKR-Regular',
                                                fontSize: '18px',
                                                marginTop: '6px',
                                            }}
                                        >
                                            <GroupsIcon
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                            ></GroupsIcon>{' '}
                                            {info.nowParticipant} /{' '}
                                            {info.maxParticipant}
                                            <EventIcon
                                                style={{
                                                    verticalAlign: 'middle',
                                                    marginLeft: '20px',
                                                }}
                                            ></EventIcon>{' '}
                                            {('' + info.date).substring(0, 10)}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '80%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '90%',
                                            height: '80%',
                                            borderRadius: '7px',
                                            boxShadow:
                                                '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '30%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                float: 'left',
                                            }}
                                        >
                                            {hostLoad ? (
                                                <img
                                                    src={host.profileImg}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        borderRadius: '150px',
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                        <div
                                            style={{
                                                width: '70%',
                                                height: '100%',
                                                float: 'left',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontFamily:
                                                        'NotoSansKR-Bold',
                                                    fontSize: '32px',
                                                    color: '#616161',
                                                    width: '100%',
                                                    height: '15%',
                                                }}
                                            >
                                                {hostLoad ? (
                                                    <div>{host.nickname}</div>
                                                ) : null}
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily:
                                                        'NotoSansKR-Regular',
                                                    fontSize: '16px',
                                                    color: '#616161',
                                                    width: '100%',
                                                    height: '15%',
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    fontFamily:
                                                        'NotoSansKR-Regular',
                                                    fontSize: '16px',
                                                    color: '#616161',
                                                    width: '100%',
                                                    height: '15%',
                                                }}
                                            >
                                                {hostLoad && !isHost ? (
                                                    <div>
                                                        <div
                                                            style={{
                                                                height: '100%',
                                                                width: '30%',
                                                                float: 'left',
                                                            }}
                                                        >
                                                            당신과의 유사도
                                                        </div>
                                                        <div
                                                            style={{
                                                                height: '100%',
                                                                width: '70%',
                                                                float: 'left',
                                                            }}
                                                        >
                                                            <a
                                                                style={{
                                                                    color: '#00D622',
                                                                    fontFamily:
                                                                        'NotoSansKR-Regular',
                                                                }}
                                                            >
                                                                {
                                                                    host
                                                                        .similarity
                                                                        .userSim
                                                                }
                                                                /100
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div
                                                style={{
                                                    color: '#616161',
                                                    fontFamily:
                                                        'NotoSansKR-Regular',
                                                    width: '100%',
                                                    height: '55%',
                                                    fontSize: '18px',
                                                }}
                                            >
                                                소유중인 보드게임
                                                <hr
                                                    style={{
                                                        marginRight: '8%',
                                                        borderBottom: '0px',
                                                    }}
                                                ></hr>
                                                <>
                                                    <Swiper
                                                        slidesPerView={5}
                                                        slidesPerColumn={1}
                                                        slidesPerGroup={5}
                                                        spaceBetween={10}
                                                        slidesPerColumnFill="row"
                                                        grabCursor={true}
                                                        Navigation
                                                        style={{
                                                            width: '92%',
                                                            height: '50%',
                                                            marginLeft: '0px',
                                                        }}
                                                    >
                                                        {hostGame.map(
                                                            (result) => (
                                                                <SwiperSlide style={{width:'15%'}}>
                                                                    <img
                                                                        src={
                                                                            result.image
                                                                        }
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                        }}
                                                                    />
                                                                </SwiperSlide>
                                                            )
                                                        )}

                                                        {/* <SwiperSlide>
                                                            <img
                                                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                }}
                                                            />
                                                        </SwiperSlide> */}
                                                    </Swiper>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </main>
    )
}

export default FindPeople
