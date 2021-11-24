import React from 'react'
import './Lobby.css'

import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import PlaceIcon from '@mui/icons-material/Place'

const Lobby = (props) => {
    return (
        <div
            style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
                width: '96%',
                backgroundColor: '#FAFAFA',
                padding: '24px',
                marginBottom: '14px',
                margin: '2%',
            }}
        >
            <div style={{ marginBottom: '24px' }}>
                {props.value.complete ? (
                    <div
                        style={{
                            width: '10%',
                            height: '28.8px',
                            float: 'left',
                        }}
                    >
                        <div className="lobbyButtonIng">모집중</div>
                    </div>
                ) : (
                    <div
                        style={{
                            width: '10%',
                            height: '28.8px',
                            float: 'left',
                        }}
                    >
                        <div className="lobbyButtonEnd">모집완료</div>
                    </div>
                )}

                <a
                    style={{
                        fontFamily: 'NotoSansKR-Regular',
                        fontSize: '20px',
                        color: '#616161',
                    }}
                >
                    {props.value.title}
                </a>
            </div>
            <div style={{}} justifyContent="center">
                <div
                    style={{
                        fontFamily: 'NotoSansKR-Regular',
                        fontSize: '16px',
                        marginLeft: '20px',
                        marginTop: '6px',
                        color: '#616161',
                    }}
                >
                    <GroupsIcon
                        style={{ verticalAlign: 'middle' }}
                    ></GroupsIcon>{' '}
                    {props.value.nowParticipant} / {props.value.maxParticipant}
                    <EventIcon
                        style={{ verticalAlign: 'middle', marginLeft: '20px' }}
                    ></EventIcon>{' '}
                    {props.value.date.substring(0, 10)}
                    <PlaceIcon
                        style={{ verticalAlign: 'middle', marginLeft: '20px' }}
                    ></PlaceIcon>{' '}
                    서울특별시 {props.value.place}
                </div>
            </div>
        </div>
    )
}

export default Lobby
