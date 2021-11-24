import React from 'react'
import './LikeGame.css'

import GroupsIcon from '@mui/icons-material/Groups'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { fontSize } from '@mui/system'

const LikeGame = () => {
    return (
        <Card sx={{ display: 'flex', marginBottom:'12px', position:'relative', marginTop:'20px', marginLeft:'20px',marginRight:'20px',marginBottom:'12px'}}>
            <CardMedia
        component="img"
        sx={{ width: 120 }}
        image="https://w.namu.la/s/70bd13fedee29f099490d9af76635d1d2b34bd654e86bd289380d93e317c74a31aaa1cc2672bf2ec87bbbdae4f5a8ae280d093090131889521f37a0b6397ca2176c50bd36e3cbd14b400c83d303f0b69f39b58704d7a4522c17e3f761137a530"
        alt="boradgameimage"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <CloseIcon style={{position:'absolute', top:'10px', right:'10px', fontSize:'30px'}}></CloseIcon>
          <Typography component="div" variant="h5" style={{fontFamily: 'NotoSansKR-Regular',}}>
            하...
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }} style={{
                        fontFamily: 'NotoSansKR-Regular',
                        fontSize: '16px',
                        color:'#616161',
                    }}>
          <GroupsIcon
                        style={{ verticalAlign: 'middle' }}
                    ></GroupsIcon>{' '}
                    4-6인
                    <AccessAlarmIcon
                        style={{ verticalAlign: 'middle', marginLeft: '16px' }}
                    ></AccessAlarmIcon>{' '}
                    20-40분
                    <a
                        style={{ verticalAlign: 'middle', marginLeft: '16px', fontSize:'12px', fontFamily:'NotoSansKR-Light'}}
                    >난이도&nbsp;</a>{' '}
                    매우 어려움
        </Box>
      </Box>
    </Card>
    )
}

export default LikeGame
