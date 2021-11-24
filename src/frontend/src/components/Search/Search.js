import React, { useState } from 'react'
import axios from 'axios'
import Nav from '../Nav/Nav'
import Grid from '@mui/material/Grid'
import './Search.css'
import TextField from '@mui/material/TextField'
import { Swiper, SwiperSlide } from 'swiper/react'
import SearchIcon from '@mui/icons-material/Search'
import Chip from '@mui/material/Chip'

import Paging from '../Paging'

import Slider from '@mui/material/Slider'
import GroupsIcon from '@mui/icons-material/Groups'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

import Rodal from 'rodal'

import './Search.css'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
// import Swiper core and required modules
import SwiperCore, { Navigation, EffectCoverflow, Pagination } from 'swiper'
import Modal from '../Modal/Modal'
import 'rodal/lib/rodal.css';

SwiperCore.use([Navigation, EffectCoverflow, Pagination])
var chips = ''

const Search = () => {
    const [swiper, setSwiper] = useState(null)
    const [tabFirst, setTabFirst] = useState('isTab')
    const [tabSecond, setTabSecond] = useState('isNoTab')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(18)

    const indexOfLast = currentPage * postsPerPage
    const indexOfFirst = indexOfLast - postsPerPage
    function currentPosts(tmp) {
        let currentPosts = 0
        currentPosts = tmp.slice(indexOfFirst, indexOfLast)
        return currentPosts
    }

    const slideToFirst = () => {
        swiper.slideTo(0)
        setTabFirst('isTab')
        setTabSecond('isNoTab')
    }
    const slideToSecond = () => {
        swiper.slideTo(1)
        setTabFirst('isNoTab')
        setTabSecond('isTab')
    }

    const NumberPeople = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
    ]

    const playTime = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 10,
            label: '10',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 40,
            label: '40',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 60,
            label: '60',
        },
    ]

    const [resultGame, setResultGame] = useState([])
    const [resultGameDetail, setResultGameDetail] = useState([])

    const getboardbyname = async () => {
        if (boardGameName.length < 2) {
            alert('2글자 이상 입력해주세요.')
        } else {
            axios
                .get('/game/search/' + boardGameName, {})
                .then(function (response) {
                    setResultGame(response.data)
                })
                .catch(function (error) {
                    // 오류발생시 실행
                })
                .then(function () {
                    // 항상 실행
                })
        }
    }

    const getboardbydetail = async () => {
        axios
            .post('/game/search/', {
                people: player,
                time: time,
                genre: chips,
            })
            .then(function (response) {
                setResultGameDetail(response.data)
            })
            .catch(function (error) {
                // 오류발생시 실행
            })
            .then(function () {
                // 항상 실행
            })
    }

    const [boardGameName, setBoardGameName] = useState('')

    const onBoardGameNameHandler = (event) => {
        setBoardGameName(event.currentTarget.value)
    }

    const [isCardGame, setIsCardGame] = useState(false)
    const changeCardGame = () => {
        if (isCardGame) {
            setIsCardGame(false)
            chips = chips.replace('|Card Game', '')
        } else {
            setIsCardGame(true)
            chips += '|Card Game'
        }
    }

    const [isWarGame, setIsWarGame] = useState(false)
    const changeWarGame = () => {
        if (isWarGame) {
            setIsWarGame(false)
            chips = chips.replace('|Wargame', '')
        } else {
            setIsWarGame(true)
            chips += '|Wargame'
        }
    }

    const [isFantasy, setIsFantasy] = useState(false)
    const changeFantasy = () => {
        if (isFantasy) {
            setIsFantasy(false)
            chips = chips.replace('|Fantasy', '')
        } else {
            setIsFantasy(true)
            chips += '|Fantasy'
        }
    }

    const [isDice, setIsDice] = useState(false)
    const changeDice = () => {
        if (isDice) {
            setIsDice(false)
            chips = chips.replace('|Dice', '')
        } else {
            setIsDice(true)
            chips += '|Dice'
        }
    }

    const [isScienceFiction, setIsScienceFiction] = useState(false)
    const changeScienceFiction = () => {
        if (isScienceFiction) {
            setIsScienceFiction(false)
            chips = chips.replace('|Science Fiction', '')
        } else {
            setIsScienceFiction(true)
            chips += '|Science Fiction'
        }
    }

    const [isChildren, setIsChildren] = useState(false)
    const changeChildren = () => {
        if (isChildren) {
            setIsChildren(false)
            chips = chips.replace("|Children's Game", '')
        } else {
            setIsChildren(true)
            chips += "|Children's Game"
        }
    }

    const [isEconomic, setIsEconomic] = useState(false)
    const changeEconomic = () => {
        if (isEconomic) {
            setIsEconomic(false)
            chips = chips.replace('|Economic', '')
        } else {
            setIsEconomic(true)
            chips += '|Economic'
        }
    }

    const [isAnimals, setIsAnimals] = useState(false)
    const changeAnimals = () => {
        if (isAnimals) {
            setIsAnimals(false)
            chips = chips.replace('|Animals', '')
        } else {
            setIsAnimals(true)
            chips += '|Animals'
        }
    }

    const [isAdventure, setIsAdventure] = useState(false)
    const changeAdventure = () => {
        if (isAdventure) {
            setIsAdventure(false)
            chips = chips.replace('|Adventure', '')
        } else {
            setIsAdventure(true)
            chips += '|Adventure'
        }
    }

    const [isAction, setIsAction] = useState(false)
    const changeAction = () => {
        if (isAction) {
            setIsAction(false)
            chips = chips.replace('|Action / Dexterity', '')
        } else {
            setIsAction(true)
            chips += '|Action / Dexterity'
        }
    }

    const [isMedieval, setIsMedieval] = useState(false)
    const changeMedieval = () => {
        if (isMedieval) {
            setIsMedieval(false)
            chips = chips.replace('|Medieval', '')
        } else {
            setIsMedieval(true)
            chips += '|Medieval'
        }
    }

    const [isAncient, setIsAncient] = useState(false)
    const changeAncient = () => {
        if (isAncient) {
            setIsAncient(false)
            chips = chips.replace('|Ancient', '')
        } else {
            setIsAncient(true)
            chips += '|Ancient'
        }
    }

    const [isRacing, setIsRacing] = useState(false)
    const changeRacing = () => {
        if (isRacing) {
            setIsRacing(false)
            chips = chips.replace('|Racing', '')
        } else {
            setIsRacing(true)
            chips += '|Racing'
        }
    }

    const [isHorror, setIsHorror] = useState(false)
    const changeHorror = () => {
        if (isHorror) {
            setIsHorror(false)
            chips = chips.replace('|Horror', '')
        } else {
            setIsHorror(true)
            chips += '|Horror'
        }
    }

    const [isPuzzle, setIsPuzzle] = useState(false)
    const changePuzzle = () => {
        if (isPuzzle) {
            setIsAncient(false)
            chips = chips.replace('|Puzzle', '')
        } else {
            setIsPuzzle(true)
            chips += '|Puzzle'
        }
    }

    const [isCityBuilding, setIsCityBuilding] = useState(false)
    const changeCityBuilding = () => {
        if (isCityBuilding) {
            setIsCityBuilding(false)
            chips = chips.replace('|City Building', '')
        } else {
            setIsCityBuilding(true)
            chips += '|City Building'
        }
    }

    const [player, setPlayer] = useState(1)

    const onPlayerHandler = (event, newValue) => {
        setPlayer(newValue)
    }

    const [time, setTime] = useState(10)

    const onTimeHandler = (event, newValue) => {
        setTime(newValue)
    }

    const [visible, setVisible] = useState(false)
    const [gameID, setGameID] = useState('')

    const show = (index) => {
        setVisible(true);
        setGameID(index);
    }

    const hide = () => {
        setVisible(false);
    }

    return (
        <main>
            <Nav></Nav>
            <Rodal visible={visible} onClose={hide} width={800} height={650}>
                            {visible ? (<Modal value={gameID}></Modal>) : (null)}
                            </Rodal>
            <div className="tabDiv">
                <a className={tabFirst} onClick={slideToFirst}>
                    ⦁이름으로검색 &nbsp;
                </a>
                <a className={tabSecond} onClick={slideToSecond}>
                    &nbsp;⦁상세검색
                </a>
            </div>
            <>
                <Swiper
                    className="mySwiper"
                    onSwiper={setSwiper}
                    allowTouchMove={false}
                >
                    <SwiperSlide style={{ overflowY: 'auto' }}>
                        <div
                            style={{
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                width: '100%',
                                height: '20%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TextField
                                label="보드게임 이름"
                                id="outlined-start-adornment"
                                sx={{ width: '30%' }}
                                size="small"
                                value={boardGameName}
                                onChange={onBoardGameNameHandler}
                            />
                            <SearchIcon
                                onClick={getboardbyname}
                                style={{ verticalAlign: 'middle' , cursor:'pointer'}}
                                fontSize="large"
                            ></SearchIcon>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '66%',
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '24px',
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: '30px',
                                        marginBottom: '30px',
                                        color: '#6D6D6D',
                                    }}
                                >
                                    {resultGame.length}건의 게임이
                                    검색되었습니다.
                                </div>
                                <div style={{ height: '39vw' }}>
                                    <Grid
                                        container
                                        spacing={0}
                                        style={{
                                            width: '66vw',
                                            marginTop: '20px',
                                            marginBottom: '40px',
                                        }}
                                    >
                                        {currentPosts(resultGame).map(
                                            (result) => (
                                                <Grid
                                                    item
                                                    onClick={()=>show(result.originalId)}
                                                    xs={2}
                                                    style={{ height: '13vw', position:'relative'}}
                                                    className="img-wrapper"
                                                >
                                                    <div className="contentSearch">
                                                        <div style={{width:'90%', height:'15%', overflow:'hidden', fontFamily:'NotoSansKR-Bold', fontSize:'20px', padding:'5%'}}>{result.name}</div>
                                                        <div style={{width:'90%', height:'65%', overflow:'hidden', fontSize:'14px', padding:'5%'}}>{result.info.replace(/(&([^;]+);)/gi, '')}</div>
                                                    </div>
                                                    <div className="darknessSearch"></div>
                                                    <img
                                                        src={result.image}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Paging
                                        postsPerPage={postsPerPage}
                                        totalPosts={resultGame.length}
                                        paginate={setCurrentPage}
                                    ></Paging>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide style={{ overflowY: 'auto' }}>
                        <div
                            style={{
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                width: '100%',
                                height: '20%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <div style={{ width: '30%', height: '100%' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '50%',
                                    }}
                                >
                                    <a
                                        style={{
                                            fontFamily: 'NotoSansKR-Regular',
                                            fontSize: '18px',
                                            color: '#6D6D6D',
                                        }}
                                    >
                                        인원
                                    </a>
                                    <GroupsIcon
                                        fontSize="large"
                                        style={{ color: '6D6D6D' }}
                                    ></GroupsIcon>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={1}
                                        step={1}
                                        value={player}
                                        onChange={onPlayerHandler}
                                        marks={NumberPeople}
                                        min={1}
                                        max={8}
                                        style={{
                                            width: '50%',
                                            marginLeft: '20px',
                                            marginBottom: 0,
                                            color: '#91c4ff',
                                        }}
                                        size="small"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '50%',
                                    }}
                                >
                                    <a
                                        style={{
                                            fontFamily: 'NotoSansKR-Regular',
                                            fontSize: '18px',
                                            color: '#6D6D6D',
                                        }}
                                    >
                                        시간
                                    </a>
                                    <AccessAlarmIcon
                                        fontSize="large"
                                        style={{ color: '#6D6D6D' }}
                                    ></AccessAlarmIcon>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={10}
                                        step={10}
                                        value={time}
                                        onChange={onTimeHandler}
                                        marks={playTime}
                                        min={0}
                                        max={60}
                                        style={{
                                            width: '50%',
                                            marginLeft: '20px',
                                            marginBottom: 0,
                                            color: '#91c4ff',
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>

                            <div style={{ width: '35%', height: '100%' }}>
                                <div
                                    style={{
                                        height: '15%',
                                        fontFamily: 'NotoSansKR-Regular',
                                        fontSize: '20px',
                                        borderBottom: '2px solid #6FB1FF',
                                        paddingBottom: '1%',
                                        color: '#6D6D6D',
                                    }}
                                >
                                    <a>장르</a>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '78%',
                                        overflowY: 'auto',
                                    }}
                                >
                                    {isCardGame ? (
                                        <Chip
                                            label="카드게임"
                                            onClick={changeCardGame}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="카드게임"
                                            onClick={changeCardGame}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}
                                    {isWarGame ? (
                                        <Chip
                                            label="전쟁"
                                            onClick={changeWarGame}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="전쟁"
                                            onClick={changeWarGame}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}
                                    {isFantasy ? (
                                        <Chip
                                            label="판타지"
                                            onClick={changeFantasy}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="판타지"
                                            onClick={changeFantasy}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isDice ? (
                                        <Chip
                                            label="주사위"
                                            onClick={changeDice}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="주사위"
                                            onClick={changeDice}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isScienceFiction ? (
                                        <Chip
                                            label="SF"
                                            onClick={changeScienceFiction}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="SF"
                                            onClick={changeScienceFiction}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isChildren ? (
                                        <Chip
                                            label="유아용"
                                            onClick={changeChildren}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="유아용"
                                            onClick={changeChildren}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isEconomic ? (
                                        <Chip
                                            label="경제"
                                            onClick={changeEconomic}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="경제"
                                            onClick={changeEconomic}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isAnimals ? (
                                        <Chip
                                            label="동물"
                                            onClick={changeAnimals}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="동물"
                                            onClick={changeAnimals}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isAdventure ? (
                                        <Chip
                                            label="어드벤쳐"
                                            onClick={changeAdventure}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="어드벤쳐"
                                            onClick={changeAdventure}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isAction ? (
                                        <Chip
                                            label="액션"
                                            onClick={changeAction}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="액션"
                                            onClick={changeAction}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isMedieval ? (
                                        <Chip
                                            label="중세"
                                            onClick={changeMedieval}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="중세"
                                            onClick={changeMedieval}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isAncient ? (
                                        <Chip
                                            label="고대"
                                            onClick={changeAncient}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="고대"
                                            onClick={changeAncient}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isRacing ? (
                                        <Chip
                                            label="레이싱"
                                            onClick={changeRacing}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="레이싱"
                                            onClick={changeRacing}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isHorror ? (
                                        <Chip
                                            label="호러"
                                            onClick={changeHorror}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="호러"
                                            onClick={changeHorror}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isPuzzle ? (
                                        <Chip
                                            label="퍼즐"
                                            onClick={changePuzzle}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="퍼즐"
                                            onClick={changePuzzle}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}

                                    {isCityBuilding ? (
                                        <Chip
                                            label="도시경영"
                                            onClick={changeCityBuilding}
                                            style={{
                                                backgroundColor: '#004DA9',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            className="genreChip"
                                            label="도시경영"
                                            onClick={changeCityBuilding}
                                            style={{
                                                backgroundColor: '#6FB1FF',
                                                margin: '3px',
                                                fontFamily: 'NotoSansKR-Thin',
                                                fontSize: '11px',
                                                color: 'white',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    width: '10%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        width: '80%',
                                        height: '80%',
                                        borderRadius: '12px',
                                        backgroundColor: '#3F51B5',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontFamily: 'NotoSansKR-Regular',
                                        fontSize: '20px',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                    onClick={getboardbydetail}
                                >
                                    검색
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '66%',
                                    fontFamily: 'NotoSansKR-Regular',
                                    fontSize: '24px',
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: '30px',
                                        marginBottom: '30px',
                                        color: '#6D6D6D',
                                    }}
                                >
                                    {resultGameDetail.length}건의 게임이
                                    검색되었습니다.
                                </div>
                                <div style={{ height: '39vw' }}>
                                    <Grid
                                        container
                                        spacing={0}
                                        style={{
                                            width: '66vw',
                                            marginTop: '20px',
                                            marginBottom: '40px',
                                        }}
                                    >
                                        {currentPosts(resultGameDetail).map(
                                            (result) => (
                                                <Grid
                                                onClick={()=>show(result.originalId)}
                                                className="img-wrapper"
                                                    item
                                                    xs={2}
                                                    p={0}
                                                    style={{ height: '13vw', position:'relative' }}
                                                >
                                                    <div className="contentSearch">
                                                        <div style={{width:'90%', height:'15%', overflow:'hidden', fontFamily:'NotoSansKR-Bold', fontSize:'20px', padding:'5%'}}>{result.name}</div>
                                                        <div style={{width:'90%', height:'65%', overflow:'hidden', fontSize:'14px', padding:'5%'}}>{result.info.replace(/(&([^;]+);)/gi, '')}</div>
                                                    </div>
                                                    <div className="darknessSearch"></div>
                                                    <img
                                                        src={result.image}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Paging
                                        postsPerPage={postsPerPage}
                                        totalPosts={resultGameDetail.length}
                                        paginate={setCurrentPage}
                                    ></Paging>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </>
        </main>
    )
}

export default Search
