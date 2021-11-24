/*global kakao*/
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../Nav/Nav'
import './FindPeople.css'
import { Link } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import geojson from '../../data/seoul.json'
const { kakao } = window

const FindPeople = () => {
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
            level: 9, // 지도의 확대 레벨
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

    const [room, setRoom] = useState([])

    useEffect(() => {
        axios
            .get('/recruit/' + address, {})
            .then(function (response) {
                console.log(response)
                setRoom(response.data)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [address])

    return (
        <main>
            <Nav></Nav>
            <div className="FindBoxWrapper">
                <div className="FindBox">
                    <div
                        id="pollution-map"
                        style={{
                            width: '60%',
                            height: '100%',
                            borderRadius: '12px 0px 0px 12px',
                            float: 'left',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '40%',
                            height: '100%',
                            borderRadius: '0px 12px 12px 0px',
                            float: 'left',
                            overflow: 'auto',
                            position: 'relative',
                        }}
                    >
                        <Link
                            to="/findpeopleadd"
                            style={{
                                cursor: 'pointer',
                                width: '60px',
                                height: '60px',
                                color: '#6D6D6D',
                                position: 'absolute',
                                bottom: '15px',
                                right: '15px',
                            }}
                        >
                            <AddCircleIcon
                                className="addButton"
                                style={{ width: '100%', height: '100%' }}
                            ></AddCircleIcon>
                        </Link>

                        <div
                            style={{
                                fontFamily: 'NotoSansKR-Regular',
                                marginLeft: '8%',
                                fontSize: '24px',
                                height: '12%',
                                width: '90%',
                                borderBottom: '1px solid #E7E7E7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>{address}</div>
                        </div>

                        <div
                            style={{
                                height: '88%',
                                overflow: 'auto',
                            }}
                        >
                            

                            {room.map((result) => (
                            <div
                                style={{
                                    height: '12%',
                                    marginLeft: '8%',
                                    marginRight: '8%',
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                    borderBottom: '1px solid #E7E7E7',
                                    cursor: 'pointer',
                                }}
                            >
                                <div
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        float: 'left',
                                    }}
                                >
                                    {result.complete ? (<div className="buttonEnd">모집완료</div>) : (<div className="buttonIng">모집중</div>)}
                                </div>
                                
                                <Link
                                    to={`/findpeopledetail/${result.recruitmentId}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                        width: '80%',
                                        height: '100%',
                                        float: 'left',
                                    }}
                                >
                                    <a
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: 'NotoSansKR-Light',
                                        }}
                                    >
                                        {result.recruitmentId}&nbsp;&nbsp;
                                    </a>
                                    <a
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: 'NotoSansKR-Medium',
                                        }}
                                    >
                                        {result.title}
                                    </a>
                                    <br></br>
                                    <div
                                        style={{
                                            marginTop: '12px',
                                            fontFamily: 'NotoSansKR-Regular',
                                            fontSize: '14px',
                                            color: '#6D6D6D',
                                        }}
                                    >
                                        <GroupsIcon
                                            style={{ verticalAlign: 'middle' }}
                                        ></GroupsIcon>{' '}
                                        {result.nowParticipant} / {result.maxParticipant}
                                        <EventIcon
                                            style={{
                                                verticalAlign: 'middle',
                                                marginLeft: '20px',
                                            }}
                                        ></EventIcon>{' '}
                                        {result.date.substring(0,10)}
                                    </div>
                                </Link>
                            </div>
                        ))}
                        </div>


        


                    </div>
                </div>
            </div>
        </main>
    )
}

export default FindPeople
