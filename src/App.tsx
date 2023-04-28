
import React, { useState } from 'react'
import { CssBaseline, Box, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import theme from '@/theme'

import Context from '@/context'

import useUser from '@/hooks/useUser'

import Header from '@/components/Header'
import SideNav from '@/components/SideNav'

import Login from '@/components/Login'

export default (): JSX.Element => {
  // 侧导航开启状态
  const [openSideNav, setOpenSideNav] = useState(true)
  // 用户状态
  const [user, setUser, setLoginOpen, signOut] = useUser()

  return (
    <Context.Provider value={{ openSideNav, setOpenSideNav, user, setUser, setLoginOpen, signOut }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header />
          <SideNav />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            </Container>
          </Box>
        </Box>
        <Login />
      </ThemeProvider>
    </Context.Provider>
  )
}
