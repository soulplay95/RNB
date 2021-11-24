import React, {useState}from 'react'
import './LikeGame.css'

import GroupsIcon from '@mui/icons-material/Groups'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import CloseIcon from '@mui/icons-material/Close'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'


const LikeGame = (props) => {

    return (
        <Card
            sx={{
                display: 'flex',
                marginBottom: '12px',
                position: 'relative',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px',
                marginBottom: '12px',
            }}
        >
            <CloseIcon
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '30px',
                }}
            ></CloseIcon>
            <CardMedia
                component="img"
                sx={{ width: 120, height: 120 }}
                image={props.value.image}
                alt="boradgameimage"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                        component="div"
                        variant="h5"
                        style={{ fontFamily: 'NotoSansKR-Regular' }}
                    >
                        {props.value.name}
                    </Typography>
                </CardContent>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                    style={{
                        fontFamily: 'NotoSansKR-Regular',
                        fontSize: '16px',
                        color: '#616161',
                    }}
                >
                    <GroupsIcon
                        style={{ verticalAlign: 'middle' }}
                    ></GroupsIcon>{' '}
                    {props.value.minPeople}-{props.value.maxPeople}인
                    <AccessAlarmIcon
                        style={{ verticalAlign: 'middle', marginLeft: '16px' }}
                    ></AccessAlarmIcon>{' '}
                    {props.value.minTime}-{props.value.maxTime}분
                </Box>
            </Box>
        </Card>
    )
}

export default LikeGame
