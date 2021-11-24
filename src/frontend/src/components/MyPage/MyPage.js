import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../Nav/Nav'
import './MyPage.css'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import GroupsIcon from '@mui/icons-material/Groups'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import FolderIcon from '@mui/icons-material/Folder'
import Button from '@mui/material/Button'

import Rodal from 'rodal'
import Modal from '../Modal/Modal'
import 'rodal/lib/rodal.css'

import Lobby from './Lobby'
import LikeGame from './LikeGame'

const drawerWidth = 280

function ResponsiveDrawer(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [state, setState] = React.useState(0)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <Toolbar>
                <a
                    style={{
                        fontFamily: 'NotoSansKR-Bold',
                        color: '#6D6D6D',
                        fontSize: '18px',
                    }}
                >
                </a>
            </Toolbar>
            <Divider />
            <List
                style={{
                    fontFamily: 'NotoSansKR-Bold',
                    color: '#6d6d6d',
                    fontSize: '14px',
                }}
            >
                {['회원정보', '모임관리', '찜 목록', '소유중인 보드게임'].map(
                    (text, index) => (
                        <ListItem
                            button
                            key={text}
                            onClick={function () {
                                setState(index)
                            }}
                            style={{ marginTop: '25px', marginBottom: '25px' }}
                        >
                            <ListItemIcon>
                                {index === 0 ? <AccountBoxIcon /> : null}
                                {index === 1 ? <GroupsIcon /> : null}
                                {index === 2 ? <FolderSpecialIcon /> : null}
                                {index === 3 ? <FolderIcon /> : null}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                style={{ fontFamily: 'NotoSansKR-Bold' }}
                            />
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
        </div>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            position: 'absolute',
                            top: '13vh',
                            height: '87vh',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                    }}
                >
                    {state === 0 ? <EditProfile></EditProfile> : null}
                    {state === 1 ? (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FindPeoplePage />
                        </div>
                    ) : null}
                    {state === 2 ? (
                        <LikeBoardGame
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        ></LikeBoardGame>
                    ) : null}
                    {state === 3 ? (
                        <HaveGame
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        ></HaveGame>
                    ) : null}
                </div>
            </Box>
        </Box>
    )
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

const EditProfile = () => {
    const logout = () => {
        localStorage.clear()
        window.location.replace('/')
    }
    return (
        <div
            style={{ width: '200px' }}
            justifyContent="center"
            alignItems="center"
        >
            <img
                src={localStorage.getItem('USER_PROFILE')}
                style={{
                    width: '100%',
                    borderRadius: '200px',
                    marginTop: '15px',
                }}
            ></img>
            <br></br>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    fontFamily: 'NotoSansKR-Bold',
                    fontSize: '32px',
                    paddingTop: '20px',
                }}
            >
                {localStorage.getItem('USER_NICKNAME')}
            </div>

            <Button
                onClick={logout}
                className="exitButton"
                size="large"
                variant="contained"
                style={{ width: '100%', float: 'right' }}
            >
                로그아웃
            </Button>
        </div>
    )
}

const FindPeoplePage = () => {
    const [recr, setRecr] = useState([]);

    useEffect(() => {
        axios
            .get('/profile/meet', {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                console.log(response)
                setRecr(response.data)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [])

    return (
        <div style={{ width: '80%' }}>
            <div
                style={{
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                    margin: '20px 2%',
                }}
            >
                참여한 모임
            </div>
            <div className="pageList">
                {recr.map((result) => (
                    <Link to={`/findpeopledetail/${result.recruitmentId}`}
                        style={{ cursor: 'pointer', textDecoration:'none' }}
                    >
                        <Lobby value={result}></Lobby>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const LikeBoardGame = (props) => {
    const [likeBoardGame, setLikeBoardGame] = useState([])
    const [visible, setVisible] = useState(false)
    const [gameID, setGameID] = useState('')

    useEffect(() => {
        axios
            .get('/game/likelist', {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                console.log(response)
                setLikeBoardGame(response.data.likeList)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [visible])

    const show = (index) => {
        setVisible(true)
        setGameID(index)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <div style={{ width: '80%' }}>
            <Rodal visible={visible} onClose={hide} width={800} height={650}>
                {visible ? <Modal value={gameID}></Modal> : null}
            </Rodal>

            <div
                style={{
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                    margin: '20px 2%',
                }}
            >
                찜 목록
            </div>
            <div className="pageList">
                {likeBoardGame.map((result) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => show(result.originalId)}
                    >
                        <LikeGame value={result}></LikeGame>
                    </div>
                ))}
            </div>
        </div>
    )
}

const HaveGame = (props) => {
    const [havingBoardGame, setHavingBoardGame] = useState([])
    const [visible, setVisible] = useState(false)
    const [gameID, setGameID] = useState('')

    useEffect(() => {
        axios
            .get('/game/havelist', {
                headers: {
                    Authorization: localStorage.getItem('JWT_TOKEN'),
                },
            })
            .then(function (response) {
                console.log(response)
                setHavingBoardGame(response.data.haveList)
            })
            .catch(function (error) {})
            .then(function () {})
    }, [visible])

    const show = (index) => {
        setVisible(true)
        setGameID(index)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <div style={{ width: '80%' }}>
            <Rodal visible={visible} onClose={hide} width={800} height={650}>
                {visible ? <Modal value={gameID}></Modal> : null}
            </Rodal>

            <div
                style={{
                    fontFamily: 'NotoSansKR-Regular',
                    fontSize: '24px',
                    margin: '20px 2%',
                }}
            >
                소유중인 보드게임 목록
            </div>
            <div className="pageList">
                {havingBoardGame.map((result) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => show(result.originalId)}
                    >
                        <LikeGame value={result}></LikeGame>
                    </div>
                ))}
            </div>
        </div>
    )
}

const MyPage = (props) => {
    return (
        <main style={{ backgroundColor: '#FDFDFD' }}>
            <Nav></Nav>
            <ResponsiveDrawer
                style={{ position: 'absolute', top: '13vh' }}
            ></ResponsiveDrawer>
        </main>
    )
}

export default MyPage
