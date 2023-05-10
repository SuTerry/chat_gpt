import React, { useState, useContext } from 'react'
import { Typography, Toolbar, IconButton, Box, AppBar as MuiAppBar, Button } from '@mui/material'

import { styled } from '@mui/material/styles'

import { DRAWERWIDTH } from '@/constant/layout'

import context from '@/context'

import OutDialog from './Dialog'

import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease'
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import WarningIcon from '@mui/icons-material/Warning'

import logoImg from '@/assets/img/logo.png'

import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWERWIDTH,
    width: `calc(100% - ${DRAWERWIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default (): JSX.Element => {
  const { openSideNav, setOpenSideNav, user, setLoginOpen, signOut } = useContext(context)

  const [outDialog, setOutDialog] = useState(false)

  const handleOutLogin = () => {
    signOut()
    setOutDialog(false)
  }

  return (
    <>
      <AppBar open={openSideNav} color="appBar">
        <Toolbar
          variant="dense"
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenSideNav(!openSideNav)}
            sx={{
              marginRight: '36px',
            }}
          >

            {
              openSideNav ? <FormatIndentDecreaseIcon /> : <FormatIndentIncreaseIcon />
            }
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            {!openSideNav && <img src={logoImg} style={{ height: '40px' }} />}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

            <Typography component="span"><WarningIcon sx={{ color: '#fc8800', position: 'relative', top: 2 }} /></Typography>
            <Typography component="span" sx={{ color: '#ef4444', ml: 1 }}>重要：</Typography>
            <Typography component="span">为防止网站丢失，请按Ctrl+D收藏本站为书签</Typography>
          </Box>
          {
            user.login
              ? <>
                <Typography sx={{ mr: 1 }}>{user.username}</Typography>
                <Button sx={{ color: '#fff' }} onClick={() => setOutDialog(true)} startIcon={<AccountCircleIcon />} >退出</Button>
              </>
              : <Button sx={{ color: '#fff' }} onClick={() => setLoginOpen(true)} startIcon={<PersonOutlineIcon />} >登录</Button>
          }
        </Toolbar>
      </AppBar >
      <OutDialog open={outDialog} close={() => setOutDialog(false)} sure={handleOutLogin} />
    </>
  )
}