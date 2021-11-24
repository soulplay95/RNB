import React from 'react'
import Grid from '@mui/material/Grid'
import GroupsIcon from '@mui/icons-material/Groups'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const NewGame = (props) => {
    return (
        <Grid container spacing={0} style={{ height: '100%' }}>
            <Grid
                item
                md={1}
                style={{ backgroundColor: '#6FB1FF', height: 'inherit' }}
            ></Grid>
            <Grid
                item
                md={11}
                style={{
                    height: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ width: '80%', height: '80%' }} align="center">
                    <div
                        style={{ width: '28%', height: '100%', float: 'left' }}
                    >
                        <img
                            src={props.value.image}
                            style={{ width: '100%', height: '100%' }}
                        ></img>
                    </div>
                    <div
                        style={{
                            width: '66%',
                            height: '100%',
                            float: 'left',
                            marginLeft: '3%',
                            marginRight: '3%',
                        }}
                    >
                        <div
                            style={{
                                height: '28%',
                                textAlign: 'left',
                                fontFamily: 'NotoSansKR-Regular',
                                fontSize: '32px',
                                color: '#6D6D6D',
                            }}
                        >
                            {props.value.name}
                        </div>
                        <div
                            style={{
                                height: '44%',
                                textAlign: 'left',
                                fontFamily: 'NotoSansKR-Light',
                                fontSize: '20px',
                                color: '#6D6D6D',
                                overflowY:'auto',
                                marginBottom:'20px'
                            }}
                        >
                            {props.value.info.replace(
                                            /(&([^;]+);)/gi,
                                            ''
                                        )}
                        </div>
                        <div
                            style={{
                                height: '28%',
                                textAlign: 'left',
                                fontFamily: 'NotoSansKR-Light',
                                fontSize: '',
                                color: '#6D6D6D',
                            }}
                        >
                            <GroupsIcon
                                style={{ verticalAlign: 'middle' }}
                            ></GroupsIcon>
                            {props.value.minPeople}-{props.value.maxPeople}인
                            <AccessTimeIcon
                                style={{
                                    verticalAlign: 'middle',
                                    marginLeft: '10px',
                                }}
                            ></AccessTimeIcon>
                            {props.value.minTime}-{props.value.maxTime}분
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default NewGame
