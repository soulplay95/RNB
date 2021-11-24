import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './FindPeople.css'

import Nav from '../Nav/Nav'
import TextField from '@mui/material/TextField'
import GroupsIcon from '@mui/icons-material/Groups'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Button from '@mui/material/Button'
import './FindPeopleAdd.css'
import moment from 'moment'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import geojson from '../../data/seoul.json'
const { kakao } = window

const FindPeopleAdd = (props) => {
    const [address, setAddress] = useState('')
    useEffect(() => {
        let data = geojson.features
        let coordinates = [] //좌표 저장 배열
        let name = '' //행정구 이름

        let polygons = []

        const mapContainer = document.getElementById('pollution-map') // 지도를 표시할 div
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            //draggable: false, //일단 지도 이동 막아놓음
            level: 10, // 지도의 확대 레벨
        }

        const map = new kakao.maps.Map(mapContainer, mapOption)
        const customOverlay = new kakao.maps.CustomOverlay({})
        const infowindow = new kakao.maps.InfoWindow({ removable: true })

        const displayArea = (coordinates, name) => {
            let path = []
            let points = []

            coordinates[0].forEach((coordinate) => {
                let point = {}
                point.x = coordinate[1]
                point.y = coordinate[0]
                points.push(point)
                path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]))
            })

            let polygon = new kakao.maps.Polygon({
                map: map,
                path: path, // 그려질 다각형의 좌표 배열입니다
                strokeWeight: 2, // 선의 두께입니다
                strokeColor: '#39aafa', // 선의 색깔입니다
                strokeOpacity: 1.0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일입니다
                fillColor: '#ffffff', // 채우기 색깔입니다
                fillOpacity: 0.4, // 채우기 불투명도 입니다
            })

            polygons.push(polygon)

            // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
            // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
            kakao.maps.event.addListener(
                polygon,
                'mouseover',
                function (mouseEvent) {
                    polygon.setOptions({ fillColor: '#09f' })

                    customOverlay.setContent(
                        '<div class="area">' + name + '</div>'
                    )

                    customOverlay.setPosition(mouseEvent.latLng)
                    customOverlay.setMap(map)
                }
            )

            // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
            // 커스텀 오버레이를 지도에서 제거합니다
            kakao.maps.event.addListener(polygon, 'mouseout', function () {
                polygon.setOptions({ fillColor: '#fff' })
                customOverlay.setMap(null)
            })

            //클릭이벤트
            kakao.maps.event.addListener(polygon, 'click', function () {
                setAddress(name)
            })
        }
        data.forEach((val) => {
            coordinates = val.geometry.coordinates
            name = val.properties.SIG_KOR_NM

            displayArea(coordinates, name)
        })
    }, [])

    const [value, setValue] = useState(moment().format("YYYY-MM-DD hh:mm:ss"))

    const [title, setTitle] = useState('')
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const [player, setPlayer] = useState(2)
    const onPlayerHandler = (event) => {
        setPlayer(event.target.value)
    }

    const [time, setTime] = useState(moment().format("YYYY-MM-DD hh:mm:ss"))

    const makeRoom = () => {
        let data = {
            userId: localStorage.getItem("USER_UUID"),
            title: title,
            content: '',
            maxParticipant: player,
            date: time,
            place: address,
        }
        if(title==='' || address ===''){
            alert("필수정보를 입력해주세요")
        }
        else{
           axios
            .post('/recruit/write', JSON.stringify(data), {
                headers: {
                    'Content-Type': `application/json`,
                },
            })
            .then((res) => {
                alert("등록이 완료되었습니다.")
                props.history.push("/findpeople")
            })
            .catch((ex) => {})
            .finally(() => {}) 
        }
        console.log(data)
    }

    return (
        <main>
            <Nav></Nav>
            <div className="FindBoxWrapper">
                <div className="FindBox">
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ width: '85%', height: '80%' }}>
                            <div
                                style={{
                                    position: 'relative',
                                    float: 'left',
                                    width: '33%',
                                    height: '100%',
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '18px',
                                    color: '#616161',
                                }}
                            >
                                <TextField
                                    label="모임 이름"
                                    variant="standard"
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px',
                                    }}
                                    margin="normal"
                                    value={title}
                                    onChange={onTitleHandler}
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
                                <div
                                    style={{
                                        marginTop: '40px',
                                        height: '27px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <a>모집 : </a>서울 특별시 {address}
                                </div>
                                <div
                                    style={{
                                        marginTop: '40px',
                                        height: '27px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <GroupsIcon
                                        verticalAlign="center"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 40 }}
                                    >
                                        <Select
                                            style={{ height: '25px' }}
                                            value={player}
                                            onChange={onPlayerHandler}
                                        >
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div
                                    style={{
                                        marginTop: '40px',
                                        height: '27px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CalendarTodayIcon
                                        verticalAlign="center"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            value={value}
                                            onChange={(newValue) => {
                                                setTime(
                                                    moment(newValue).format(
                                                        'YYYY-MM-DD hh:mm:ss'
                                                    )
                                                )
                                                setValue(newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        onClick={makeRoom}
                                        className="addGroupButton"
                                        variant="contained"
                                    >
                                        생성
                                    </Button>
                                    <Button
                                        href="/findpeople"
                                        className="backGroupButton"
                                        variant="contained"
                                    >
                                        이전
                                    </Button>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '66%',
                                    height: '100%',
                                    float: 'left',
                                }}
                            >
                                <div
                                    id="pollution-map"
                                    style={{
                                        width: '85%',
                                        height: '100%',
                                        float: 'right',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FindPeopleAdd
