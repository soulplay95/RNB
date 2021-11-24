import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import Grid from '@mui/material/Grid'

import LoginIcon from '@mui/icons-material/Login'
const Nav = () => {
    const logout = () => {
        localStorage.clear();
        window.location.replace('/')
    }
    return (
        <Grid className="Nav" container spacing={0}>
            <Grid item md={3}>
                <Link to="/recmain">
                    <img src="https://ifh.cc/g/yRG2xE.png" className="NavLogo"></img>
                </Link>
            </Grid>
            <Grid item md={6} container spacing={0}>
                <Grid item md={4} className="Navs">
                    <Link
                        to="/recmain"
                        className="spread-underline"
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        보드게임추천
                    </Link>
                </Grid>
                <Grid item md={4} className="Navs">
                    <Link
                        to="/search"
                        className="spread-underline"
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        검색
                    </Link>
                </Grid>
                <Grid item md={4} className="Navs">
                    <Link
                        to="/findpeople"
                        className="spread-underline"
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        모임 찾기
                    </Link>
                </Grid>
            </Grid>
            {localStorage.getItem('LOGIN_AUTH') ? (
                <Grid item md={3} className="NavProfile">
                    <div
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={logout}
                    >
                        Logout
                    </div>
                    <div
                        style={{
                            float: 'right',
                            marginLeft: '6px',
                            marginRight: '6px',
                        }}
                    >
                        |
                    </div>
                    <Link
                        to="/mypage"
                        style={{
                            float: 'right',
                            marginLeft: '14px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'white',
                        }}
                        href="/mypage"
                    >
                        MyPage
                    </Link>
                    <div
                        style={{
                            fontFamily: 'NotoSansKR-Bold',
                            float: 'right',
                        }}
                    >
                        {localStorage.getItem('USER_NICKNAME')}
                    </div>
                </Grid>
            ) : (
                <Grid
                    item
                    md={3}
                    className="NavProfile"
                    style={{ fontSize: '20px' }}
                >
                    <Link
                        to={'/login'}
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        <LoginIcon
                            style={{ verticalAlign: 'middle' }}
                        ></LoginIcon>
                        <a
                            style={{
                                fontFamily: 'NotoSansKR-Regular',
                                marginRight: '10px',
                            }}
                        >
                            로그인
                        </a>
                    </Link>
                </Grid>
            )}

            {/*회원정보 popover*/}
        </Grid>
    )
}

export default Nav
