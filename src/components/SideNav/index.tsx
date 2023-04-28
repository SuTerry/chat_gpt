import React, { useContext } from 'react'

import { Divider, List, Typography, Drawer as MuiDrawer } from '@mui/material'
import { styled } from '@mui/material/styles'

import { DRAWERWIDTH, LOGO } from '@/constant/layout'

import context from '@/context'

import ListItems from './ListItems'


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
)

export default (): JSX.Element => {
  const { openSideNav } = useContext(context)

  return (
    <Drawer variant="permanent" open={openSideNav}>
      <Typography sx={{ mt: 2, mb: 2, textAlign: 'center', color: '#fff' }} variant="h6" component="div">
        {LOGO}
      </Typography>
      <Divider />
      <List component="nav" sx={{ height: '100vh', position: 'relative' }} >
        <ListItems />
      </List>
    </Drawer>
  )
}