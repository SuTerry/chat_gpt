import React, { useContext } from 'react'

import { Divider, List, Box, Drawer as MuiDrawer } from '@mui/material'
import { styled } from '@mui/material/styles'

import { DRAWERWIDTH } from '@/constant/layout'

import context from '@/context'

import ListItems from './ListItems'

import logoImg from '@/assets/img/logo.png'

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    // backgroundColor: '#202123',
    width: DRAWERWIDTH,
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(0),
      },
    }),
  },
}))

export default (): JSX.Element => {
  const { openSideNav } = useContext(context)

  return (
    <Drawer variant="permanent" open={openSideNav}>
      <Box sx={{
        width: 200,
        margin: '20px auto 0',
        textAlign: 'center',
      }}>
        <img src={logoImg} style={{ width: '100%' }} />
      </Box>
      <Divider />
      <List component="nav" sx={{ height: '100vh', position: 'relative' }}>
        <ListItems />
      </List>
    </Drawer>
  )
}
